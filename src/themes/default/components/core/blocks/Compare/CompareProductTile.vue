<template>
  <div @click="gtm" class="product w-100 pb20 d-flex-column btw" v-observe-visibility="visibilityChanged"
       :class="{'not-availible' : isAvailible}">
    <div class="product__icons">
      <AddToCompare class="product__icon" :product="product">
        <template v-slot:active-compare-icon>
          <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z"
              fill="#BDBDBD"/>
          </svg>
        </template>
      </AddToCompare>
      <AddToWishlist class="only-mobile product__icon" :product="product"></AddToWishlist>
    </div>
    <div v-if="false" class="product-tags">
      <div class="product-tag-wrapper">
        <tag text="0.01%" color-type="warning">
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.06369 11.9368L7.69231 3.96706C7.7971 3.78662 7.64848 3.56457 7.44172 3.5927L4.36287 4.01117L5.09851 0.149093C5.1233 0.0188981 4.95544 -0.0557035 4.87543 0.0499293L0.324475 6.0572C0.191912 6.23216 0.332279 6.48095 0.550576 6.45798L3.94498 6.10067L2.83219 11.8501C2.80536 11.9888 2.99274 12.059 3.06369 11.9368Z"
              fill="#FFCA41"/>
          </svg>
        </tag>
        <tag class="accessories" :text="$t('Discount on accessories')" color-type="danger">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
              <path
                d="M10.7339 4.16719L9.77769 2.73281C9.69331 2.60625 9.53162 2.54295 9.38394 2.59219C9.23626 2.63437 9.13081 2.775 9.13081 2.92971C9.13081 3.61875 9.02532 4.30781 8.82847 4.97578C8.65972 4.49063 8.33628 4.06172 7.89329 3.77341C7.11282 3.2531 6.90191 2.23591 7.42222 1.45547L8.03394 0.541406C8.10423 0.435914 8.11128 0.295289 8.04798 0.182813C7.99175 0.0702891 7.87219 0 7.7386 0C7.11992 0 6.5363 0.119508 5.9949 0.337477C4.34258 0.998414 3.14724 2.52891 3.03477 4.39216C2.92224 4.08982 2.85898 3.76638 2.85898 3.43591V2.05781C2.85898 1.90315 2.75349 1.76252 2.60584 1.72034C2.4582 1.67112 2.29646 1.73442 2.21209 1.86096L1.74102 2.57112C0.869141 3.87893 0.412109 5.39766 0.412109 6.96565C0.412063 9.74295 2.66912 12 5.44646 12H6.54334C9.32063 12 11.5871 9.74295 11.5871 6.96565C11.5871 5.96716 11.2894 4.99685 10.7339 4.16719Z"
                fill="#FF5B66"/>
              <path
                d="M6.29805 6.24121C6.23479 6.1217 6.11524 6.06543 5.99571 6.06543C5.8762 6.06543 5.76365 6.1217 5.69336 6.24121C4.23789 8.76545 3.90039 9.08887 3.90039 9.90452C3.90039 11.0576 4.84256 11.9998 5.99568 11.9998C7.14881 11.9998 8.09098 11.0576 8.09098 9.90452C8.091 9.01152 7.49337 8.31543 6.29805 6.24121Z"
                fill="#FFDC81"/>
              <path
                d="M11.5883 6.96565C11.5883 9.74294 9.32186 12 6.54456 12H5.99609V0.337477C6.53752 0.119508 7.12112 0 7.73982 0C7.87342 0 7.99297 0.0702891 8.0492 0.182813C8.1125 0.295289 8.10547 0.435938 8.03516 0.541406L7.42344 1.45547C6.90313 2.23594 7.11406 3.25312 7.89451 3.77341C8.33748 4.06172 8.66094 4.49062 8.82969 4.97578C9.02654 4.30781 9.13203 3.61875 9.13203 2.92971C9.13203 2.775 9.23748 2.63437 9.38516 2.59219C9.53284 2.54297 9.69454 2.60627 9.77891 2.73281L10.7352 4.16719C11.2907 4.99685 11.5883 5.96716 11.5883 6.96565Z"
                fill="#EE2C39"/>
              <path
                d="M8.09139 9.90452C8.09139 11.0576 7.14922 11.9998 5.99609 11.9998V6.06543C6.1156 6.06543 6.23518 6.1217 6.29844 6.24121C7.49376 8.31543 8.09139 9.01152 8.09139 9.90452Z"
                fill="#FFCA41"/>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="12" height="12" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </tag>
      </div>
    </div>
    <router-link
      class="flex no-underline product-link"
      :to="productLink"
      data-testid="productLink"
    >
      <div
        class="product-cover"
        :class="[{ sale: labelsActive && isOnSale }, { new: labelsActive && isNew }]"
      >
        <product-image
          class="product-cover__thumb"
          :image="thumbnailObj"
          :alt="product.name | htmlDecode"
          :calc-ratio="false"
          data-testid="productImage"
        />
      </div>
      <product-cart-price :product="product" />
    </router-link>
    <product-cart-controls
      v-if="product.stock"
      :product="product"
      class="product-cart-controls">
      <template v-slot:wishlist>
        <AddToWishlist class="not-mobile product__icon" :product="product"></AddToWishlist>
      </template>
    </product-cart-controls>
  </div>
