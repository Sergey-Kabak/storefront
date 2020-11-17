<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'src/themes/default/assets/fonts/stylesheet.css';
import version from 'theme/helpers/Version';
import config from 'config'

const DefaultLayout = () => import(/* webpackChunkName: "vsf-layout-default" */ './layouts/Default')
const EmptyLayout = () => import(/* webpackChunkName: "vsf-layout-empty" */ './layouts/Empty')
const MinimalLayout = () => import(/* webpackChunkName: "vsf-layout-minimal" */ './layouts/Minimal')

export default {
  data () {
    return {
      ordersData: [],
      isAdmitadLoaded: false
    }
  },
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay
    }),
    layout () {
      return `${(this.$route.meta.layout || 'default')}-layout`
    }
  },
  components: {
    DefaultLayout,
    EmptyLayout,
    MinimalLayout
  },
  beforeMount () {
    if (window) {
      version()
    }
  },
  metaInfo() {
    return {
      script: [
        {
          src: `https://www.artfut.com/static/tagtag.min.js?campaign_code=${config.admitad.campaignCode}`,
          async: true,
          onerror: 'var self = this;window.ADMITAD=window.ADMITAD||{},ADMITAD.Helpers=ADMITAD.Helpers||{},ADMITAD.Helpers.generateDomains=function(){for(var e=new Date,n=Math.floor(new Date(2020,e.getMonth(),e.getDate()).setUTCHours(0,0,0,0)/1e3),t=parseInt(1e12*(Math.sin(n)+1)).toString(30),i=["de"],o=[],a=0;a<i.length;++a)o.push({domain:t+"."+i[a],name:t});return o},ADMITAD.Helpers.findTodaysDomain=function(e){function n(){var o=new XMLHttpRequest,a=i[t].domain,D="https://"+a+"/";o.open("HEAD",D,!0),o.onload=function(){setTimeout(e,0,i[t])},o.onerror=function(){++t<i.length?setTimeout(n,0):setTimeout(e,0,void 0)},o.send()}var t=0,i=ADMITAD.Helpers.generateDomains();n()},window.ADMITAD=window.ADMITAD||{},ADMITAD.Helpers.findTodaysDomain(function(e){if(window.ADMITAD.dynamic=e,window.ADMITAD.dynamic){var n=function(){return function(){return self.src?self:""}}(),t=n(),i=(/campaign_code=([^&]+)/.exec(t.src)||[])[1]||"";t.parentNode.removeChild(t);var o=document.getElementsByTagName("head")[0],a=document.createElement("script");a.src="https://www."+window.ADMITAD.dynamic.domain+"/static/"+window.ADMITAD.dynamic.name.slice(1)+window.ADMITAD.dynamic.name.slice(0,1)+".min.js?campaign_code="+i,o.appendChild(a)}});',
          callback: () => (this.isAdmitadLoaded = true),
          skip: !config.admitad.enabled
        },
        {
          type: 'text/javascript',
          skip: !this.isAdmitadLoaded || !config.admitad.enabled,
          /* eslint-disable */
          innerHTML: `var cookie_name='tagtag_aid';var days_to_store=90;var deduplication_cookie_value='admitad';var channel_name='tagtag_uid';getSourceParamFromUri=function(){var pattern=channel_name+'=([^&]+)';var re=new RegExp(pattern);return(re.exec(document.location.search)||[])[1]||''};getSourceCookie=function(){var matches=document.cookie.match(new RegExp('(?:^|; )'+cookie_name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,'\\$1')+'=([^;]*)'));return matches?decodeURIComponent(matches[1]):undefined};setSourceCookie=function(){var param=getSourceParamFromUri();if(!param){return}var period=days_to_store*60*60*24*1000;var expiresDate=new Date((period)+ +new Date);var cookieString=cookie_name+'='+param+'; path=/; expires='+expiresDate.toGMTString();document.cookie=cookieString;document.cookie=cookieString+'; domain=.'+location.host};setSourceCookie();if(!getSourceCookie(cookie_name)){ADMITAD.Invoice.broker='na'}else if(getSourceCookie(cookie_name)!=deduplication_cookie_value){ADMITAD.Invoice.broker=getSourceCookie(cookie_name)}else{ADMITAD.Invoice.broker='adm'}`
        }
      ]
    }
  }
}
</script>

<style lang="sass">
  .main-green-color
    &:hover
      background-color: transparent !important
      color: #23BE20
</style>
