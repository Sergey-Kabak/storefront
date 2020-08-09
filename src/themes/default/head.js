export default {
  title: 'ringoo.ua',
  titleTemplate: '%s - ringoo.ua',
  htmlAttrs: {
    lang: 'ua'
  },
  meta: [
    { charset: 'utf-8' },
    { vmid: 'description', name: 'description', content: 'ringoo.ua — купити смартфони, гаджети та аксесуари з доставкою по Україні' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui' },
    { name: 'robots', content: 'index, follow' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'theme-color', content: '#ffffff' },
    { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/assets/custom/Favicons/Favicon_48*48.png', sizes: '32x32' },
    { rel: 'icon', type: 'image/png', href: '/assets/custom/Favicons/Favicon_48*48.png', sizes: '16x16' },
    { rel: 'apple-touch-icon', href: '/assets/custom/Apple_touch (iPad)/Apple_touch_76*76.png' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPad)/iPad Pro 12.9 (2048*2732).png', sizes: '2048x2732' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPad)/iPad Pro 11 (1668*2388).png', sizes: '1668x2224' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPad)/iPad mini (1536*2048).png', sizes: '1536x2048' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPhone)/iPhone_11 (1125*2436).png', sizes: '1125x2436' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPhone)/iPhone_8_Plus (1242*2208).png', sizes: '1242x2208' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPhone)/iPhone_8 (750*1334).png', sizes: '750x1334' },
    { rel: 'apple-touch-startup-image', href: '/assets/custom/Splash_screens (iPhone)/iPhone_SE (640*1136).png', sizes: '640x1136' },
    { rel: 'manifest', href: '/assets/manifest.json' },
    { rel: 'stylesheet', as: 'style', href: 'https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Roboto:400,700|Material+Icons&display=swap' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com/', crossorigin: 'anonymous' }
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js',
      async: true,
      integrity: 'sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA',
      crossorigin: 'anonymous'
    }
  ],
  noscript: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Roboto:400,700|Material+Icons&display=swap' }
  ]
}
