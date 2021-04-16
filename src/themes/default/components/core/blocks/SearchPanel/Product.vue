<template>
  <li @click="gtm" class="product" :class="{'out-of-stock': !inStock}">
    <router-link class="product-img" @click.native="closeSearchPanel()" :to="productLink">
      <img v-lazy="image.src" :alt="product.name" class="product-image">
    </router-link>
    <div class="product-middle">
      <div class="product-top" >
        <router-link
          @click.native="closeSearchPanel()"
          :to="productLink"
          class="product-name"
        >
          {{ product.name | htmlDecode }}
        </router-link>
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
        <div class="product-actions">
          <div class="actions" v-if="inStock && isShowButtons">
            <AddToCart :product="product" />
          </div>
          <blurred-text @click="console.log('asd')" color="#1A1919" v-if="!inStock">{{ $t('Not available') }}</blurred-text>
        </div>
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
import ButtonText from 'theme/components/theme/ButtonText';
import ButtonFull from 'theme/components/theme/ButtonFull';
import MoreIcon from 'theme/components/core/MoreIcon';
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist';
import AddToCart from 'theme/components/core/AddToCart';
import GTM from 'theme/mixins/GTM/dataLayer';
import ProductCartPrice from '../Product/ProductCartPrice';
import BlurredText from 'theme/components/theme/BlurredText';

export default {
  mixins: [Product, GTM],
  components: {
    ProductImage,
    AddToCompare,
    ButtonText,
    ButtonFull,
    MoreIcon,
    AddToWishlist,
    AddToCart,
    ProductCartPrice,
    BlurredText
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
  display: flex;
  align-items: flex-start;
  padding: 16px;

  &.out-of-stock {
    .product-name {
      color: #989797;
    }

    .product-image,
    .product-price {
      filter: opacity(0.6);
    }
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
}

.product-bottom {
  display: flex;
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

  .credit {
    font-weight: 600;
    margin-right: 24px;

    &.mobile {
      display: none;
    }
  }

  .add-to-cart-button {
    max-width: 131px;
    height: 32px !important;
  }
}

.product-name {
  display: inline-block;
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 18px;
  color: #1A1919;
  cursor: pointer;
}

.product-prices {
  margin-bottom: 20px;

  .price-special {
    font-family: DIN Pro;
    font-size: 12px;
    line-height: 12px;
    text-decoration-line: line-through;
    color: #595858;
    margin-right: 4px;
  }

  .price-current {
    font-family: DIN Pro;
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    color: #1A1919;
  }
}

.product-out-of-stock {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #1A1919;
}

.product-right {
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
