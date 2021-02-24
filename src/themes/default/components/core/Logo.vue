<template>
  <router-link :to="localizedRoute('/')" :title="$t('Home Page')" class="no-underline inline-flex custom-logo">
<!--    <img :width="width" src="/assets/custom/Ringo_logo_green.svg" :alt="$t(defaultTitle)">-->
    <img :width="width" src="/assets/custom/Ringo_logo_green_promo.svg" :alt="$t(defaultTitle)">
  </router-link>
</template>

<script>
import config from 'config';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

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
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-logo {
    font-size: 40px;
    margin: auto;
    color: #23BE20;
    font-family: 'DIN Pro';
    font-style: normal;
    font-weight: 500;
    line-height: .5;

    img {
      width: 100%;

      @media only screen and (max-width: 600px) {
        transform: translate(4px, 6px);
        width: 90%;
      }
    }
  }
</style>
