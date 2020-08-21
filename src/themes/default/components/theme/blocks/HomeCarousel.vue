<template>
  <div class="home-carousel-wrapper">
    <carousel
        class="main-carousel home-carousel"
        ref="carousel1"
        :per-page="1"
        :per-page-custom="[[320, 1], [420, 2], [787, 3], [1180, 4], [1200, 5]]"
        :center-mode="true"
        :mouse-drag="true"
        :autoplay="true"
        :loop="true"
    >
      <slide>
        <router-link
            :to="productLink(0)"
            data-testid="productLink"
        >
          <img src="https://info.ringoo.ua/images/slider/1.jpg" alt="1">
        </router-link>
      </slide>
      <slide>
        <router-link
            :to="productLink(1)"
            data-testid="productLink"
        >
          <img src="https://info.ringoo.ua/images/slider/2.jpg" alt="2">
        </router-link>
      </slide>
      <slide>
        <router-link
            :to="productLink(2)"
            data-testid="productLink"
        >
          <img src="https://info.ringoo.ua/images/slider/3.jpg" alt="3">
        </router-link>
      </slide>
      <slide>
        <router-link
            :to="productLink(3)"
            data-testid="productLink"
        >
          <img src="https://info.ringoo.ua/images/slider/4.jpg" alt="4">
        </router-link>
      </slide>
      <slide>
        <router-link
            :to="productLink(4)"
            data-testid="productLink"
        >
          <img src="https://info.ringoo.ua/images/slider/5.jpg" alt="5">
        </router-link>
      </slide>
      <slide>
        <router-link
            :to="productLink(5)"
            data-testid="productLink"
        >
          <img src="https://info.ringoo.ua/images/slider/6.jpg" alt="6">
        </router-link>
      </slide>
      <slide>
        <router-link
            :to="productLink(6)"
            data-testid="productLink"
        >
          <img src="https://info.ringoo.ua/images/slider/7.jpg" alt="7">
        </router-link>
      </slide>
      <slide>
        <router-link
            :to="productLink(7)"
            data-testid="productLink"
        >
          <img src="https://info.ringoo.ua/images/slider/8.jpg" alt="8">
        </router-link>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import config from 'config'

export default {
  components: {
    'Carousel': () => import('vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import('vue-carousel').then(Slider => Slider.Slide)
  },
  methods: {
    productLink (pid) {
      let product = config && config.sliderProduct && config.sliderProduct[pid]
      let isProduct = !!(product && product.url_path)
      return formatProductLink(isProduct && product, currentStoreView().storeCode)
    }
  }
};
</script>

<style lang="scss">
  .home-carousel {
    img {
      width: auto !important;
      margin: 0 auto;
    }
  }
</style>
