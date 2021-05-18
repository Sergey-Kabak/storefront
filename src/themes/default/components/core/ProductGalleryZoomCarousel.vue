<template>
  <div class="media-zoom-carousel">
    <div class="product-title flex v-center">
      {{ getCurrentProduct.name }}
    </div>
    <div class="media-zoom-carousel__container row flex">
      <ul class="media-zoom-carousel__thumbs m0 p0" ref="thumbs">
        <li class="media-zoom-carousel__thumb bg-cl-secondary" v-for="(images, index) in gallery" :key="index">
          <product-image
            class="sidebar__img"
            :class="{'active' : currentPage === index}"
            @click="navigate(index)"
            :image="images"
            :alt="productName | htmlDecode"
          />
        </li>
      </ul>
      <div class="media-zoom-carousel__gallery">
        <no-ssr>
          <carousel
            :per-page="1"
            :mouse-drag="false"
            :loop="true"
            :navigation-enabled="true"
            pagination-active-color="#828282"
            pagination-color="transparent"
            navigation-next-label='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.707 17.707L16.414 12L10.707 6.293L9.29297 7.707L13.586 12L9.29297 16.293L10.707 17.707Z" fill="#828282"/> </svg>'
            navigation-prev-label='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.2929 6.293L7.58594 12L13.2929 17.707L14.7069 16.293L10.4139 12L14.7069 7.707L13.2929 6.293Z" fill="#828282"/> </svg>'
            ref="zoomCarousel"
            class="media-zoom-carousel__carousel"
            :speed="carouselTransitionSpeed"
            @pageChange="pageChange"
            :navigate-to="currentPage"
          >
            <slide
              v-for="(images, index) in gallery"
              :key="index"
            >
              <div class="media-zoom-carousel__slide bg-cl-secondary"
                   :class="{'video-container h-100 flex relative': images.video}"
              >
                <product-image
                  class="product-image-carousel"
                  v-show="hideImageAtIndex !== index"
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
        </no-ssr>
      </div>
    </div>
    <div class="product-slider-footer">
      <div class="product-price">
        {{getCurrentProduct.final_price | price}}
      </div>

      <add-to-cart
        class="add-to-card ml30"
        :product="getCurrentProduct"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters} from 'vuex'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import ProductImage from './ProductImage'
import ProductVideo from './ProductVideo'
import NoSSR from 'vue-no-ssr'
import ProductPrice from 'theme/components/core/ProductPrice.vue'
import AddToCart from 'theme/components/core/AddToCart.vue'
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

