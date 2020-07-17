<template>
  <div class="product w-100 pb20 d-flex-column btw mt20" v-observe-visibility="visibilityChanged">
    <div class="product__icons">
      <AddToWishlist :product="product">
        <div
          class="product__icon"
          :class="{'product__icon--active': isOnWishlist }"
          :title="isOnWishlist ? $t('Remove') : $t('Add to favorite') "
        >
          <i class="material-icons">{{ favoriteIcon }}</i>
        </div>
      </AddToWishlist>
      <AddToCompare :product="product">
        <div
          class="product__icon"
          :class="{'product__icon--active':isOnCompare } "
          :title="isOnCompare ? $t('Remove from compare') : $t('Add to compare')"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.9984 14.7007C22.0045 14.5941 21.9894 14.4846 21.9489 14.3783L19.0326 6.71673L14.0483 5.63723C13.8851 4.97321 13.4067 4.43215 12.7814 4.18184V2H11.2188V4.18188C10.8618 4.32481 10.5527 4.56231 10.3227 4.86364L5.05446 3.75407L2.05122 11.6439C2.01262 11.7453 1.99661 11.8498 2.00059 11.9518C2.00055 11.9548 2.00012 11.9578 2.00012 11.9609C2.00012 13.921 3.59474 15.5156 5.55478 15.5156C7.51486 15.5156 9.10947 13.921 9.10947 11.9609C9.10947 11.8502 9.08611 11.745 9.04455 11.6495C9.04385 11.6477 9.04346 11.6458 9.04275 11.6439L6.78615 5.71555L9.90369 6.37208C9.98994 7.15837 10.5101 7.8156 11.2188 8.09935V20.4374H7.23447V21.9999H16.7657V20.4374H12.7814V8.09935C13.2246 7.92192 13.5938 7.59848 13.8296 7.18856L17.3998 7.96181L14.9574 14.3783C14.9364 14.4335 14.9227 14.4895 14.9146 14.5456C14.8996 14.6062 14.8907 14.6691 14.8907 14.7343C14.8907 16.6944 16.4853 18.289 18.4453 18.289C20.4054 18.289 22 16.6944 22 14.7343C22 14.7229 21.9988 14.7119 21.9984 14.7007ZM5.55482 13.9531C4.73349 13.9531 4.02661 13.4534 3.7222 12.7421H7.38736C7.08298 13.4534 6.37611 13.9531 5.55482 13.9531ZM7.19416 11.1796H3.89985L5.547 6.85231L7.19416 11.1796ZM12.0001 6.68747C11.6985 6.68747 11.4532 6.44216 11.4532 6.14059C11.4532 5.83903 11.6985 5.59372 12.0001 5.59372C12.3017 5.59372 12.547 5.83903 12.547 6.14059C12.547 6.44216 12.3017 6.68747 12.0001 6.68747ZM18.4532 9.58665L20.1153 13.9531H16.7912L18.4532 9.58665ZM18.4454 16.7265C17.6241 16.7265 16.9172 16.2268 16.6128 15.5155H20.2779C19.9736 16.2268 19.2667 16.7265 18.4454 16.7265Z" fill="#828282"/>
          </svg>
        </div>
      </AddToCompare>
    </div>
    <router-link
      class="flex flex-column no-underline product-link"
      :to="productLink"
      data-testid="productLink"
    >
      <div
        class="product-cover bg-cl-secondary"
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

      <span v-if="product.original_price_incl_tax && product.original_special_price" class="lh30 cl-secondary price-sale mobile">
          -{{ (product.original_price_incl_tax - product.original_special_price) | price(storeView) }}
      </span>

      <p class="mb0 cl-accent name mt10" v-if="!onlyImage">
        {{ product.name | htmlDecode }}
      </p>

      <div class="flex center-xs start-md mt-auto product-price-block">
        <span
            class="price-original mr5 lh30 cl-secondary"
            v-if="product.special_price && parseFloat(product.original_price_incl_tax) > 0 && !onlyImage"
        >{{ product.original_price_incl_tax | price(storeView) }}</span>

        <span
            class="price-special lh30 cl-accent weight-700"
            v-if="product.special_price && parseFloat(product.special_price) > 0 && !onlyImage"
        >{{ product.price_incl_tax | price(storeView) }}</span>

        <span
            class="lh30 cl-secondary price-special"
            v-if="!product.special_price && parseFloat(product.price_incl_tax) > 0 && !onlyImage"
        >{{ product.price_incl_tax | price(storeView) }}</span>
        <span v-if="product.original_price_incl_tax && product.original_special_price" class="lh30 cl-secondary price-sale">
          -{{ (product.original_price_incl_tax - product.original_special_price) | price(storeView) }}
        </span>
      </div>
    </router-link>
    <div class="d-flex btw" v-if="(product && product.stock && product.stock.is_in_stock) && (product && (product.price_incl_tax || product.original_price_incl_tax))">
      <!--<add-to-cart-->
        <!--:product="product"-->
        <!--:disabled="!(product && product.stock && product.stock.is_in_stock)"-->
        <!--class="col-xs-12 col-sm-4 col-md-6 add-to-cart"-->
      <!--/>-->
      <button-full @click.native="toProduct()" :disabled="!(product && product.stock && product.stock.is_in_stock)" data-testid="addToCart" class="add-to-cart">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="add-to-cart-ico">
          <path d="M21 4H2V6H4.3L7.582 15.025C7.79362 15.6029 8.1773 16.1021 8.68134 16.4552C9.18539 16.8083 9.78556 16.9985 10.401 17H19V15H10.401C9.982 15 9.604 14.735 9.461 14.342L8.973 13H18.246C19.136 13 19.926 12.402 20.169 11.549L21.962 5.275C22.0039 5.12615 22.0109 4.96962 21.9823 4.81763C21.9537 4.66565 21.8904 4.52234 21.7973 4.39889C21.7041 4.27544 21.5837 4.1752 21.4454 4.106C21.3071 4.0368 21.1546 4.00053 21 4ZM18.246 11H8.246L6.428 6H19.675L18.246 11Z" fill="#ffffff"/>
          <path d="M10.5 21C11.3284 21 12 20.3284 12 19.5C12 18.6716 11.3284 18 10.5 18C9.67157 18 9 18.6716 9 19.5C9 20.3284 9.67157 21 10.5 21Z" fill="#ffffff"/>
          <path d="M16.5 21C17.3284 21 18 20.3284 18 19.5C18 18.6716 17.3284 18 16.5 18C15.6716 18 15 18.6716 15 19.5C15 20.3284 15.6716 21 16.5 21Z" fill="#ffffff"/>
        </svg>
        <span class="add-to-cart-text">{{ $t('Buy') }}</span>
      </button-full>
    </div>
    <div class="flex between-md mt15" v-if="isShowCompareAndFavorite">
      <AddToCompare :product="product" />
      <AddToWishlist :product="product" />
    </div>
  </div>
