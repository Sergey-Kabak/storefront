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
    { rel: 'dns-prefetch', as: 'script', href: `https://www.googletagmanager.com/gtag/js?id=${config.googleTagManager.id}` }
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js',
      async: true,
      integrity: 'sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA',
      crossorigin: 'anonymous'
    },
    {
      async: true,
      type: 'text/javascript',
      innerHTML: `(function(i,s,o,g,r,a,m){ i["esSdk"] = r; i[r] = i[r] || function() { (i[r].q = i[r].q || []).push(arguments) }, a=s.createElement(o), m=s.getElementsByTagName(o)[0]; a.async=1; a.src=g; m.parentNode.insertBefore(a,m)} ) (window, document, "script", "https://esputnik.com/scripts/v1/public/scripts?apiKey=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NTI0ZWZhYTJkYzI2MGRmYTM4YTE1NDBlMWI3ZjE1MWQzYjQyMjA3MmU0NmRmOWQwMGIzNDk1ZmM2ODY0MTBjMjRhOGU3NzY0ZmI4YTA2MjZmNDU3YWY5YzcyMWM3MGQwOGU4Yzg1NzQxM2E3NGIxYjQzNTQ3OGQ3MjE4ZmMxNWUzYjNmYjI2M2M3ZDY0NTJhMTY2YWMzNGY2ZDgxZTQ1MTU4MWU1OTI5OTFlNjE1Y2Y1MDBhYTljOTNhYjgwY2IifQ.QxUsylpg7vhO6c7YJ_actNXZFdd7RsSxj_-BWpq0osTK5ZStBb6xQC_xBEn4wUtef5kBkaMW0zSZfOcZDh5x8g&domain=3950D64D-15B2-4D41-89D8-A9051B28BC2F", "es"); es("pushOn");`
    },
    {
      async: true,
      type: 'text/javascript',
      innerHTML: `!function (t, e, c, n) { var s = e.createElement(c); s.async = 1, s.src = 'https://statics.esputnik.com/scripts/' + n + '.js'; var r = e.scripts[0]; r.parentNode.insertBefore(s, r); var f = function () { f.c(arguments); }; f.q = []; f.c = function () { f.q.push(arguments); }; t['eS'] = t['eS'] || f; }(window, document, 'script', '5329D46FF7EB4D63A5CA2E048C5C6C4E'); </script><script>eS('init', {TRACKING: true, RECOMS: true});`
    },
  ],
  noscript: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Roboto:400,700|Material+Icons&display=swap' }
  ]
}
