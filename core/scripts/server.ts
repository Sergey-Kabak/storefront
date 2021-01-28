import { serverHooksExecutors } from '@vue-storefront/core/server/hooks'

let config = require('config')
const path = require('path')
const glob = require('glob')
const fs = require('fs')
const rootPath = require('app-root-path').path
const resolve = file => path.resolve(rootPath, file)
const serverExtensions = glob.sync('src/modules/*/server.{ts,js}')
const configProviders: Function[] = []

serverExtensions.map(serverModule => {
  const module = require(resolve(serverModule))
  if (module.configProvider && typeof module.configProvider === 'function') {
    configProviders.push(module.configProvider)
  }
})

serverHooksExecutors.afterProcessStarted(config.server)
const express = require('express')
const ms = require('ms')
const request = require('request');

const cache = require('./utils/cache-instance')
const apiStatus = require('./utils/api-status')
const HTMLContent = require('../pages/Compilation')
const ssr = require('./utils/ssr-renderer')

const compileOptions = {
  escape: /{{([^{][\s\S]+?[^}])}}/g,
  interpolate: /{{{([\s\S]+?)}}}/g
}
const NOT_ALLOWED_SSR_EXTENSIONS_REGEX = new RegExp(`^.*\\.(${config.server.ssrDisabledFor.extensions.join('|')})$`)

const isProd = process.env.NODE_ENV === 'production'
process['noDeprecation'] = true

const app = express()

serverHooksExecutors.afterApplicationInitialized({ app, config: config.server, isProd })

const templatesCache = ssr.initTemplatesCache(config, compileOptions)

let renderer

if (isProd) {
  // In production: create server renderer using server bundle and index HTML
  // template from real fs.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const clientManifest = require(resolve('dist/vue-ssr-client-manifest.json'))
  const bundle = require(resolve('dist/vue-ssr-bundle.json'))
  // src/index.template.html is processed by html-webpack-plugin to inject
  // build assets and output as dist/index.html.
  // TODO: Add dynamic templates loading from (config based?) list
  renderer = ssr.createRenderer(bundle, clientManifest)
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  require(resolve('core/build/dev-server'))(app, (bundle, template) => {
    templatesCache['default'] = ssr.compileTemplate(template, compileOptions) // Important Notice: template switching doesn't work with dev server because of the HMR
    renderer = ssr.createRenderer(bundle)
  })
}

function invalidateCache (req, res) {
  if (config.server.useOutputCache) {
    if (req.query.tag && req.query.key) { // clear cache pages for specific query tag
      if (req.query.key !== config.server.invalidateCacheKey) {
        console.error('Invalid cache invalidation key')
        apiStatus(res, 'Invalid cache invalidation key', 500)
        return
      }
      console.log(`Clear cache request for [${req.query.tag}]`)
      let tags = []
      if (req.query.tag === '*') {
        tags = config.server.availableCacheTags
      } else {
        tags = req.query.tag.split(',')
      }
      const subPromises = []

      serverHooksExecutors.beforeCacheInvalidated({ tags, req })

      tags.forEach(tag => {
        if (config.server.availableCacheTags.indexOf(tag) >= 0 || config.server.availableCacheTags.find(t => {
          return tag.indexOf(t) === 0
        })) {
          subPromises.push(cache.invalidate(tag).then(() => {
            console.log(`Tags invalidated successfully for [${tag}]`)
          }))
        } else {
          console.error(`Invalid tag name ${tag}`)
        }
      })

      Promise.all(subPromises).then(r => {
        apiStatus(res, `Tags invalidated successfully [${req.query.tag}]`, 200)
      }).catch(error => {
        apiStatus(res, error, 500)
        console.error(error)
      }).finally(() => {
        serverHooksExecutors.afterCacheInvalidated({ tags, req })
      })

      if (config.server.invalidateCacheForwarding) { // forward invalidate request to the next server in the chain
        if (!req.query.forwardedFrom && config.server.invalidateCacheForwardUrl) { // don't forward forwarded requests
          request(config.server.invalidateCacheForwardUrl + req.query.tag + '&forwardedFrom=vs', {}, (err, res, body) => {
            if (err) { console.error(err); }
            try {
              if (body && JSON.parse(body).code !== 200) console.log(body);
            } catch (e) {
              console.error('Invalid Cache Invalidation response format', e)
            }
          });
        }
      }
    } else {
      apiStatus(res, 'Invalid parameters for Clear cache request', 500)
      console.error('Invalid parameters for Clear cache request')
    }
  } else {
    apiStatus(res, 'Cache invalidation is not required, output cache is disabled', 200)
  }
}

