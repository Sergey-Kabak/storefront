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
    { rel: 'stylesheet', as: 'style', href: 'https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Roboto:400,700|Material+Icons&display=swap' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com/', crossorigin: 'anonymous' }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    admitad: ['innerHTML']
  },
  script: [
    (() => {
      if (config.admitad.enabled) {
        return {
          src: `https://www.artfut.com/static/tagtag.min.js?campaign_code=${config.admitad.campaignCode}`,
          async: true,
          onerror: 'var self = this;window.ADMITAD=window.ADMITAD||{},ADMITAD.Helpers=ADMITAD.Helpers||{},ADMITAD.Helpers.generateDomains=function(){for(var e=new Date,n=Math.floor(new Date(2020,e.getMonth(),e.getDate()).setUTCHours(0,0,0,0)/1e3),t=parseInt(1e12*(Math.sin(n)+1)).toString(30),i=["de"],o=[],a=0;a<i.length;++a)o.push({domain:t+"."+i[a],name:t});return o},ADMITAD.Helpers.findTodaysDomain=function(e){function n(){var o=new XMLHttpRequest,a=i[t].domain,D="https://"+a+"/";o.open("HEAD",D,!0),o.onload=function(){setTimeout(e,0,i[t])},o.onerror=function(){++t<i.length?setTimeout(n,0):setTimeout(e,0,void 0)},o.send()}var t=0,i=ADMITAD.Helpers.generateDomains();n()},window.ADMITAD=window.ADMITAD||{},ADMITAD.Helpers.findTodaysDomain(function(e){if(window.ADMITAD.dynamic=e,window.ADMITAD.dynamic){var n=function(){return function(){return self.src?self:""}}(),t=n(),i=(/campaign_code=([^&]+)/.exec(t.src)||[])[1]||"";t.parentNode.removeChild(t);var o=document.getElementsByTagName("head")[0],a=document.createElement("script");a.src="https://www."+window.ADMITAD.dynamic.domain+"/static/"+window.ADMITAD.dynamic.name.slice(1)+window.ADMITAD.dynamic.name.slice(0,1)+".min.js?campaign_code="+i,o.appendChild(a)}});'
        }
      }
      return {}
    })(),
    {
      vmid: 'admitad',
      type: 'text/javascript',
      /* eslint-disable */
      innerHTML: `
        window.addEventListener('DOMContentLoaded', function() {
          var cookie_name = 'tagtag_aid';
          var days_to_store = 90;
          var deduplication_cookie_value = 'admitad';
          var channel_name = 'tagtag_uid';
          getSourceParamFromUri = function () {
            var pattern = channel_name + '=([^&]+)';
            var re = new RegExp(pattern);
            return (re.exec(document.location.search) || [])[1] || '';
          };
          getSourceCookie = function () {
            var matches = document.cookie.match(new RegExp(
              '(?:^|; )' + cookie_name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
          };
          setSourceCookie = function () {
            var param = getSourceParamFromUri();
            if (!param) { return; }
            var period = days_to_store * 60 * 60 * 24 * 1000;
            var expiresDate = new Date((period) + +new Date);
            var cookieString = cookie_name + '=' + param + '; path=/; expires=' + expiresDate.toGMTString();
            document.cookie = cookieString;
            document.cookie = cookieString + '; domain=.' + location.host;
          };
          setSourceCookie();
          if (!getSourceCookie(cookie_name)) {
            ADMITAD.Invoice.broker = 'na';
          } else if (getSourceCookie(cookie_name) != deduplication_cookie_value) {
            ADMITAD.Invoice.broker = getSourceCookie(cookie_name);
          } else {
            ADMITAD.Invoice.broker = 'adm';
          }
        });
      `
    },
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
