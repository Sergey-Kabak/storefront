<template>
  <div class="product w-100 pb20 d-flex-column btw" v-observe-visibility="visibilityChanged">
    <div class="product__icons">
      <AddToWishlist :product="product" class="product-icon" :class="{'active': isOnWishlist }" />
      <AddToCompare :product="product" class="product-icon" :class="{'active': isOnCompare }" />
    </div>
    <router-link
      class="flex flex-column no-underline product-link"
      :to="productLink"
      data-testid="productLink"
    >

      <!--      <div class="product-tag-wrapper">-->
      <!--        <tag text="0.01%" color-type="warning">-->
      <!--          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--            <path d="M3.06369 11.9368L7.69231 3.96706C7.7971 3.78662 7.64848 3.56457 7.44172 3.5927L4.36287 4.01117L5.09851 0.149093C5.1233 0.0188981 4.95544 -0.0557035 4.87543 0.0499293L0.324475 6.0572C0.191912 6.23216 0.332279 6.48095 0.550576 6.45798L3.94498 6.10067L2.83219 11.8501C2.80536 11.9888 2.99274 12.059 3.06369 11.9368Z" fill="#FFCA41"/>-->
      <!--          </svg>-->
      <!--        </tag>-->
      <!--      </div>-->

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

      <!--      <div class="product-tag-bottom">-->
      <!--        <tag :text="$t('Discount on accessories')" color-type="danger">-->
      <!--          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--            <path d="M10.7342 4.16719L9.77793 2.73281C9.69356 2.60625 9.53186 2.54295 9.38418 2.59219C9.2365 2.63437 9.13106 2.775 9.13106 2.92971C9.13106 3.61875 9.02556 4.30781 8.82871 4.97578C8.65996 4.49062 8.33652 4.06172 7.89353 3.77341C7.11306 3.2531 6.90215 2.23591 7.42246 1.45547L8.03418 0.541406C8.10447 0.435914 8.11152 0.295289 8.04822 0.182813C7.99199 0.0702891 7.87244 0 7.73884 0C7.12017 0 6.53655 0.119508 5.99514 0.337477C4.34282 0.998414 3.14749 2.52891 3.03501 4.39216C2.92249 4.08982 2.85923 3.76638 2.85923 3.43591V2.05781C2.85923 1.90315 2.75374 1.76252 2.60608 1.72034C2.45845 1.67112 2.29671 1.73442 2.21233 1.86096L1.74126 2.57112C0.869385 3.87893 0.412354 5.39766 0.412354 6.96565C0.412307 9.74294 2.66936 12 5.4467 12H6.54358C9.32088 12 11.5873 9.74294 11.5873 6.96565C11.5873 5.96716 11.2897 4.99685 10.7342 4.16719Z" fill="#FF5B66"/>-->
      <!--          </svg>-->
      <!--        </tag>-->
      <!--      </div>-->

      <!--<span v-if="product.original_price_incl_tax && product.original_special_price" class="lh30 cl-secondary price-sale mobile">-->
      <!-- -{{ (product.original_price_incl_tax - product.original_special_price) | price(storeView) }}-->
      <!--</span>-->

      <p class="mb0 cl-accent name mt10" v-if="!onlyImage">
        {{ product.name | htmlDecode }}
      </p>

      <div class="flex center-xs start-md mt-auto product-price-block">
        <span
          class="price-original mr5 lh30 cl-secondary"
          v-if="product.special_price && parseFloat(product.original_price_incl_tax) > 0 && !onlyImage"
        >
          {{ product.original_price_incl_tax | price(storeView) }}
        </span>
        <span
          class="price-special lh30 cl-accent weight-700"
          v-if="product.special_price && parseFloat(product.special_price) > 0 && !onlyImage"
        >
            {{ product.price_incl_tax | price(storeView) }}
          </span>
        <span
          class="lh30 cl-secondary price-special"
          v-if="!product.special_price && parseFloat(product.price_incl_tax) > 0 && !onlyImage"
        >
          {{ product.price_incl_tax | price(storeView) }}
        </span>
        <span
          v-if="product.original_price_incl_tax && product.original_special_price"
          class="lh30 cl-secondary price-sale"
        >
          -{{ (product.original_price_incl_tax - product.original_special_price) | price(storeView) }}
        </span>
        <!--      <span class="product-on-credit">{{ $t('In credit') }}</span>-->
      </div>

      <!--<div class="flex center-xs start-md mt-auto product-price-block">-->
        <!--<div-->
            <!--class="flex center-xs start-md mt-auto product-price-block"-->
            <!--v-if="product.original_price_incl_tax && product.original_special_price"-->
        <!--&gt;-->
          <!--<span class="lh30 cl-secondary price-sale">-->
            <!--{{ (product.original_price_incl_tax - product.original_special_price) | price(storeView) }}-->
          <!--</span>-->
          <!--<span class="lh30 cl-secondary price-by-promo-code">-->
            <!--{{ $t('price by promotional code') }}-->
          <!--</span>-->
        <!--</div>-->
        <!--&lt;!&ndash;        <span class="lh30 cl-secondary price-discount">&ndash;&gt;-->
        <!--&lt;!&ndash;          -30%&ndash;&gt;-->
        <!--&lt;!&ndash;        </span>&ndash;&gt;-->
      <!--</div>-->
    </router-link>

    <template v-if="product.stock">
      <span
        class="product-is-not-available"
        v-if="!(product && (product.price_incl_tax && product.price_incl_tax > 0) && (product.stock && product.stock.is_in_stock))"
      >
        {{ $t('Not available') }}
      </span>

      <div
        class="d-flex btw w-100 product-card-bottom-options"
        v-if="!!(product && (product.price_incl_tax && product.price_incl_tax > 0) && (product.stock && product.stock.is_in_stock))"
      >
        <button-full
          @click.native="toProduct()"
          :disabled="!(product && product.stock && product.stock.is_in_stock)"
          data-testid="addToCart" class="add-to-cart"
        >
          <template v-if="!productIsInCart">
            <svg  width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 0H0V2H2.3L5.582 11.025C5.79362 11.6029 6.1773 12.1021 6.68134 12.4552C7.18539 12.8083 7.78556 12.9985 8.401 13H17V11H8.401C7.982 11 7.604 10.735 7.461 10.342L6.973 9H16.246C17.136 9 17.926 8.402 18.169 7.549L19.962 1.275C20.0039 1.12615 20.0109 0.969616 19.9823 0.817634C19.9537 0.665651 19.8904 0.522335 19.7973 0.398886C19.7041 0.275436 19.5837 0.175197 19.4454 0.106001C19.3071 0.0368048 19.1546 0.000526196 19 0ZM16.246 7H6.246L4.428 2H17.675L16.246 7Z" fill="white"/>
              <path d="M8.5 17C9.32843 17 10 16.3284 10 15.5C10 14.6716 9.32843 14 8.5 14C7.67157 14 7 14.6716 7 15.5C7 16.3284 7.67157 17 8.5 17Z" fill="white"/>
              <path d="M14.5 17C15.3284 17 16 16.3284 16 15.5C16 14.6716 15.3284 14 14.5 14C13.6716 14 13 14.6716 13 15.5C13 16.3284 13.6716 17 14.5 17Z" fill="white"/>
            </svg>
          </template>

          <template v-if="productIsInCart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 22C11.3284 22 12 21.3284 12 20.5C12 19.6716 11.3284 19 10.5 19C9.67157 19 9 19.6716 9 20.5C9 21.3284 9.67157 22 10.5 22Z" fill="white"/>
              <path d="M16.5 22C17.3284 22 18 21.3284 18 20.5C18 19.6716 17.3284 19 16.5 19C15.6716 19 15 19.6716 15 20.5C15 21.3284 15.6716 22 16.5 22Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14 5H2V7H4.3L7.582 16.025C7.79362 16.6029 8.1773 17.1021 8.68134 17.4552C9.18539 17.8083 9.78556 17.9985 10.401 18H19V16H10.401C9.982 16 9.604 15.735 9.461 15.342L8.973 14H18.246C19.136 14 19.926 13.402 20.169 12.549L21.0187 9.57574C20.4013 9.84851 19.7184 10 19 10C16.2386 10 14 7.76142 14 5Z" fill="white"/>
              <path d="M18.25 8.16L15.5 5.16L16.66 4L18.25 5.59L21.84 2L23 3.41L18.25 8.16Z" fill="white"/>
            </svg>
          </template>
          <span class="add-to-cart-text">{{ $t('Buy') }}</span>
        </button-full>
      </div>
    </template>

    <!-- <div class="flex between-md mt15" v-if="isShowCompareAndFavorite">
      <AddToCompare :product="product"/>
      <AddToWishlist :product="product"/>
    </div> -->

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

