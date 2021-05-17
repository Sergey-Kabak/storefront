<template>
  <div @click="gtm" class="product" :class="stockStatus">
    <img v-if="product.promo_icon" :class="{'undiscounted': !product.special_price}" :src="getThumbnail(product.promo_icon, 56, 56)" alt="promo-icon" class="product-promo-icon">
    <div class="product-actions">
      <AddToWishlist :product="product" class="product-icon" />
      <AddToCompare class="product__icon" :product="product">
        <template v-slot:active-compare-icon>
          <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z"
                fill="#BDBDBD"/>
          </svg>
        </template>
      </AddToCompare>
    </div>
    <router-link
        class="product-link"
        :to="productLink"
        data-testid="productLink"
    >
      <div class="product-cover">
        <product-image
            class="product-image"
            :image="thumbnailObj"
            :alt="product.name | htmlDecode"
            :calc-ratio="false"
            data-testid="productImage"
        />
      </div>
    </router-link>
    <div class="product-details">
      <span class="product-status" :class="stockStatus">{{ $t(stockStatus) }}</span>
      <h2 :title="product.name" class="product-name" style="-webkit-line-clamp: 2; -webkit-box-orient: vertical; display: -webkit-box;" >{{ product.name | htmlDecode }}</h2>
      <div class="product-bottom">
        <product-cart-price :product="product" class="product-cart-price" />
        <product-cart-controls @click="navigate()" :stockStatus="stockStatus" v-if="product.stock" :product="product" class="cart-default"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductImage from '../../ProductImage';
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist';
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare';
import ProductCartControls from 'theme/components/core/blocks/Product/ProductCartControls';
import ProductCartPrice from 'theme/components/core/blocks/Product/ProductCartPrice';
import GTM from 'theme/mixins/GTM/dataLayer'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { mapGetters } from 'vuex';
import { ProductStock } from 'theme/helpers'

export default {
  mixins: [ProductTile, GTM],
  components: {
    ProductImage,
    AddToWishlist,
    AddToCompare,
    ProductCartControls,
    ProductCartPrice
  },
  props: {
    gtmList: {
      type: String,
      default: 'Category'
    }
  },
  computed: {
    ...mapGetters({
      productsInCart: 'cart/getCartItems'
    }),
    stockStatus () {
      return ProductStock(this.product)
    },
    thumbnailObj () {
      return {
        src: this.thumbnail,
        loading: this.thumbnail
      }
    },
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    gtm () {
      this.GTM_PRODUCT_CLICK([this.product], this.gtmList)
    },
    onProductPriceUpdate (product) {
      if (product.sku === this.product.sku) {
        Object.assign(this.product, product)
      }
    },
    navigate () {
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
.product {
  &-details{
    flex: 1;
  }
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 16px;
  border: 1px solid #E0E0E0;
  @media (max-width: 768px) {
    flex-direction: column;
  }

  &.NotAvailable,
  &.OutOfProduction {

    .product-link,
    .product-name,
    .product-bottom {
      opacity: .5;
    }
  }
}

.product-promo-icon {
  max-width: 56px;
  max-height: 56px;
  position: absolute;
  top: 48px;
  left: 16px;

  &.undiscounted {
    top: 16px;
  }
}

.product-actions {
  @media (max-width: 768px) {
    flex-direction: column;
  }
  position: absolute;
  z-index: 1;
  right: 12px;
  top: 12px;
  display: flex;
  ::v-deep svg {
    padding: 4px;
  }
  ::v-deep button {
    margin-bottom: 8px;
  }
  .product-icon {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.product-cover {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image {
  @media (max-width: 768px) {
    margin-right: 0px;
    margin-bottom: 16px;
    height: 128px;
    max-width: 128px;
  }
  height: 88px;
  max-width: 88px;
  width: 100%;
  margin-bottom: 16px;
  mix-blend-mode: multiply;
  transition: .2s ease-in-out;
  margin-right: 16px;
  &:hover {
    transform: scale(1.08);
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
  height: 35px;
  overflow: hidden;
}

.product-status {
  display: block;
  margin-bottom: 12px;
  text-align: left;
  font-weight: 500;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 16px;
}

.product-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

::v-deep {
  .product-cart-price {
    .price-discount {
      position: absolute;
      top: 16px;
      left: 16px;
      font-size: 12px;
      line-height: 24px;
    }

    .price-original {
      margin-bottom: 4px;
    }

    .price-special {
      line-height: 30px;
    }

    .main-price {
      display: flex;
      flex-direction: column;
    }
  }
}

@media (max-width: 768px) {
  .product {
    border-radius: 0;
  }

  .product-image {
    height: 128px;
    max-width: 128px;
  }

  .product-status {
    font-size: 13px;
    line-height: 16px;
  }

  .product-name {
    font-size: 13px;
    height: 32px;
    line-height: 16px;
  }

  ::v-deep {
    .product-cart-price {
      .price-discount {
        font-size: 11px;
        line-height: 16px;
      }

      .price-original {
        font-size: 12px;
        line-height: 16px;
      }

      .price-special {
        font-size: 18px;
        line-height: 20px;
      }
    }
  }
}
</style>
