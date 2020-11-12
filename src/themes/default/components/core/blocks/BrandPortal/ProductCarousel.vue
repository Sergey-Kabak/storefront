<template>
  <div class="carousel">
    <carousel
      class="main-carousel product-carousel"
      ref="carousel"
      :per-page="1"
      :center-mode="true"
      :navigationPrevLabel="arrowLeft"
      :navigationNextLabel="arrowRight"
      :mouse-drag="true"
      :navigation-enabled="true"
      :pagination-enabled="false"
      :autoplay="true"
      :loop="true"
    >
      <slide v-for="(product, index) in products" :key="index">
        <div data-testid="productLink" class="product-image-link">
          <div class="product-cover">
            <product-image class="product-image" :image="productImage(product)" />
          </div>
          <slot name="pagination">
            <pagination @paginationclick="goToPage($event, 'pagination')"/>
          </slot>
          <span class="product-name">{{product.name}}</span>
          <router-link :to="formatLink(product)" class="product-link">
            <button-full>{{ $t('Buy') }}</button-full>
          </router-link>
        </div>
      </slide>
    </carousel>
    <product-more />
  </div>
</template>

<script>
import ProductImage from 'theme/components/core/ProductImage'
import ButtonFull from 'theme/components/theme/ButtonFull'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import Pagination from 'theme/components/core/blocks/BrandPortal/Pagination.vue'
import { getThumbnailForProduct } from '@vue-storefront/core/modules/cart/helpers'
import { mapState } from 'vuex'
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'
import ProductMore from 'theme/components/core/blocks/BrandPortal/ProductMore.vue'

export default {
  components: {
    'Carousel': () => import('vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import('vue-carousel').then(Slider => Slider.Slide),
    ButtonFull,
    Pagination,
    ProductImage,
    ProductMore
  },
  props: {
    products: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data: () => ({
    arrowLeft: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.2929 6.29303L7.58594 12L13.2929 17.707L14.7069 16.293L10.4139 12L14.7069 7.70703L13.2929 6.29303Z" fill="#828282"/> </svg>',
    arrowRight: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.707 17.707L16.414 12L10.707 6.29303L9.29297 7.70703L13.586 12L9.29297 16.293L10.707 17.707Z" fill="#828282"/> </svg>'
  }),
  computed: {
    ...mapState({
      activeCategory: (state) => state.brand.activeCategory
    }),
    seeMoreLink() {
      return formatCategoryLink(this.activeCategory)
    }
  },
  methods: {
    formatLink(product) {
      if (product.url_path) {
        return formatProductLink(product, currentStoreView().storeCode)
      }
      return {}
    },
    goToPage(page) {
      this.$refs.carousel && this.$refs.carousel.goToPage(page)
    },
    productImage(product) {
      const thumbnail = getThumbnailForProduct(product)
      return {
        src: thumbnail,
        alt: thumbnail
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .VueCarousel-pagination {
    margin-bottom: 16px;

    .VueCarousel-dot-container {
      margin-top: 0!important;

        .VueCarousel-dot {
          outline: none;
          padding: 4px!important;
          margin: 0!important;
        }

        .VueCarousel-dot--active{
          background-color: #23BE20!important;
        }
    }
  }

  .VueCarousel-navigation {
    .VueCarousel-navigation-button {
      &:focus {
        outline: none;
      }

      &.VueCarousel-navigation-prev,
      &.VueCarousel-navigation-next {
        transform: translateY(-50%);
      }
      background: #fff;
      width: 40px;
      height: 40px;
      top: 91px;
      border: 1px solid #E0E0E0;
      outline: none;
      border-radius: 50%;

      &.VueCarousel-navigation-prev {
        left: 5px
      }

      &.VueCarousel-navigation-next {
        right: 5px;
      }
    }
  }
}

.carousel {
  border: 1px solid #E0E0E0;
  border-radius: 4px 4px 0 0;
  margin: 0 -3px;
}

.VueCarousel-slide {
  display: flex;
  justify-content: center;
}

.button-full {
  max-width: 100%;
}

.product-image-link {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
}

.product-link {
  margin-top: auto;
}

.product-image {
  display: block;
  width: auto;
  text-align: center;
  height: auto;
  margin: auto;
  max-width: 178px;
  margin-bottom: 16px;
}

.product-name {
  display: block;
  text-align: center;
  margin-bottom: 20px;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  color: #1A1919;
}

.product-cover {
  height: 150px;
}

@media (max-width: 419px) {
  ::v-deep .product-carousel {
    img {
      border-radius: 4px;
    }
  }
}
</style>
