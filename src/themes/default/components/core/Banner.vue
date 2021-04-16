<template>
  <div class="banner" :style="{'background': banner.background_color}">
    <router-link class="promo-link" :class="{'disabled': !banner.banner_url}" :to="localizedRoute(banner.banner_url) || '/'">
      <picture>
        <source :srcset="bannerThumbnail(banner.banner_mobile)" media="(max-width: 768px)" v-if="banner.banner_mobile">
        <source :srcset="bannerThumbnail(banner.banner_desktop)">
        <img v-lazy="bannerThumbnail(banner.banner_desktop)" alt="promo" class="promo-image">
      </picture>
    </router-link>
  </div>
</template>

<script>
import { removeStoreCodeFromRoute } from '@vue-storefront/core/lib/multistore'

export default {
  data: () => ({
    isBannerLoaded: false,
    removeStoreCodeFromRoute
  }),
  props: {
    banners: {
      type: Array,
      required: true
    }
  },
  computed: {
    banner() {
      return this.banners.find(it => it.page_url === removeStoreCodeFromRoute(this.$route.path)) || this.banners[0]
    }
  },
  methods: {
    bannerThumbnail(url) {
      return this.getThumbnail(url, 0, 0, 'banner')
    }
  }
}
</script>

<style lang="scss" scoped>
.promo-link {
  display: block;

  &.disabled {
    pointer-events: none;
    cursor: auto;
  }
}

picture {
  display: flex;
  justify-content: center;
}
</style>
