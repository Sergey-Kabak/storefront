<template>
  <li @click="gtm" class="product" :class="[{ 'not-found': isShowButtons }, stockStatus]">
    <router-link class="product-img" @click.native="closeSearchPanel()" :to="productLink">
      <img v-lazy="image.src" :alt="product.name" class="product-image">
    </router-link>
    <div class="product-middle">
      <div class="product-top" >
        <div class="product-info">
          <span class="product-status" :class="stockStatus">{{ $t(stockStatus) }}</span>
          <router-link
            @click.native="closeSearchPanel()"
            :to="productLink"
            class="product-name"
            style="-webkit-line-clamp: 2; -webkit-box-orient: vertical; display: -webkit-box;"
          >
            {{ product.name | htmlDecode }}
          </router-link>
        </div>
        <div class="product-right" v-if="isShowButtons">
          <div class="product-right-data">
            <AddToCompare :product="product"> </AddToCompare>
            <AddToWishlist :product="product"> </AddToWishlist>
          </div>
          <div class="product-right-data mobile">
            <more-icon class="more">
              <AddToWishlist :product="product" class="more-item" showDescription />
              <AddToCompare :product="product" class="more-item" showDescription />
            </more-icon>
          </div>
        </div>
      </div>
      <div class="product-bottom">
        <product-cart-price class="product-price" :product="product" :nameVisibility="false" />
        <product-cart-controls v-if="isShowButtons" :stockStatus="stockStatus" :product="product" class="cart-default"/>
      </div>
    </div>
  </li>
</template>
<script>

import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import ProductImage from 'theme/components/core/ProductImage';
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare';
import ProductCartControls from 'theme/components/core/blocks/Product/ProductCartControls';
import ProductCartPrice from 'theme/components/core/blocks/Product/ProductCartPrice'
import MoreIcon from 'theme/components/core/MoreIcon';
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist';
import AddToCart from 'theme/components/core/AddToCart';
import GTM from 'theme/mixins/GTM/dataLayer';
import { ProductStock } from 'theme/helpers'

export default {
  mixins: [Product, GTM],
  components: {
    ProductImage,
    AddToCompare,
    MoreIcon,
    AddToWishlist,
    AddToCart,
    ProductCartPrice,
    ProductCartControls
  },
  props: {
    isShowButtons: {
      type: Boolean,
      default: true,
      required: false
    },
    gtmList: {
      type: String,
      default: 'search results'
    }
  },
  computed: {
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    stockStatus () {
      return ProductStock(this.product)
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    },
    storeView () {
      return currentStoreView()
    },
    inStock () {
      return this.product.stock && this.product.stock.is_in_stock
    }
  },
  methods: {
    gtm () {
      this.GTM_PRODUCT_CLICK([this.product], this.gtmList)
    },
    closeSearchPanel (){
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setMicrocart', false)
      this.$store.commit('ui/setSearchpanel', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.button-full.add-to-cart {
  height: 32px;
  margin-left: auto;
}

.product {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 16px;

  &.not-found {
    border: 1px solid #E0E0E0;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &.NotAvailable,
  &.OutOfProduction {
    ::v-deep { 
      .product-name,
      .product-image,
      .main-price {
        opacity: .5;
      }
    }
  }
}

.product-price ::v-deep {
  .price-discount {
    position: absolute;
    left: 16px;
    top: 16px;
  }

  .price-special {
    font-size: 18px;
    line-height: 20px;
  }

  .price-original {
    font-size: 12px;
    line-height: 12px;
  }
}

.product-img ::v-deep {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  margin-right: 16px;

  img {
    max-width: 88px;
    max-height: 88px;
  }
}

.product-middle {
  width: 100%;
}

.product-top {
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 16px;
}

.product-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.product-right-data {
  display: flex;
  align-items: center;
  margin-left: auto;

  &.mobile {
    display: none;
  }

  .add-to-compare {
    margin-right: 6px;
  }
}

.actions {
  display: flex;
  align-items: center;

  .add-to-cart-button {
    max-width: 131px;
    height: 32px !important;
  }
}

.product-status {
  display: block;
  font-weight: 500;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 16px;
}

.product-name {
  display: inline-block;
  height: 36px;
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 18px;
  color: #1A1919;
  cursor: pointer;
  overflow: hidden;
}

.product-right {
  margin-left: auto;

  .more {
    margin-left: auto;

    .more-item {
      display: flex;
      align-items: center;
      padding: 4px 16px;
    }
  }
}

.add-to-cart-info {
  &.mobile {
    display: none;
  }
}

.product-actions {
  max-width: 131px;
  width: 100%;
  margin-top: auto;
}

@media (max-width: 768px) {
  .product-img ::v-deep {
    width: 56px;
    height: 56px;
    margin-right: 12px;

    img {
      max-width: 56px;
      max-height: 56px;
    }
  }
}

</style>