</template>

<script>
import rootStore from '@vue-storefront/core/store';
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts';
import config from 'config';
import ProductImage from 'theme/components/core/ProductImage';
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist';
import AddToCart from 'theme/components/core/AddToCart.vue';
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare';
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist';
import { IsOnCompare } from '@vue-storefront/core/modules/compare/components/IsOnCompare';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import Tag from 'theme/components/core/Tag';
import { mapGetters } from 'vuex';
import ProductCartMixin from '../../../../mixins/ProductCartMixin';
import ProductCartControls from '../Product/ProductCartControls';
import ProductCartPrice from '../Product/ProductCartPrice';
import GTM from 'theme/mixins/GTM/dataLayer'

export default {
  mixins: [ProductTile, IsOnWishlist, IsOnCompare, AddToCompare, ProductCartMixin, GTM],
  components: {
    ButtonFull,
    ProductImage,
    AddToWishlist,
    AddToCompare,
    AddToCart,
    Tag,
    ProductCartControls,
    ProductCartPrice
  },
  props: {
    isShowCompareAndFavorite: {
      type: Boolean,
      required: false,
      default: false
    },
    labelsActive: {
      type: Boolean,
      default: true
    },
    onlyImage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      productsInCart: 'cart/getCartItems'
    }),
    productIsInCart () {
      return !!(this.productsInCart.find(p => this.product.id === p.id))
    },
    thumbnailObj () {
      return {
        src: this.thumbnail,
        loading: this.thumbnail
      }
    },
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    gtm () {
      this.GTM_PRODUCT_CLICK([this.product], 'compare page')
    },
    toProduct () {
      this.$router.push(this.productLink)
    },
    onProductPriceUpdate (product) {
      if (product.sku === this.product.sku) {
        Object.assign(this.product, product)
      }
    },
    visibilityChanged (isVisible, entry) {
      if (
        isVisible &&
        config.products.configurableChildrenStockPrefetchDynamic &&
        config.products.filterUnavailableVariants &&
        this.product.type_id === 'configurable' &&
        this.product.configurable_children &&
        this.product.configurable_children.length > 0
      ) {
        const skus = [this.product.sku]
        this.product.configurable_children.map(confChild => {
          const cachedItem = rootStore.state.stock.cache[confChild.id]
          if (!cachedItem) {
            skus.push(confChild.sku)
          }
        })
        if (skus.length) {
          rootStore.dispatch('stock/list', { skus: skus }) // store it in the cache
        }
      }
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-priceupdate', this.onProductPriceUpdate)
  },
  beforeDestroy () {
    this.$bus.$off('product-after-priceupdate', this.onProductPriceUpdate)
  }
}
</script>
<style lang="scss" scoped>
@import '~theme/css/animations/transitions';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