export default {
  mixins: [ProductTile, IsOnWishlist, IsOnCompare],
  components: {
    ButtonFull,
    ProductImage,
    AddToWishlist,
    AddToCompare,
    AddToCart,
    Tag
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
  .product {
    .add-to-cart {
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        display: none;
      }
    }
    @media (max-width: 767px) {
      .add-to-cart svg {
        display: block !important;
      }
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
      align-items: flex-start;
      .mt-auto {
        margin-top: auto;
      }
    }

    .name {
      /*margin: 12px 0 16px;*/
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 24px;
      color: #1A1919;
      height: 48px;
      overflow: hidden;
      @media (max-width: 991px) {
        margin-bottom: 10px;
      }
    }
    @media (max-width: 767px) {
      padding: 5px;
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
      width: 100%;

      @media (max-width: 767px) {
        flex-direction: column;
        .price-sale {
          margin-left: 0;
          margin-top: 5px;
        }
      }
    }

    &-is-not-available {
      width: 100%;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      color: #000000;
      cursor: pointer;
      padding: 24px 0;
      text-align: center;
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

    .add-to-cart {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: #FFFFFF;
      flex: none;
      order: 0;
      align-self: center;
      margin: 10px 0;
      &-text {
        display: block;
      }
    }

    &-card-bottom-options {
      justify-content: space-between;
      text-align: right;
      margin-top: 20px;
      display: flex;
      align-items: center;
    }
  }

  .price {
    &-discount {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 16px;
      text-transform: uppercase;
      color: #FFFFFF;
      background: #EE2C39;
      border-radius: 30px;
      padding: 0 3px;
      @media (max-width: 991px) {
        margin-left: -10px;
        margin-top: -22px;
      }
    }
    &-original {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
      text-decoration-line: line-through;
      color: #5F5E5E;
      margin-right: 4px;
    }
    &-special {
      font-weight: 600;
      font-family: DIN Pro;
      font-style: normal;
      font-size: 22px;
      line-height: 30px;
      color: #1A1919;
      margin-right: 4px;
      @media (max-width: 787px) {
        font-size: 20px;
      }
    }
    &-sale {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: #EE2C39;
      margin-right: 4px;
      /*@media (max-width: 787px) {*/
      /*  display: none;*/
      /*}*/

      /*&.mobile {*/
      /*  display: none;*/
      /*  @media (max-width: 787px) {*/
      /*    width: auto;*/
      /*    margin: 10px 0 0;*/
      /*    display: flex;*/
      /*  }*/
      /*}*/
    }
    &-by-promo-code {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 13px;
      display: flex;
      align-items: center;
      color: #1A1919;
      border-bottom: 1px dashed #1A1919;
      box-sizing: border-box;
      padding-bottom: 3px;
      margin-bottom: -8px;
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
    height: 215px;
    width: 100%;

    &__thumb {
      padding: 0;
      opacity: 0.8;
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

.product-icon {
  z-index: 1;
  opacity: 0;

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
}
</style>
