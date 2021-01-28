<template>
  <li class="product" :class="{'out-of-stock': !inStock}">
    <div class="product-left">
      <div class="remove-icon" @click="removeProductFromWhishList(product)">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3.5 8.9L4.9 7.5L7 9.6L9.1 7.5L10.5 8.9L8.4 11L10.5 13.1L9.1 14.5L7 12.4L4.9 14.5L3.5 13.1L5.6 11L3.5 8.9ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="#BDBDBD"/>
        </svg>
      </div>
      <div class="product-img" @click="closeWishlist">
        <router-link :to="productLink">
          <img v-lazy="image.src" :alt="product.name" class="product-image">
        </router-link>
      </div>
    </div>
    <div class="product-middle">
      <router-link
        @click.native="closeWishlist()"
        :to="productLink"
        class="product-name"
      >
        {{ product.name | htmlDecode }}
      </router-link>

      <product-cart-price :product="product" :nameVisibility="false" class="product-prices" />

      <div class="product-actions" >
        <product-cart-controls :product="product" class="cart-wishlist" />
      </div>
    </div>
    <div class="product-right">
      <div class="product-right-data">
        <AddToCompare :product="product"> </AddToCompare>
      </div>
      <div class="product-right-data mobile">
        <more-icon class="more">
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
import RemoveButton from './RemoveButton';
import i18n from '@vue-storefront/i18n';
import { htmlDecode } from '@vue-storefront/core/lib/store/filters';
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare';
import mobileResolution from 'theme/mixins/mobileResolution'
import ButtonText from 'theme/components/theme/ButtonText';
import ButtonFull from 'theme/components/theme/ButtonFull';
import MoreIcon from 'theme/components/core/MoreIcon';
import ProductCartControls from '../Product/ProductCartControls';
import ProductCartPrice from "../Product/ProductCartPrice";
export default {
  components: {
    RemoveButton,
    ProductImage,
    AddToCompare,
    ButtonText,
    ButtonFull,
    MoreIcon,
    ProductCartControls,
    ProductCartPrice
  },
  mixins: [Product , mobileResolution],
  props: {
    showAddToCart: {
      type: Boolean,
      default: true
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
    removeProductFromWhishList (product) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: this.$t('Remove {productName} from wishlist?', { productName: htmlDecode(product.name) }),
        action1: { label: this.$t('OK'), action: () => {
          this.removeFromWishlist(product)
        }},
        action2: { label: this.$t('Cancel') },
        hasNoTimeout: true
      }, { root: true })
    },
    async addToCart (product) {
      try {
        const diffLog = await this.$store.dispatch('cart/addItem', { productToAdd: product })
        diffLog.clientNotifications.forEach(notificationData => {
          this.notifyUser(notificationData)
        })
      } catch (message) {
        this.notifyUser(notifications.createNotification({ type: 'error', message }))
      }
    },
    notifyUser (notificationData) {
      this.$store.dispatch('notification/spawnNotification', notificationData, { root: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  padding: 16px 0;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #e0e0e0;

  &.out-of-stock {
    .product-name, .price-current {
      color: #989797;
    }

    .product-image {
      filter: opacity(0.5);
    }
  }

  &:first-child {
    padding-top: 0;
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

.product-right {
  margin-left: auto;

  .more {
    display: none;
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
      padding: 8px 16px;
      display: flex;
      align-items: center;

      &.compare {
        padding: 0;
      }

      svg {
        margin-right: 20px;
      }
    }
  }
}

.add-to-cart-info {
  &.mobile {
    display: none;
  }
}

</style>
