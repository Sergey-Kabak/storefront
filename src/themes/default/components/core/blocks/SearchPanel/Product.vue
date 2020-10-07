<template>
  <li class="product" :class="{'out-of-stock': !inStock}">
    <div class="product-left">
      <div class="product-img">
        <router-link @click.native="closeSearchPanel()" :to="productLink">
          <img :src="image.src" :alt="product.name" class="product-image">
        </router-link>
      </div>
    </div>
    <div class="product-middle" >
      <router-link
        @click.native="closeSearchPanel()"
        :to="productLink"
        class="product-name"
      >
        {{ product.name | htmlDecode }}
      </router-link>

      <div class="product-prices">
        <span 
          v-if="product.original_price_incl_tax"
          class="price price-current"
        >
          {{ product.original_price_incl_tax | price(storeView) }}
        </span>
        <span
          v-if="product.special_price"
          class="price price-special"
        >
          {{ product.special_price | price(storeView) }}
        </span>
      </div>
      <div class="product-actions">
        <div class="actions" v-if="inStock && isShowButtons">
          <AddToCart :product="product" />
        </div>
        <div class="product-out-of-stock" v-if="!inStock">
          {{ $t('Not available') }}
        </div>
      </div>
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
  </li>
</template>

<script>

import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import { notifications } from '@vue-storefront/core/modules/cart/helpers';
import ProductImage from 'theme/components/core/ProductImage';
import i18n from '@vue-storefront/i18n';
import { htmlDecode } from '@vue-storefront/core/lib/store/filters';
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare';
import ButtonText from 'theme/components/theme/ButtonText';
import ButtonFull from 'theme/components/theme/ButtonFull';
import MoreIcon from 'theme/components/core/MoreIcon';
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist';
import AddToCart from 'theme/components/core/AddToCart';

export default {
  props: {
    isShowButtons: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  mixins: [Product],
  components: {
    ProductImage,
    AddToCompare,
    ButtonText,
    ButtonFull,
    MoreIcon,
    AddToWishlist,
    AddToCart
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
    closeSearchPanel (){
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setMicrocart', false)
      this.$store.commit('ui/setSearchpanel', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  align-items: flex-start;

  &.out-of-stock {
    .product-name, .price-current {
      color: #989797;
    }

    .product-image {
      filter: opacity(0.5);
    }
  }
}

.product-left {
  display: flex;
  align-items: center;
  margin-right: 12px;

  .remove-icon {
    cursor: pointer;
    margin-right: 12px;
  }

  .product-img ::v-deep {
    a {
      display: block;
    }

    .product-image__thumb, .product-image {
      max-width: 50px;
      max-height: 50px;
    }
  }
}

.product-middle {
  margin-right: 12px;
  width: 100%;
}

.product-right-data {
  display: flex;
  align-items: center;
  margin-left: auto;

  &.mobile {
    display: none;
  }

  .add-to-compare {
    margin-right: 16px;
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
    height: 32px;
  }
}

.product-name {
  display: inline-block;
  margin-bottom: 8px;
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
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
    color: #5F5E5E;
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
      padding: 8px 16px;
    }
  }
}

.add-to-cart-info {
  &.mobile {
    display: none;
  }
}

</style>
