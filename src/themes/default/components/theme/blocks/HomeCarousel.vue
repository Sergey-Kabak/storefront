<template>
  <div class="home-carousel-wrapper">
    <carousel
        class="main-carousel home-carousel"
        ref="carousel1"
        :per-page="1"
        :per-page-custom="slidesPerPage"
        :center-mode="true"
        :mouse-drag="true"
        :autoplay="true"
        :loop="true"
    >
      <slide v-for="(product, index) in products" :key="index">
        <router-link
            :to="formatLink(product)"
            data-testid="productLink"
        >
          <img :src="product.img" :alt="index">
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
  data: () => ({
    slidesPerPage: [[320, 1], [420, 2], [600, 3], [900, 4], [1200, 5]]
  }),
  components: {
    'Carousel': () => import('vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import('vue-carousel').then(Slider => Slider.Slide)
  },
  computed: {
    products() {
      return config && config.sliderProduct
    },
  },
  methods: {
    formatLink(product) {
      if (product.url_path) {
        return formatProductLink(product, currentStoreView().storeCode)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  ::v-deep .VueCarousel-pagination {

    .VueCarousel-dot{
      outline: none !important;
      padding: 4px !important;
      margin: 0!important;
    }

    .VueCarousel-dot-container {
      margin-top: 24px!important;
    }
    .VueCarousel-dot--active{
      background-color: #23BE20 !important;
    }

  }

  .home-carousel-wrapper {
    margin: 0 -3px;
  }

  .VueCarousel-slide {
    display: flex;
    justify-content: center;
  }

  .home-carousel ::v-deep {

    img {
      width: 100% !important;
      margin: 0 auto;
      max-width: 260px;
      max-height: 434px;
      height: auto!important;
    }
  }

  @media (max-width: 768px) {
    ::v-deep .home-carousel {
      img {
        max-width: 288px;
      }
  
      .VueCarousel-dot-container {
        margin-top: 16px!important;
      }
    }
  }

  @media (max-width: 419px) {
    ::v-deep .home-carousel {
      img {
        border-radius: 4px;
      }
    }
  }
</style>
