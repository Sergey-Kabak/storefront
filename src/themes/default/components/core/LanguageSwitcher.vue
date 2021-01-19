<template>
  <div class="lang_switcher">
    <div class="country country-available">
      <ul>
        <li v-for="(storeView, storeCode) in storeViews" :key="storeCode">
          <a :href="buildUrl(storeView.url)" :class="{'active' : buildUrl(storeView.url) === $route.fullPath}">{{ $t(storeView.i18n.slug) }}</a>
        </li>
      </ul>
    </div>

    <div class="country country-current">
      <ul>
        <li><a :href="buildUrl('/')" :class="{'active' : buildUrl('/') === $route.fullPath}">{{ $t(LanguageSlug) }}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import config from 'config';

export default {
  data () {
    const storeView = currentStoreView()
    return {
      country: storeView.i18n.defaultCountry,
      lang: storeView.i18n.defaultLanguage,
      currency: storeView.i18n.currencyCode,
      loadLanguagesModal: false
    }
  },
  computed: {
    LanguageSlug () {
      return config.i18n.slug
    },
    storeViews () {
      return Object.keys(config.storeViews).reduce((storeViews, storeCode) => {
        if (this.isValidStoreCode(storeCode)) {
          storeViews[storeCode] = config.storeViews[storeCode]
        }
        return storeViews
      }, {})
    }
  },
  methods: {
    buildUrl (url) {

      let path = this.$route.fullPath;

      Object.keys(this.storeViews).forEach(el => {
        let condition = path.match(new RegExp('^' + ('/' + el) ));
        if (condition){
          path = path.replace(condition[0] , '')
        }

      })
      if (url === '/'){
        return path
      } else {
        return url + path;
      }
    },
    isValidStoreCode (storeCode) {
      const storeView = config.storeViews[storeCode]
      return !!(storeView && typeof storeView === 'object' && storeView.i18n)
    }
  }
}
</script>

<style lang="scss" scoped>
.lang_switcher{
  display: flex;
  position: absolute;
  right: 0;
  top: 5px;
  ul{
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  a{
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 13px;
    line-height: 16px;
    color: #BDBDBD;
    &.active{
      color: #fff;
    }
  }
  .country-available li a{
    padding-right: 8px;
    border-right: 1px solid #BDBDBD;
    margin-right: 8px;
  }
}
</style>
