<template>
  <li class="product" :class="{'out-of-stock': !inStock}">
    <div class="product-left">
      <div class="product-img" @click="closeWishlist">
        <router-link :to="productLink">
          <img :src="image.src" :alt="product.name" class="product-image">
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
<!--        <div class="actions" v-if="inStock">-->
<!--          &lt;!&ndash; <button-text class="credit">{{ $t('Buy in credit') }}</button-text> &ndash;&gt;-->
<!--          &lt;!&ndash; <button-text class="credit mobile">{{ $t('In credit') }}</button-text> &ndash;&gt;-->
<!--          <button-full-->
<!--            @click.native="addToCart(product)"-->
<!--            :product="product"-->
<!--            :showIcon="isMobile"-->
<!--            class="add-to-cart-button"-->
<!--          >-->
<!--            <span class="add-to-cart-info"> {{ $t('Buy') }} </span>-->
<!--            <svg class="add-to-cart-info mobile" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--              <path d="M21 4H2V6H4.3L7.582 15.025C7.79362 15.6029 8.1773 16.1021 8.68134 16.4552C9.18539 16.8083 9.78556 16.9985 10.401 17H19V15H10.401C9.982 15 9.604 14.735 9.461 14.342L8.973 13H18.246C19.136 13 19.926 12.402 20.169 11.549L21.962 5.275C22.0039 5.12615 22.0109 4.96962 21.9823 4.81763C21.9537 4.66565 21.8904 4.52234 21.7973 4.39889C21.7041 4.27544 21.5837 4.1752 21.4454 4.106C21.3071 4.0368 21.1546 4.00053 21 4ZM18.246 11H8.246L6.428 6H19.675L18.246 11Z" fill="white"/>-->
<!--              <path d="M10.5 21C11.3284 21 12 20.3284 12 19.5C12 18.6716 11.3284 18 10.5 18C9.67157 18 9 18.6716 9 19.5C9 20.3284 9.67157 21 10.5 21Z" fill="white"/>-->
<!--              <path d="M16.5 21C17.3284 21 18 20.3284 18 19.5C18 18.6716 17.3284 18 16.5 18C15.6716 18 15 18.6716 15 19.5C15 20.3284 15.6716 21 16.5 21Z" fill="white"/>-->
<!--            </svg>-->
<!--          </button-full>-->
<!--        </div>-->
<!--        <div class="product-out-of-stock" v-else>-->
<!--          {{ $t('Not available') }}-->
<!--        </div>-->
      </div>
    </div>
    <div class="product-right">
      <div class="product-right-data">
        <AddToCompare :product="product"> </AddToCompare>
        <button class="remove-icon p0 inline-flex middle-xs bg-cl-transparent brdr-none action h5 pointer cl-secondary" @click="removeProductFromWhishList(product)">
          <!-- <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="4" fill="white" fill-opacity="0.95"/>
            <path d="M20 13V23H12V13H20ZM18.5 7H13.5L12.5 8H9V10H23V8H19.5L18.5 7ZM22 11H10V23C10 24.1 10.9 25 12 25H20C21.1 25 22 24.1 22 23V11Z" fill="#BDBDBD"/>
          </svg> -->
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="4" fill="white" fill-opacity="0.95"/>
            <path d="M20 13V23H12V13H20ZM18.5 7H13.5L12.5 8H9V10H23V8H19.5L18.5 7ZM22 11H10V23C10 24.1 10.9 25 12 25H20C21.1 25 22 24.1 22 23V11Z" fill="#BDBDBD"/>
          </svg>

        </button>
      </div>
      <div class="product-right-data mobile">
        <more-icon class="more">
          <AddToCompare :product="product" class="more-item" showDescription />
          <button class="remove-icon p0 inline-flex middle-xs bg-cl-transparent brdr-none action h5 pointer cl-secondary" >
            <svg @click="removeProductFromWhishList(product)" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="4" fill="white" fill-opacity="0.95"/>
              <path d="M20 13V23H12V13H20ZM18.5 7H13.5L12.5 8H9V10H23V8H19.5L18.5 7ZM22 11H10V23C10 24.1 10.9 25 12 25H20C21.1 25 22 24.1 22 23V11Z" fill="#BDBDBD"/>
            </svg>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="4" fill="white" fill-opacity="0.95"/>
            </svg>
          </button>       
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
.remove-icon {
  cursor: pointer;
  
  & svg:hover {
    background-color: #F9F9F9;
  }
}
.product-left {
  display: flex;
  align-items: center;
  margin-right: 23px;

  .product-img ::v-deep {
    width: 88px;
    height: 88px;
    a {
      display: block;
    }

    .product-image__thumb, .product-image {
      max-width: 100%;
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

.product-right-data {
  display: flex;
  align-items: center;
  & > *:first-child {
    margin-right: 7px;
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
