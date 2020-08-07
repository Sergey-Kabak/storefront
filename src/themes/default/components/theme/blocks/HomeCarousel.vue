<template>
  <div class="home-carousel-wrapper">
    <carousel
        class="main-carousel"
        ref="carousel1"
        :per-page="1"
        :per-page-custom="[[768, 1], [1024, 5]]"
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
          <img src="https://info.ringoo.ua/images/mag/2.jpg" alt="1">
        </router-link>
      </slide>
      <slide>
        <router-link
            :to="productLink(1)"
            data-testid="productLink"
        >
          <img src="https://info.ringoo.ua/images/mag/5.jpg" alt="2">
        </router-link>
      </slide>
      <slide>
        <router-link
            :to="productLink(2)"
            data-testid="productLink"
        >
          <img src="https://info.ringoo.ua/images/mag/4.jpg" alt="3">
        </router-link>
      </slide>
      <slide>
        <router-link
            :to="productLink(3)"
            data-testid="productLink"
        >
          <img src="https://info.ringoo.ua/images/mag/1.jpg" alt="4">
        </router-link>
      </slide>
      <slide>
        <router-link
            :to="productLink(4)"
            data-testid="productLink"
        >
          <img src="https://info.ringoo.ua/images/mag/3.jpg" alt="5">
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
    'Slide': () => import('vue-carousel').then(Slider => Slider.Slide),
  },
  methods: {
    productLink (pid) {
      let product = config && config.sliderProduct && config.sliderProduct[pid]
      let isProduct = !!(product && product.url_path)
      return formatProductLink(isProduct && product, currentStoreView().storeCode)
    },
  }
};
</script>