const serve = (path, cache, options?) => express.static(resolve(path), Object.assign({
  fallthrough: false,
  setHeaders: cache && isProd ? function (res, path) {
    const mimeType = express.static.mime.lookup(path);
    let maxAge = config.expireHeaders.default;
    if (config.expireHeaders.hasOwnProperty(mimeType)) {
      maxAge = config.expireHeaders.get(mimeType);
    }
    res.setHeader('Cache-Control', 'public, max-age=' + ms(maxAge));
  } : null
}, options))

const themeRoot = require('../build/theme-path')

app.use('/dist', serve('dist', true))
app.use('/assets', serve(themeRoot + '/assets', true))
app.use('/service-worker.js', serve('dist/service-worker.js', false, {
  setHeaders: function (res, path, stat) {
    res.set('Content-Type', 'text/javascript; charset=UTF-8')
  }
}))

app.use('/serviceworker.js', serve('src/modules/push/serviceworker.js', true))
app.use('/serviceworker-update.js', serve('src/modules/push/serviceworker-update.js', true))

app.post('/invalidate', invalidateCache)
app.get('/invalidate', invalidateCache)

function cacheVersion (req, res) {
  res.send(fs.readFileSync(resolve('core/build/cache-version.json')))
}

app.get('/cache-version.json', cacheVersion)

