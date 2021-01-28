/* eslint-disable */
import config from 'config'
export default {
  title: 'ringoo.ua',
  titleTemplate: '%s - ringoo.ua',
  htmlAttrs: {
    lang: 'uk-UA'
  },
  meta: [
    { charset: 'utf-8' },
    { vmid: 'description', name: 'description', content: 'ringoo.ua — купити смартфони, гаджети та аксесуари з доставкою по Україні' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui, maximum-scale=5' },
    { name: 'robots', content: 'index, follow' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'theme-color', content: '#ffffff' },
    { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/assets/custom/Favicons/Favicon_48x48.png', sizes: '32x32' },
    { rel: 'icon', type: 'image/png', href: '/assets/custom/Favicons/Favicon_48x48.png', sizes: '16x16' },
    { rel: 'apple-touch-icon', href: '/assets/custom/Apple_touch (iPad)/Apple_touch_76x76.png' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPad)/iPad Pro 12.9 (2048x732).png', sizes: '2048x2732' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPad)/iPad Pro 11 (1668x388).png', sizes: '1668x2224' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPad)/iPad mini (1536x048).png', sizes: '1536x2048' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPhone)/iPhone_11 (1125x436).png', sizes: '1125x2436' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPhone)/iPhone_8_Plus (1242x208).png', sizes: '1242x2208' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPhone)/iPhone_8 (750x1334).png', sizes: '750x1334' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPhone)/iPhone_SE (640x1136).png', sizes: '640x1136' },
    { rel: 'manifest', href: '/assets/manifest.json' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://www.googletagmanager.com', crossorigin: 'anonymous' },
    { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Roboto:400,700|Material+Icons&display=swap' },
    { rel: 'stylesheet', media: 'print', onload: "this.media='all'", href: 'https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Roboto:400,700|Material+Icons&display=swap' },
    { rel: 'preload', as: 'script', href: `https://www.googletagmanager.com/gtag/js?id=${config.googleTagManager.id}` }
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js',
      async: true,
      integrity: 'sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA',
      crossorigin: 'anonymous'
    },
    {
      innerHTML: `!function(e,t,d,s,a,n,c){e[a]={},e[a].date=(new Date).getTime(),n=t.createElement(d),c=t.getElementsByTagName(d)[0],n.type="text/javascript",n.async=!0,n.src=s,c.parentNode.insertBefore(n,c)}(window,document,"script","https://ringooua.push.world/https.embed.js","pw"),pw.websiteId="abf442cf0a6f1750efd4852147bc6c33df27a98e0c984c693e2c00ee264d9caf";`
    }
  ],
  noscript: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Roboto:400,700|Material+Icons&display=swap' }
  ]
}
