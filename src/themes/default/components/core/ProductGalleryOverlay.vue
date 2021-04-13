<template>
  <div class="media-zoom">
    <svg
    class="media-zoom__close material-icons p15 cl-bg-tertiary pointer"
    @click="$emit('close')" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 6.40999L17.59 4.99999L12 10.59L6.41 4.99999L5 6.40999L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.40999Z" fill="#BDBDBD"/>
    </svg>
    <no-ssr>
      <product-gallery-zoom-carousel
        v-if="showProductGalleryZoomCarousel"
        :current-slide="currentSlide"
        :gallery="gallery"
        :product-name="productName"
      />
    </no-ssr>
  </div>
</template>
<script>
import NoSSR from 'vue-no-ssr'
import ProductGalleryZoomCarousel from './ProductGalleryZoomCarousel.vue'

export default {
  name: 'ProductGalleryOverlay',
  props: {
    currentSlide: {
      type: Number,
      required: false,
      default: 0
    },
    gallery: {
      type: Array,
      required: true
    },
    productName: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      showProductGalleryZoomCarousel: false
    }
  },
  components: {
    'no-ssr': NoSSR,
    ProductGalleryZoomCarousel
  },
  mounted () {
    this.$store.commit('ui/setOverlay', true)
    this.showProductGalleryZoomCarousel = true
  },
  destroyed () {
    this.$store.commit('ui/setOverlay', false)
  }
}
</script>
<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
$z-index-gallery: map-get($z-index, overlay) + 1;

svg {
  box-sizing: content-box;
}

.media-zoom {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-index-gallery;
  background: #fff;
  overflow: hidden;

  &__close {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;
  }
}
</style>