</template>

<script>
import rootStore from '@vue-storefront/core/store'
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts'
import config from 'config'
import ProductImage from './ProductImage'
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist'
import AddToCart from 'theme/components/core/AddToCart.vue'
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare'
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist'
import { IsOnCompare } from '@vue-storefront/core/modules/compare/components/IsOnCompare'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'

export default {
  mixins: [ProductTile, IsOnWishlist, IsOnCompare],
  components: {
    ButtonFull,
    ProductImage,
    AddToWishlist,
    AddToCompare,
    AddToCart
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

<style lang="scss">
  .product {
    .add-to-cart {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 767px) {
      .add-to-cart {
        padding: 8px 0 !important;
      }
      .add-to-cart-text {
        display: none !important;
      }
      .add-to-cart-ico {
        margin: 0 !important;
      }
    }
  }
</style>

<style lang="scss" scoped>
@import '~theme/css/animations/transitions';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

$bg-secondary: color(secondary, $colors-background);
$border-secondary: color(secondary, $colors-border);
$color-white: color(white);

.product {
  position: relative;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px;

  &.d-flex-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .flex-column {
    flex-direction: column;
  }

  .product-link {
    align-items: flex-start;
    .mt-auto {
      margin-top: auto;
    }
  }

  .name {
    font-family: 'DIN Pro';
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #1A1919;
    margin: 12px 0 16px;
  }
  @media (max-width: 767px) {
    padding-bottom: 10px;
  }
  &__icons {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding-right: 20px;
    padding-top: 10px;
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

  .product-price-block {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    @media (max-width: 767px) {
      .price-sale {
        margin-left: 0;
        margin-top: 5px;
      }
    }
  }
}

.price {
  &-original {
    font-size: 11px;
    line-height: 11px;
    font-family: 'DIN Pro';
    text-decoration: line-through;
    color: #5F5E5E;
  }
  &-special {
    font-family: 'DIN Pro';
    font-weight: 900;
    font-size: 18px;
    line-height: 20px;
    color: #1A1919;
  }
  &-sale {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 16px;
    text-transform: uppercase;
    color: #FFFFFF;
    background: #EE2C39;
    border-radius: 30px;
    padding: 7px;
    margin-left: 10px;
    @media (max-width: 787px) {
      display: none;
    }

    &.mobile {
      display: none;
      @media (max-width: 787px) {
        width: auto;
        margin: 10px 0 0;
        display: flex;
      }
    }
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

  &__thumb {
    padding: 0;
    opacity: 0.8;
    will-change: opacity, transform;
    transition: 0.3s opacity $motion-main, 0.3s transform $motion-main;
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
</style>