export default {
  name: 'ProductGalleryZoomCarousel',
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
      required: true
    }
  },
  data () {
    return {
      carouselTransitionSpeed: 300,
      currentPage: 0,
      hideImageAtIndex: null
    }
  },
  components: {
    'Carousel': () => import('vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import('vue-carousel').then(Slider => Slider.Slide),
    ProductImage,
    ProductVideo,
    'no-ssr': NoSSR,
    ProductPrice,
    AddToCart
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct',
      getCurrentCustomOptions: 'product/getCurrentCustomOptions',
    })
  },
  storeView () {
    return currentStoreView()
  },
  mounted () {
    this.$bus.$on('gallery-page-change' , (index) => {
      this.pageChange(index)
    })
    this.$nextTick(() => {
      disableBodyScroll(this.$refs.thumbs)
    })
    this.navigate(this.currentSlide)
    if (this.$refs.zoomCarousel) {
      let navigation = this.$refs.zoomCarousel.$children.find(c => c.$el.className === 'VueCarousel-navigation')
      let pagination = this.$refs.zoomCarousel.$children.find(c => c.$el.className === 'VueCarousel-pagination')
      if (navigation !== undefined) {
        navigation.$on('navigationclick', this.increaseCarouselTransitionSpeed)
      }
      if (pagination !== undefined) {
        pagination.$on('paginationclick', this.increaseCarouselTransitionSpeed)
      }
    }
  },
  beforeDestroy () {
    clearAllBodyScrollLocks()
  },
  methods: {
    navigate (index) {
      this.currentPage = index
    },
    increaseCarouselTransitionSpeed () {
      this.carouselTransitionSpeed = 500
    },
    smoothScroll (offset) {
      this.$refs.thumbs.scroll({
        behavior: 'smooth',
        left: 0,
        top: offset
      });
    },
    pageChange (index) {
      this.currentPage = index;
      this.hideImageAtIndex = null

      const list = this.$refs.thumbs;
      const listClientHeight = list.clientHeight;
      const listItem = list.querySelector('.product-image.sidebar__img.active').offsetTop + 67;

      listItem - listClientHeight > 0 ? this.smoothScroll(listItem - listClientHeight) : this.smoothScroll(0);
    },
    onVideoStarted (index) {
      this.hideImageAtIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/animations/transitions';
.media-zoom-carousel__thumbs{
  @media (min-width: 992px) {
    margin-top: 50px !important;
    height: calc(100% - 50px) !important;
  }
}
ul.media-zoom-carousel__thumbs{
  @media (min-width : 768px) and (max-width : 1366px){
    max-height: 80%;
    margin: auto 0;
  }
}
.media-zoom-carousel__gallery{
  @media (min-width : 768px) and (max-width : 1366px){
    max-height: 80%;
    margin: auto !important;
  }
}
.product-slider-footer{
  @media (max-width : 767px){
    display: none;
  }
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 24px;
  .product-price {
    display: flex;
    align-items: center;
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 30px;
    color: #1A1919;
    margin-right: 2px;
  }
  button{
    max-width: 131px;
    min-width: auto;
  }
}
/deep/ .media-zoom-carousel__thumb{
  background-color: #fff;
}
/deep/ .sidebar__img{
  opacity: 0.5;
  transition : ease-in 0.2s;
  &.active{
    opacity: 1;
  }
  img{
    max-width: 56px;
    max-height: 56px;
    object-fit: contain;
  }

}
.product-title{
  min-height: 54px;
  border-bottom : 1px solid #E0E0E0;
  padding: 13px 54px 13px 24px;
  font-family: 'DIN Pro';
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
  box-sizing: border-box;
  z-index: 2;
  position: relative;
  background-color: #fff;
}
/deep/ .VueCarousel-navigation-button{
  max-height: 40px;
  border-radius: 50%;
  border: 1px solid #E0E0E0 !important;
  background-color: #fff !important;

  &:focus{
    outline: none !important;
  }

  &.VueCarousel-navigation-prev {
    right: calc(100% + 14px);
    left: auto;

    @media (max-width: 900px){
      left: 0;
      right: auto;
    }
  }

  &.VueCarousel-navigation-next {
    left: calc(100% + 14px);
    right: auto;

    @media (max-width: 900px){
      left: auto;
      right: 0;
    }
  }
}
.media-zoom-carousel {
  * {
    box-sizing: border-box;
  }

  &__container{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
    padding: 20px;
    height: 750px;
    max-height: 100%;
    //justify-content: space-evenly;

    @media (max-width: 767px){
      top: 50%;
      bottom: auto;
      height: auto;
      transform: translate3d(0, -50%, 0);
    }
  }

  &__thumbs{
    list-style: none;
    padding-right: 16px;
    width:100%;
    max-width: 73px;
    height: 100%;
    overflow: auto;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 4px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #E0E0E0;
      border-radius: 4px;
    }
    @media (max-width: 767px) {
      display: none;
    }
  }

  &__thumb{
    margin-bottom: 16px;
    max-width: 100%;
    cursor: pointer;
    &:last-of-type {
      margin-bottom: 0;
    }
    & > *{
      will-change: opacity;
      transition: .3s opacity $motion-main;
      &:hover{
        opacity: 1;
      }
    }
  }
  &__gallery{
    margin: 0 auto;
    max-width: 636px;
    height: 100%;
    flex: 1;
    @media (max-width: 767px) {
      height: auto;
    }
  }
  &__carousel {
    height: 100%;
  }
  &__slide{
    height: 100%;
    max-height: 100%;
  }
}
.thumb-video{
  padding-bottom: calc(319% / (568 / 100));
}
.video-container {
  align-items: center;
  justify-content: center;
}
.media-zoom-carousel__slide{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep {
  .VueCarousel-navigation-prev {
    right: calc(100% + 24px);
    margin-right: 0!important;
  }

  .VueCarousel-navigation-next {
    left: calc(100% + 24px);
    margin-left: 0!important;
  }
}
</style>

<style lang="scss">
.media-zoom-carousel {
  .VueCarousel-wrapper,
  .VueCarousel-inner,
  .VueCarousel-slide {
    height: 100%;
  }
  .VueCarousel-inner{
    height: 100% !important;
  }
}
</style>
