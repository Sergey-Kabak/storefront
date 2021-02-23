<template>
  <div class="media-gallery">
    <div v-if="isOnline" class="relative w-100 flex mobile-col-reverse">
      <product-gallery-overlay
        v-if="isZoomOpen"
        :current-slide="currentSlide"
        :product-name="product.name"
        :gallery="gallery"
        @close="toggleZoom"
      />
      <product-vertical-gallery
        :gallery="gallery"
        @toggle="openOverlay"
      />
      <product-gallery-carousel
        v-if="showProductGalleryCarousel"
        :gallery="gallery"
        :configuration="configuration"
        :product-name="product.name"
        @toggle="openOverlay"
        @close="onEscapePress"
        @loaded="carouselLoaded = true"
        class="product-galley-page-wrapper"
      />
    </div>
    <product-image v-else :image="offline" />
  </div>
</template>

<script>
import { ProductGallery } from '@vue-storefront/core/modules/catalog/components/ProductGallery.ts'
import ProductGalleryOverlay from './ProductGalleryOverlay'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import ProductImage from './ProductImage'
import { onlineHelper } from '@vue-storefront/core/helpers'
import ProductGalleryCarousel from './ProductGalleryCarousel.vue'
import ProductVerticalGallery from './ProductVerticalGallery'

export default {
  components: {
    ProductGalleryCarousel,
    ProductGalleryOverlay,
    ProductImage,
    ProductVerticalGallery
  },
  mixins: [
    ProductGallery,
    onEscapePress
  ],
  watch: {
    '$route': 'validateRoute'
  },
  data () {
    return {
      isZoomOpen: false,
      showProductGalleryCarousel: false,
      currentSlide: 0,
      carouselLoaded: false
    }
  },
  mounted () {
    this.showProductGalleryCarousel = true
  },
  computed: {
    isOnline (value) {
      return onlineHelper.isOnline
    }
  },
  methods: {
    openOverlay (currentSlide) {
      this.currentSlide = currentSlide
      this.toggleZoom()
    },
    validateRoute () {
      this.$forceUpdate()
    },
    toggleZoom () {
      this.isZoomOpen = !this.isZoomOpen
    },
    onEscapePress () {
      if (this.isZoomOpen) {
        this.toggleZoom()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .VueCarousel-slide{
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 682px;
}
::v-deep .media-zoom{
  width: calc(100% - 48px);
  height: calc(100% - 48px);
  top: 24px;
  left: 24px;
  border-radius: 4px;
}
::v-deep .product-image-container{
  background-color: #fff;
}
::v-deep .media-zoom-carousel__slide{
  background-color: #fff;
}
.hide-mobile{
  @media (max-width : 575px){
    display: none;
  }
}
.mobile-col-reverse{
  @media (max-width : 1200px){
    flex-direction: column-reverse;
  }
}
.main-gallery-container{
  @media (min-width : 1200px){
    max-width: 682px;
  }
}
.media-gallery {
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  &--loaded {
    background-image: none;
  }
}
</style>
