<template>
  <div @click="gtm" class="product w-100 pb20 btw" v-observe-visibility="visibilityChanged"
       :class="{'not-availible' : isAvailible}">
    <div class="product__icons">
      <AddToWishlist class="product__icon" :product="product" />
      <RemoveIcon class="product__icon" @onRemove="removeProductFromCompare(product)"/>
    </div> 
    <router-link
      class="flex no-underline product-link product-img"
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
    </router-link>
    <div class="product-info">
      <span class="product-status" :class="stockStatus">{{ $t(stockStatus) }}</span>
      <h2 :title="product.name" class="product-name" style="-webkit-line-clamp: 2; -webkit-box-orient: vertical; display: -webkit-box;" >{{ product.name | htmlDecode }}</h2>
      <div class="product-bottom">
        <product-cart-price :product="product" />
        <product-cart-controls @click="navigate()" v-if="product.stock" :product="product" :stockStatus="stockStatus" class="product-cart-controls" />
      </div>
    </div>
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
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import ProductCartMixin from '../../../../mixins/ProductCartMixin';
import ProductCartControls from '../Product/ProductCartControls';
import ProductCartPrice from '../Product/ProductCartPrice';
import GTM from 'theme/mixins/GTM/dataLayer'
import { ProductStock } from 'theme/helpers'
import RemoveIcon from 'theme/components/core/RemoveIcon';

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
    ProductCartPrice,
    RemoveIcon
  },
  props: {
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
    },
    stockStatus () {
      return ProductStock(this.product)
    },
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    }
  },
  methods: {
    gtm () {
      this.GTM_PRODUCT_CLICK([this.product], 'compare page')
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
    },
    removeProductFromCompare() {
      this.$store.dispatch('compare/removeItem', this.product);
    },
    navigate() {
      this.$router.push(this.productLink)
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

.product-info {
  width: 100%;
}

.product-cart-controls{
  box-sizing: border-box;
  position: relative;
}

.product-bottom {
  width: 100%;
  padding-right: 4px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
  display: flex;
  position: relative;
  min-height: 164px;
  max-height: 164px;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  //border-radius: 4px;
  padding: 16px 12px 16px 16px;

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
    .main-price {
      flex-direction: column;
    }

    .price-discount {
      position: absolute;
      left: 16px;
      top: 16px;
    }

    .icon-wishlist {
      margin-right: 0;
    }
    .add-to-wishlist {
      top: 0;
    }
 }
  &__icons {
    z-index: 1;
    flex-direction: row;
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
  }

  &__icon {
    &:first-child {
      margin-right: 7px;
    }

    transition: 0.3s opacity $motion-main;

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
    text-align: right;
    margin-top: 20px;
  }
}

.product-name {
  margin: 0 0 16px 0;
  text-align: left;
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 18px;
  color: #1A1919;
  font-weight: 400;
  height: 36px;
  overflow: hidden;
}

.product-status {
  display: block;
  margin-bottom: 20px;
  text-align: left;
  font-weight: 500;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 16px;
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

@media (max-width: 768px) {
  .product {
    flex-direction: column;
    min-height: 292px;
    max-height: 292px;
  }

  .product-status {
    font-size: 13px;
    line-height: 16px;
    margin-bottom: 12px;
  }

  .product-name {
    font-size: 13px;
    line-height: 16px;
    height: 32px;
  }

  .product__icons {
    flex-direction: column-reverse;
  }

  .product__icon {
    margin-right: 0!important;
    &:last-child {
      margin-bottom: 8px;
    }
  }

  ::v-deep {
    .price-special {
      font-size: 18px;
      line-height: 20px;
    }

    .price-original {
      font-size: 12px;
      line-height: 16px;
    }
  }
}
</style>
