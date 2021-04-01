<template>
  <li class="product" :class="{'out-of-stock': !inStock}">
    <div class="product-left">
      <div class="product-img" @click="closeWishlist">
        <router-link :to="productLink">
          <img v-lazy="image.src" :alt="product.name" class="product-image">
        </router-link>
      </div>
    </div>
    <div class="product-right">
      <div class="product-top">
        <router-link
          @click.native="closeWishlist()"
          :to="productLink"
          class="product-name"
        >
          {{ product.name | htmlDecode }}
        </router-link>
        <div class="additional-actions">
          <div class="additional-actions-container">
            <AddToCompare :product="product"> </AddToCompare>
            <button class="remove-icon p0 inline-flex middle-xs bg-cl-transparent brdr-none action h5 pointer cl-secondary" @click="removeProductFromWhishList(product)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z" fill="#BDBDBD"/>
              </svg>
            </button>
          </div>
          <div class="additional-actions mobile">
            <more-icon class="more">
              <AddToCompare :product="product" class="more-item" showDescription />
              <button @click="removeProductFromWhishList(product)" class="more-item remove-icon remove-icon-mobile inline-flex middle-xs bg-cl-transparent brdr-none action h5 pointer cl-secondary" >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="4" fill-opacity="0.95"/>
                  <path d="M20 13V23H12V13H20ZM18.5 7H13.5L12.5 8H9V10H23V8H19.5L18.5 7ZM22 11H10V23C10 24.1 10.9 25 12 25H20C21.1 25 22 24.1 22 23V11Z" fill="#BDBDBD"/>
                </svg>
                <span class="remove-from-wishlist-text">{{ $t('Remove from wishlist') }}</span>
              </button>
            </more-icon>
          </div>
        </div>
      </div>
      <div class="product-bottom" :class="{'unavailable': isNotAvailable}">
        <product-cart-price :product="product" :nameVisibility="false" class="product-prices" />
        <div class="product-actions" >
          <product-cart-controls @click.native="closeWishlist" :product="product" class="cart-wishlist" />
        </div>
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
    },
    isNotAvailable () {
      return !this.product.stock.is_in_stock && !this.product.preorder
    }
  },
  methods: {
    removeProductFromWhishList (product) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: this.$t('Remove {productName} from wishlist', { productName: htmlDecode(product.name) }),
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
  padding: 16px 12px 16px 16px;

  @media only screen and (max-width: 500px) {
    padding: 10px;
  }
  display: flex;
  align-items: flex-start;
  border: 1px solid #E0E0E0;
  margin-bottom: 20px;
  border-radius: 4px;

  &.out-of-stock {
    .product-name {
      color: #989797;
    }

    ::v-deep {
      .price-current, .price-special {
        color: #989797;
      }
    }

    .product-image {
      filter: opacity(0.5);
    }
  }

}
.more-item {
  cursor: pointer;
  .item {
    padding: 4px;
  }

  svg {
    display: flex;
  }

  &:hover {
    background-color: #F9F9F9;
  }
}

.product-right {
  width: 100%;
}

.product-bottom {
  display: flex;
  align-items: baseline;
  width: 100%;
}

.product-top {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

.product-actions {
  width: 100%;
}

.remove-icon-mobile {
  width: 100%;
  padding: 4px 16px;
}

.product-img {
  display: flex;
  justify-content: center;
  width: 88px;
  height: 88px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    z-index: -1;
    max-width: 88px;
    max-height: 88px;
  }
}

.product-left {
  display: flex;
  align-items: center;
  margin-right: 16px;
  @media only screen and (max-width: 520px) {
    margin-right: 12px;
  }

  .product-img ::v-deep {

    @media only screen and (max-width: 520px) {
      width: 56px;
      height: 56px;

      img {
        max-width: 56px;
        max-height: 56px;
      }
    }
  }
}

.product-middle {
  margin-right: 12px;
  width: 100%;
}

.additional-actions {
  margin-left: auto;

  .additional-actions-container {
    @media only screen and (max-width: 500px) {
      display: none;
    }
  }

  .more {
    display: none;

    @media only screen and (max-width: 500px) {
      display: block;
    }
  }
}

.additional-actions-container {
  display: flex;
  align-items: center;

  .remove-icon {
    svg {
      padding: 4px;
      box-sizing: content-box;

      &:hover {
        background-color: #F9F9F9;
      }
    }
  }

  & > *:first-child {
    margin-right: 6px;

    @media only screen and (max-width: 520px) {
      margin-right: 0;
    }
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
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 18px;
  color: #1A1919;
  cursor: pointer;
  margin-right: 20px;

  @media only screen and (max-width: 520px) {
    font-size: 13px;
    line-height: 16px;
  }
}

.product-prices {
  ::v-deep {
    .product-price-wrapper {
      white-space: nowrap;
      flex-direction: column-reverse;
      align-items: flex-end;
    }

    .main-price {
      margin-top: 0;
    }

    .price-sale {
      margin: 0;
    }

    .price-special {
      line-height: 20px;
    }
  }
}

.product-out-of-stock {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #1A1919;
}

.additional-actions {
  .more {
    margin-left: auto;
    .more-item {
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
.remove-from-wishlist-text {
  display: inline-block;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 24px;
  color: #595858;
}

@media (max-width: 520px) {
  .product-bottom.unavailable {
    flex-direction: column;

  }
  ::v-deep {
    .button-full.not-available {
      margin-left: 0;
    }
  }
}

</style>