$bg-secondary: color(secondary, $colors-background);
$border-secondary: color(secondary, $colors-border);
$color-white: color(white);
::v-deep .add-to-compare svg{
  position: relative;
  top: -6px;
}
.product-cart-controls{
  @media (min-width: 768px) {
    padding-left: 104px;
    width: calc(100% + 22px);
  }
  box-sizing: border-box;
  position: relative;
  margin-top: 20px;
  ::v-deep .product__icon{
    padding-top: 0;
  }
  ::v-deep .add-to-cart{
    height: 32px;
  }
}
.ml-auto{
  margin-left: auto;
}
.isOnWishlist-component {
  @media(max-width: 767px) {
    background: rgba(255, 255, 255, 0.95);
    top: -8px;
  }
  padding: 4px;
  position: relative;
  box-sizing: border-box;
  border-radius: 4px;

  &:hover {
    background-color: #F9F9F9;
  }

  svg {
    display: block;
  }
}
.isOnCompare-component {
  @media (max-width: 767px) {
    background: rgba(255, 255, 255, 0.95);
  }
  position: relative;
  top: -8px;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 4px;

  &:hover {
    background-color: #F9F9F9;
  }

  svg {
    display: block;
  }
}
.accessories {
  @media (max-width: 767px) {
    display: none !important;
  }
}
.not-mobile {
  @media (max-width: 767px) {
    display: none !important;
  }
}

.only-mobile {
  @media (min-width: 768px) {
    display: none;
  }
}

.not-availible {
  opacity: 0.55;
}

::v-deep img.product-image__thumb {
  @media (max-width: 767px) {
    height: 128px !important;
  }
}

.add-to-wishlist {
  @media (max-width: 767px) {
    position: relative;
    top: -8px;
  }
}

.product {
  position: relative;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  //border-radius: 4px;
  padding: 16px 38px 16px 16px;

  &-tags {
    @media (max-width: 767px) {
      padding-top: 0;
      z-index: 1;
    }
    z-index: 0;
    position: relative;
    padding-top: 30px;
  }

  &-tag {
    &-bottom {
      z-index: 0;
      margin-top: 3px;
    }

    &-wrapper {
      position: absolute;
      z-index: 2;
      display: flex;
      top: 0;

      ::v-deep .tag span {
        font-family: "DIN Pro";
        font-weight: 500;
      }
    }
  }

  &.d-flex-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .flex-column {
    flex-direction: column;
  }

  .product-link {
    @media(max-width: 767px) {
      flex-direction: column;
      margin-bottom: auto;
    }
    align-items: flex-start;
    .mt-auto {
      margin-top: auto;
    }
  }

  @media (max-width: 767px) {
    padding: 16px;
  }
 ::v-deep {
    .icon-wishlist {
      margin-right: 0;
    }
    .add-to-wishlist {
      top: 0;
    }
 }
  &__icons {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding-right: 12px;
    padding-top: 8px;

  }

  &__icon {
    padding-top: 10px;
    //opacity: 0;
    z-index: 0;
    transition: 0.3s opacity $motion-main;
    @media (max-width: 767px) {
      padding-top: 0;
      opacity: 1;
      z-index: 2;
      padding: 4px;
      margin-bottom: 8px;
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 4px;
    }

    &--active {
      opacity: 1;
    }
  }

  &:hover {
    .product__icon {
      opacity: 1;
    }
  }

  .btw {
    justify-content: space-between;
    text-align: right;
    margin-top: 20px;
  }
}

%label {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: $border-secondary;
  text-transform: uppercase;
  color: $color-white;
  font-size: 12px;
}

.product.small {
  border-radius: 0 !important;

  .product-cover {
    min-width: 56px;

    &__thumb {
      min-width: 56px;
      max-width: 56px;
    }
  }

  .product-is-not-available {
    display: none;
  }
}

.product-cover {
  @media (max-width: 767px) {
    min-width: 128px;
    margin: 0 auto;
  }
  overflow: hidden;
  min-width: 88px;
  margin-right: 16px;

  &__thumb {
    @media (max-width: 767px) {
      min-width: 128px;
      max-width: 128px;
      height: 128px;
    }
    padding: 0;
    min-width: 88px;
    max-width: 88px;
    will-change: opacity, transform;
    transition: 0.3s opacity $motion-main, 0.3s transform $motion-main;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (min-width: 768px) {
    &:hover {
      .product-cover__thumb {
        opacity: 1;
        transform: scale(1.1);
      }

      &.sale::after,
      &.new::after {
        opacity: 0.8;
      }
    }
  }

  &.sale {
    &::after {
      @extend %label;
      content: 'Sale';
    }
  }

  &.new {
    &::after {
      @extend %label;
      content: 'New';
    }
  }
}

.product__icons {
  svg {
    padding: 4px;
  }
}
</style>
