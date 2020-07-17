<template>
  <router-link :to="localizedRoute('/')" :title="$t('Home Page')" class="no-underline inline-flex custom-logo pt10">
    <!--<img-->
      <!--:width="width"-->
      <!--:height="height"-->
      <!--src="http://i.imgur.com/MluLoAB.png"-->
      <!--:alt="$t(defaultTitle)"-->
    <!--&gt;-->
    <img :width="width" :height="height" src="/assets/custom/Ringo_logo_green.svg" :alt="$t(defaultTitle)">
  </router-link>
</template>

<script>
import config from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  data () {
    const storeView = currentStoreView()
    return {
      defaultTitle: storeView.seo.defaultTitle ? storeView.seo.defaultTitle : config.seo.defaultTitle
    }
  },
  props: {
    width: {
      type: [String, Number],
      required: true
    },
    height: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style lang="sass">
  .custom-logo
    font-size: 40px
    color: #23BE20
    font-family: 'DIN Pro'
    font-style: normal
    font-weight: 500
    line-height: .5
</style>
