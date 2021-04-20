<template>
  <div class="media-gallery-carousel">
    <carousel
      :per-page="1"
      :mouse-drag="false"
      :loop="true"
      pagination-active-color="#828282"
      pagination-color="transparent"
      navigation-next-label='<svg class="navigation" fill="#828282" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.707 17.707L16.414 12L10.707 6.293L9.29297 7.707L13.586 12L9.29297 16.293L10.707 17.707Z" /> </svg>'
      navigation-prev-label='<svg class="navigation" fill="#828282" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.2929 6.293L7.58594 12L13.2929 17.707L14.7069 16.293L10.4139 12L14.7069 7.707L13.2929 6.293Z" /> </svg>'
      :navigation-enabled="['desktop', 'table'].includes(screenResolution)"
      :paginationEnabled="false"
      ref="carousel"
      :speed="carouselTransitionSpeed"
      @pageChange="pageChange"
      :navigate-to="currentPage"
    >
      <slide
        v-for="(images, index) in filteredGallery"
        :key="index"
      >
        <div
        >
          <product-image
            v-if="hideImageAtIndex !== index"
            @click="openOverlay"
            class="pointer image"
            :image="images"
            :alt="productName | htmlDecode"
          />
          <product-video
            v-if="images.video && (index === currentPage)"
            v-bind="images.video"
            :index="index"
            @video-started="onVideoStarted"
          />
        </div>
      </slide>
    </carousel>
    <product-gallery-pagination v-if="['mobile'].includes(screenResolution)" :gallery="gallery" />
  </div>
</template>

<script>
import config from 'config'
import ProductImage from './ProductImage'
import ProductVideo from './ProductVideo'
import reduce from 'lodash-es/reduce'
import map from 'lodash-es/map'
import NoSSR from 'vue-no-ssr'
import ProductGalleryPagination from './blocks/ProductGalleryPagination';
import ResizeMixin from 'theme/components/core/blocks/Product/Mixins/ResizeMixin';
import { mapGetters } from 'vuex';
import { getThumbnailPath } from '@vue-storefront/core/helpers';

