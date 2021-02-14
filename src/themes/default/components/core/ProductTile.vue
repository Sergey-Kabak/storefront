<template>
  <div @click="gtm" class="product w-100 pb20 d-flex-column btw" v-observe-visibility="visibilityChanged">
    <div v-if="ValentainsDay" class="promo_img">
      <img :src="ValentainsDay" alt="valentines-day">
    </div>
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
    ValentainsDay () {
      const forHim = [
        'т38725',
        'т38733',
        'т32154',
        'т31295',
        'т33023',
        'т33024',
        'т34068',
        'т35869',
        'т35869',
        'т38878',
        'т26822',
        'т33026',
        'т33025',
        'т30009',
        'т35084',
        'т35082',
        'т35083',
        'т35443',
        'т35444',
        'т27127',
        'т27126',
        'т27179',
        'т28012',
        'т30385',
        'т33147'
      ]
      if (forHim.includes(this.product.sku)) {
        return `/assets/promo/vd2.png`
      }
      const forHer = [
        'Т32857',
        'т33188',
        'т33203',
        'т30383',
        'т32500',
        'т35426',
        'т33793',
        'т35571',
        'т34833',
        'т39618',
        'т39619',
        'т39620',
        'т39621'
      ]
      if (forHer.includes(this.product.sku)) {
        return `/assets/promo/vd1.png`
      }
      const forLovers = [
        'т29795',
        'т29792',
        'т29791',
        'т29794',
        'т29793',
        'т26626',
        'т29789',
        'т29788',
        'т29790',
        'т26924',
        'т31056',
        'т31053',
        'т31055',
        'т31051',
        'т31052',
        'т31038',
        'т31035',
        'т31037',
        'т31033',
        'т31034',
        'т36929',
        'т36930',
        'т36931',
        'т36932',
        'т36933',
        'т36934',
        'т36935',
        'т36937',
        'т36936',
        'т36938',
        'т38645',
        'т34813',
        'т29816',
        'т29815',
        'т29814',
        'т35866',
        'т35867',
        'т35868',
        'т32729',
        'т32731',
        'т27102',
        'т27103',
        'т35460',
        'т39142',
        'т38902',
        'т38903',
        'т38904',
        'т38799',
        'т38798',
        'т38800',
        'т38796',
        'т38795',
        'т38797',
        'т27151',
        'т27152',
        'т27149',
        'т27150',
        'т30967',
        'т26990',
        'т26991',
        'т30216',
        'т26906',
        'т26905',
        'т30215',
        'т27046',
        'т29978',
        'т30176',
        'т27110',
        'т27111',
        'т27112',
        'т30288',
        'т30342',
        'т30966',
        'т30962',
        'т30963',
        'т30987',
        'т30988',
        'т33791',
        'т33792',
        'т33794',
        'т33789',
        'т28321',
        'т28320',
        'т30597',
        'т29961',
        'т30122',
        'т30123',
        'т37689',
        'т29445',
        'т29448',
        'т29960',
        'т32126',
        'т38301',
        'т33661',
        'т32134',
        'т32135',
        'т32127',
        'т32128',
        'т32129',
        'т32130',
        'т28680',
        'т31425',
        'т31424',
        'т28679',
        'т27144',
        'т28019',
        'т34820',
        'т35418',
        'т35419',
        'т35572',
        'т35574',
        'т32834',
        'т32724',
        'т33696',
        'т38893',
        'т33703',
        'т33698',
        'т33697',
        'т35079',
        'т35080',
        'т33699',
        'т36793',
        'т33654',
        'т30465',
        'т25649',
        'т25648',
        'т15786',
        'т21689',
        'т26662',
        'т28156',
        'т33884',
        'т33883',
        'т30740',
        'т35194',
        'т33941',
        'т30739',
        'т35436',
        'т35430',
        'т35431',
        'т35432',
        'т35429',
        'т35428',
        'т35433',
        'т35434',
        'т35435',
        'т35414',
        'т32160',
        'т32159',
        'т35423',
        'т35422',
        'т35425',
        'т35452',
        'т34637',
        'т34636',
        'т26289',
        'т28366',
        'т38893'
      ]
      if (forLovers.includes(this.product.sku)) {
        return `/assets/promo/vd3.png`
      }
      return ''
    },
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
  .product {
    @media (max-width: 575px){
      min-width: 50% !important;
    }
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
    height: 215px;
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
