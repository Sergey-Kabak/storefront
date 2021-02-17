<template>
  <div @click="gtm" class="product w-100 pb20 d-flex-column btw" v-observe-visibility="visibilityChanged">
    <div class="product__icons" v-if="isShowCompareAndFavorite">
      <AddToWishlist :product="product" class="product-icon" :class="{'active': isOnWishlist }" />
      <AddToCompare :product="product" class="product-icon" :class="{'active': isOnCompare }" />
    </div>
    <router-link
      class="flex flex-column no-underline product-link"
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
      class="cart-default"/>
  </div>
</template>

<script>
import rootStore from '@vue-storefront/core/store';
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts';
import config from 'config';
import ProductImage from './ProductImage';
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist';
import AddToCart from 'theme/components/core/AddToCart.vue';
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare';
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist';
import { IsOnCompare } from '@vue-storefront/core/modules/compare/components/IsOnCompare';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import Tag from 'theme/components/core/Tag';
import { mapGetters } from 'vuex';
import ProductCartControls from 'theme/components/core/blocks/Product/ProductCartControls';
import ProductCartPrice from 'theme/components/core/blocks/Product/ProductCartPrice';
import GTM from 'theme/mixins/GTM/dataLayer'

export default {
  mixins: [ProductTile, IsOnWishlist, IsOnCompare, GTM],
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
      default: true
    },
    labelsActive: {
      type: Boolean,
      default: true
    },
    onlyImage: {
      type: Boolean,
      default: false
    },
    gtmList: {
      type: String,
      default: 'Category'
    }
  },
  computed: {
    ...mapGetters({
      productsInCart: 'cart/getCartItems'
    }),
    productIsInCart() {
      return !!(this.productsInCart.find(p => this.product.id === p.id))
    },
    thumbnailObj () {
      return {
        src: this.thumbnail,
        loading: this.thumbnail
      }
    },
    favoriteIcon () {
      return this.isOnWishlist ? 'favorite' : 'favorite_border'
    },
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    gtm () {
      console.log(this.gtmList);
      this.GTM_PRODUCT_CLICK([this.product], this.gtmList)
    },
    toProduct () {
      this.$router.push(this.productLink)
    },
    onProductPriceUpdate (product) {
      if (product.sku === this.product.sku) {
        Object.assign(this.product, product)
      }
    },
    productPercent () {
      let a = this.product.original_price_incl_tax / 100
      let b = this.product.original_special_price / a
      return 100 - b
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
        for (const confChild of this.product.configurable_children) {
          const cachedItem = rootStore.state.stock.cache[confChild.id]
          if (typeof cachedItem === 'undefined' || cachedItem === null) {
            skus.push(confChild.sku)
          }
        }
        if (skus.length > 0) {
          rootStore.dispatch('stock/list', { skus: skus }) // store it in the cache
        }
      }
    },
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
  .bg-white{
    background-color: #fff;
  }
  .promo_img{
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    padding: 16px;
    img{
      max-width: 50px;
    }
  }
  $border: 1px solid #E0E0E0;
  .product {
    @media (max-width: 540px){
      min-width: 50% !important;
      border: none;

      border-bottom: $border;
      border-radius: 0;
      &:nth-child(2n-1) {
        padding-left: 0;
      }
      &:nth-child(2n) {
        padding-right: 0;
      }
      &:nth-child(1),
      &:nth-child(2) {
        border-top: $border;
      }
      &:nth-child(2n-1) {
        border-right: $border;
      }
      &:nth-child(2n-1) {
        border-right: $border;
      }
    }
    position: relative;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 19px 16px;

    &-tag {
      &-bottom {
        z-index: 3;
        margin-top: 3px;
      }
      &-wrapper {
        position: absolute;
        z-index: 3;
        display: flex;
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
      height: 100%;
      align-items: flex-start;
      .mt-auto {
        margin-top: auto;
      }
    }

    &__icons {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      flex-direction: column;
    }
    &__icon {
      padding-top: 10px;
      opacity: 0;
      z-index: 2;
      transition: 0.3s opacity $motion-main;
      @media (max-width: 767px) {
        opacity: 1;
      }
      &--active {
        opacity: 1;
      }
    }
    .btw {
      justify-content: space-between;
      text-align: right;
      margin-top: 20px;
    }
    .add-to-cart {
      padding: 8px 10px;
      border-radius: 4px;
      width: 50%;
      display: inline-flex;
      margin-top: auto;
      margin-left: auto;
      min-width: auto;
      font-weight: bold;
    }

    &-on-credit {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 15px;
      display: flex;
      align-items: center;
      color: #1A1919;
      border-bottom: 1px dashed #1A1919;
      box-sizing: border-box;
      padding-bottom: 3px;
      cursor: pointer;
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

  .product-cover {
    overflow: hidden;
    height: 259px;
    @media only screen and (max-width: 768px) {
      height: auto;
    }
    width: 100%;

    &__thumb {
      padding: 0;
      will-change: opacity, transform;
      transition: 0.3s opacity $motion-main, 0.3s transform $motion-main;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    @media screen and (min-width: 768px) {
      &:hover {
        .product-cover__thumb {
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

.product-icon {
  z-index: 1;
  opacity: 1;
  margin-bottom: 8px;
  margin-right: 0px;
  border-radius: 4px;

  &:hover {
    @media only screen and (max-width: 768px) {
      background: rgba(255, 255, 255, 1);
    }
  }
  @media only screen and (max-width: 768px) {

  }
  &.active {
    opacity: 1!important;
  }

  ::v-deep svg {
    background: none;
    pointer-events:none;
  }
}

.product {
  &:hover {
    .product-icon {
      opacity: 1;
    }
  }
  @media only screen and (max-width: 768px) {
    min-height: 350px;
  }
}

</style>