export default {
  name: 'ProductGalleryCarousel',
  mixins: [ResizeMixin],
  components: {
    'Carousel': () => import('vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import('vue-carousel').then(Slider => Slider.Slide),
    ProductImage,
    ProductVideo,
    'no-ssr': NoSSR,
    ProductGalleryPagination
  },
  props: {
    gallery: {
      type: Array,
      required: true
    },
    productName: {
      type: String,
      default: ''
    },
    configuration: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      carouselTransition: true,
      carouselTransitionSpeed: 0,
      currentColor: 0,
      currentPage: 0,
      hideImageAtIndex: null,
      filteredGallery: [...this.gallery]
    }
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct'
    })
  },
  beforeMount () {
    this.$bus.$on('slide-index-from-vertical-bar', index => this.currentPage = index)
    this.$bus.$on('filter-changed-product', this.selectVariant)
    this.$bus.$on('product-after-load', this.selectVariant)
  },
  created () {
    if (this.configuration.color) {
      const { color } = this.configuration
      this.currentColor = color.id
    }
    if (Object.keys(this.configuration)) {
      this.selectVariant(this.configuration)
    }
  },
  beforeDestroy () {
    document.onkeyup = null;
    this.$bus.$off('slide-index-from-vertical-bar')
    this.$bus.$off('filter-changed-product', this.selectVariant)
    this.$bus.$off('product-after-load', this.selectVariant)
  },
  mounted () {
    document.onkeyup = (e) => {
      switch (e.keyCode){
        case 37 : // left arrow
          if (this.currentPage > 0) {
            --this.currentPage
            this.$bus.$emit('gallery-page-change', this.currentPage)
          }
          break;
        case 39 : // right arrow
          if (this.currentPage < this.gallery.length - 1) {
            ++this.currentPage
            this.$bus.$emit('gallery-page-change', this.currentPage)
          }
          break;
      }
    }
    if (this.configuration.color) {
      const { color } = this.configuration
      this.currentColor = color.id
    }
    this.selectVariant(this.configuration);

    this.$emit('loaded')
  },
  methods: {
    navigate (index) {
      this.currentPage = index
    },
    async selectVariant (configuration) {
      let configData = configuration
      await this.$nextTick()
      if (this.getCurrentProduct.type_id === 'configurable' && (configuration.attribute_code === 'color' || (configuration['color'] && configuration['color'].id))) {
        let configurableChildren = this.getCurrentProduct.configurable_children.find(child => child['color'] === (+configuration.id || +configuration['color'].id))
        this.filteredGallery = [...configurableChildren.media_gallery].map(gallery => {
          return {
            src: getThumbnailPath((gallery.image), config.products.gallery.width, config.products.gallery.height),
            loading: getThumbnailPath(gallery.image, config.products.thumbnails.width, config.products.thumbnails.height),
            id: configurableChildren.color
          }
        })
        this.pageChange(0);
      } else {
        if (config.products.gallery.mergeConfigurableChildren) {
          const option = reduce(map((configData), 'attribute_code'), (result, attribute) => {
            result[attribute] = configData[attribute] && configData[attribute].id
            return result
          }, {})
          if (option) {
            let index = this.filteredGallery.findIndex(
              obj => obj.id && Object.entries(obj.id).toString() === Object.entries(option).toString(), option)
            if (index < 0) index = this.gallery.findIndex(obj => obj.id && obj.id.color === option.color)
            this.navigate(index)
          }
        }
      }
      this.$emit('close')
    },
    openOverlay () {
      const currentSlide = this.$refs.carousel.currentPage
      this.$emit('toggle', currentSlide)
    },
    switchCarouselSpeed () {
      const { color } = this.configuration
      if (color && this.currentColor !== color.id) {
        this.currentColor = color.id
        this.carouselTransitionSpeed = 0
      } else {
        this.carouselTransitionSpeed = 500
      }
    },
    pageChange (index) {
      this.currentPage = index
      this.$bus.$emit('navigate-from-slider', index)
      this.switchCarouselSpeed()
      this.hideImageAtIndex = null
    },
    onVideoStarted (index) {
      this.hideImageAtIndex = index
    }
  },
  watch: {
    configuration: function (v) {
      this.selectVariant(v)
    },
    gallery: function (v) {
      this.filteredGallery = v
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/animations/transitions';
.VueCarousel{
  @media (max-width: 767px) {
    margin-bottom: 8px;
  }
}
::v-deep {
  .VueCarousel-navigation-button {
    max-height: 40px;
    border-radius: 50%;
    border: 1px solid #E0E0E0!important;
    background-color: #ffffff!important;

    &:hover {
      border-color: #cecece!important;

      .navigation {
        fill: #787878;
      }
    }

    &:active {
      border-color: #bcbcbc!important;

      .navigation {
        fill: #6d6d6d;
      }
    }
    &:focus{
      outline: none !important;
    }
  }
}
.media-gallery-carousel {
  position: relative;
  text-align: center;
  height: 100%;
  width : 100%;
}
.zoom-in {
  position: absolute;
  bottom: 0;
  right: 0;
}
.image{
  opacity: 1;
  transition: .3s opacity $motion-main;

  &:hover{
    opacity: .9;
  }
}
.video-container {
  align-items: center;
  justify-content: center;
}
</style>

<style lang="scss">
.media-gallery-carousel,
.media-zoom-carousel {
  .VueCarousel-pagination {
    position: absolute;
    bottom: -21px;
    button{
      background-color: #E0E0E0 !important;
    }
    button.VueCarousel-dot--active{
      background-color: #23BE20 !important;
    }
    @media (min-width: 768px) {
      display: none;
    }
    @media (max-width: 767px) {

    }
  }
  .VueCarousel-navigation-button {
    margin: 0;
    transform: translateY(-50%) !important;
  }
  .VueCarousel-slide {
    @media (max-width: 575px) {
      max-height: 380px;
      img{
        height: 380px !important;
      }
    }
    backface-visibility: unset;
  }
  .VueCarousel-navigation {
    &--disabled {
      display: none;
    }
  }
  .VueCarousel-dot {
    padding: 8px !important;
    button {
      border: 2px solid #828282;
    }
  }
  &:hover {
    .VueCarousel-navigation {
      opacity: .9;
    }
    .VueCarousel-navigation-button {
      transition: opacity 3s;
      &:after {
        background-color: transparent;
      }
    }
  }
}
.product-image__thumb{
  max-width: 100%;
  width: 506px!important;
  height: 506px!important;
  object-fit: contain;
}

</style>