app.get('*', (req, res, next) => {
  if (NOT_ALLOWED_SSR_EXTENSIONS_REGEX.test(req.url)) {
    apiStatus(res, 'Vue Storefront: Resource is not found', 404)
    return
  }

  const s = Date.now()
  const errorHandler = err => {
    if (err && err.code === 404) {
      if (NOT_ALLOWED_SSR_EXTENSIONS_REGEX.test(req.url)) {
        console.error(`Resource is not found : ${req.url}`)
        return apiStatus(res, 'Vue Storefront: Resource is not found', 404)
      } else {
        console.error(`Redirect for resource not found : ${req.url}`)
        return res.redirect('/page-not-found')
      }
    } else {
      console.error(`Error during render : ${req.url}`)
      console.error(err)
      serverHooksExecutors.ssrException({ err, req, isProd })
      return res.redirect('/error')
    }
  }

  const site = req.headers['x-vs-store-code'] || 'main'
  const cacheKey = `page:${site}:${req.url}`

  const dynamicRequestHandler = renderer => {
    if (!renderer) {
      res.setHeader('Content-Type', 'text/html')
      res.status(202).end(HTMLContent)
      return next()
    }
    const context = ssr.initSSRRequestContext(app, req, res, config)
    renderer.renderToString(context).then(output => {
      if (!res.get('content-type')) {
        res.setHeader('Content-Type', 'text/html')
      }
      let tagsArray = []
      if (config.server.useOutputCacheTagging && context.output.cacheTags && context.output.cacheTags.size > 0) {
        tagsArray = Array.from(context.output.cacheTags)
        const cacheTags = tagsArray.join(' ')
        res.setHeader('X-VS-Cache-Tags', cacheTags)
        console.log(`cache tags for the request: ${cacheTags}`)
      }

      const beforeOutputRenderedResponse = serverHooksExecutors.beforeOutputRenderedResponse({
        req,
        res,
        context,
        output,
        isProd
      })

      if (typeof beforeOutputRenderedResponse.output === 'string') {
        output = beforeOutputRenderedResponse.output
      } else if (typeof beforeOutputRenderedResponse === 'string') {
        output = beforeOutputRenderedResponse
      }

      output = ssr.applyAdvancedOutputProcessing(context, output, templatesCache, isProd);
      if (config.server.useOutputCache && cache) {
        cache.set(
          cacheKey,
          { headers: res.getHeaders(), body: output, httpCode: res.statusCode },
          tagsArray
        ).catch(errorHandler)
      }

      const afterOutputRenderedResponse = serverHooksExecutors.afterOutputRenderedResponse({
        req,
        res,
        context,
        output,
        isProd
      })

      if (typeof afterOutputRenderedResponse === 'string') {
        res.end(afterOutputRenderedResponse)
      } else if (typeof afterOutputRenderedResponse.output === 'string') {
        res.end(afterOutputRenderedResponse.output)
      } else {
        res.end(output)
      }

      console.log(`whole request [${req.url}]: ${Date.now() - s}ms`)
      next()
    }).catch(errorHandler)
      .finally(() => {
        ssr.clearContext(context)
      })
  }

  const dynamicCacheHandler = () => {
    if (config.server.useOutputCache && cache) {
      cache.get(
        cacheKey
      ).then(output => {
        if (output !== null) {
          if (output.headers) {
            for (const header of Object.keys(output.headers)) {
              res.setHeader(header, output.headers[header])
            }
          }
          res.setHeader('X-VS-Cache', 'Hit')

          if (output.httpCode) {
            res.status(output.httpCode)
          }

          if (output.body) {
            res.end(output.body)
          } else {
            res.setHeader('Content-Type', 'text/html')
            res.end(output)
          }
          console.log(`cache hit [${req.url}], cached request: ${Date.now() - s}ms`)
          next()
        } else {
          res.setHeader('X-VS-Cache', 'Miss')
          console.log(`cache miss [${req.url}], request: ${Date.now() - s}ms`)
          dynamicRequestHandler(renderer) // render response
        }
      }).catch(errorHandler)
    } else {
      dynamicRequestHandler(renderer)
    }
  }

  if (config.server.dynamicConfigReload) {
    const cachedConfigModule = require.cache[require.resolve('config')]
    if (cachedConfigModule) {
      delete cachedConfigModule.parent.children
      delete require.cache[require.resolve('config')]
    }
    config = require('config') // reload config
    if (configProviders.length > 0) {
      configProviders.forEach(configProvider => {
        if (typeof configProvider === 'function') {
          configProvider(req).then(loadedConfig => {
            config = config.util.extendDeep(config, loadedConfig)
            dynamicCacheHandler()
          }).catch(error => {
            if (config.server.dynamicConfigContinueOnError) {
              dynamicCacheHandler()
            } else {
              console.log('config provider error:', error)
              if (req.url !== '/error') {
                res.redirect('/error')
              }
              dynamicCacheHandler()
            }
          })
        }
      })
    } else {
      config = require('config') // reload config
      dynamicCacheHandler()
    }
  } else {
    dynamicCacheHandler()
  }
})

let port = process.env.PORT || config.server.port
const host = process.env.HOST || config.server.host
const start = () => {
  const server = app.listen(port, host)
  server.on('listening', () => {
    console.log(`\n\n----------------------------------------------------------`)
    console.log('|                                                        |')
    console.log(`| Vue Storefront Server started at http://${host}:${port} |`)
    console.log('|                                                        |')
    console.log(`----------------------------------------------------------\n\n`)

    serverHooksExecutors.httpServerIsReady({ server, config: config.server, isProd })
  }).on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      port = parseInt(port) + 1
      console.log(`The port is already in use, trying ${port}`)
      start()
    }
  })
}
start()
