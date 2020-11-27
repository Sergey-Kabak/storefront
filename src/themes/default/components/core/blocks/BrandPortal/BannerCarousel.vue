<template>
  <!-- нужно переписать стили -->
  <div class="carousel">
    <!-- <carousel
      class="main-carousel home-carousel"
      ref="carousel1"
      :per-page="1"
      :center-mode="true"
      :mouse-drag="true"
      :autoplay="true"
      :loop="true"
    > -->
      <!-- <slide > -->
        <!-- <router-link
          data-testid="productLink"
          class="banner-link"
        > -->
        <router-link :to="brand.banner_link || ''" :disable="!brand.banner_link" :event="brand.banner_link ? 'click' : ''">
          <img v-if="!resolution" :src="defaultImage" alt="banner-image" class="banner-image">
          <img v-else :src="bannerImage" alt="banner-image" class="banner-image">
        </router-link>
        <!-- </router-link> -->
      <!-- </slide> -->
    <!-- </carousel> -->
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import { mapState } from 'vuex'
import mobileResolution from 'theme/mixins/mobileResolution'
export default {
  mixins: [mobileResolution],
  components: {
    'Carousel': () => import('vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import('vue-carousel').then(Slider => Slider.Slide)
  },
  computed: {
    ...mapState({
      brand: state => state.brand.brand
    }),
    bannerImage() {
      const banners = [{
          type: 'banner_desktop',
          isShow: this.isDesktop,
          width: 1324,
          height: 335
        }, {
          type: 'banner_table',
          isShow: this.isTablet,
          width: 768,
          height: 250
        }, {
          type: 'banner_mobile',
          isShow: this.isMobile,
          width: 576,
          height: 335
        }
      ]
      const banner = banners.find(it => it.isShow)
      return this.getThumbnail(this.brand[banner.type] || this.brand.banner_desktop, banner.width || 1324, banner.height || 335, 'brand')
    },
    defaultImage() {
      return this.getThumbnail(this.brand.banner_desktop, 1324, 335, 'brand')
    },
    bannerLink() {
      return processURLAddress(this.brand.banner_link)
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

.banner-link {
  display: flex;

  img {
    width: 100%;
    height: auto;
  }
}

// .carousel {
//   margin: 0 -3px;
// }

.VueCarousel-slide {
  display: flex;
  justify-content: center;
}

.home-carousel ::v-deep {

  img {
    width: 100% !important;
    margin: 0 auto;
    max-height: 434px;
    height: auto!important;
  }
}

.banner-image {
  width: 100%;
  border-radius: 4px;
}

@media (max-width: 768px) {
  ::v-deep .home-carousel {
    .VueCarousel-dot-container {
      margin-top: 16px!important;
    }
  }
  .carousel {
    margin-bottom: 20px;
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
