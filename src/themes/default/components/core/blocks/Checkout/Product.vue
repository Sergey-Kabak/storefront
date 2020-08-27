<template>
  <div class="product">
    <div class="product-left">
      <div class="product-remove" @click="removeFromCart()">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3.5 8.9L4.9 7.5L7 9.6L9.1 7.5L10.5 8.9L8.4 11L10.5 13.1L9.1 14.5L7 12.4L4.9 14.5L3.5 13.1L5.6 11L3.5 8.9ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="#BDBDBD"/>
        </svg>
      </div>
      <div class="product-image">
        <img :src="image.src" alt="product" />
      </div>
      <div class="product-info">
        <div class="product-info-name">
          {{ product.name | htmlDecode }}
        </div>
        <div class="product-info-price">
          <span
            class="mr5 original-price"
            :class="{'disabled': product.original_special_price}"
          >
            {{ product.original_price_incl_tax | price(storeView) }}
          </span>
          <span
            class="price-special cl-accent weight-700"
            v-if="product.original_special_price"
          >
            {{ product.original_special_price | price(storeView) }}
          </span>
          <span
            v-if="product.original_price_incl_tax && product.original_special_price"
            class="lh30 cl-secondary price-sale"
          >
            -{{ (product.original_price_incl_tax - product.original_special_price) | price(storeView) }}
          </span>
        </div>
      </div>
      <more-icon>
        <div class="more-item" @click="removeFromCart()">
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3.5 8.9L4.9 7.5L7 9.6L9.1 7.5L10.5 8.9L8.4 11L10.5 13.1L9.1 14.5L7 12.4L4.9 14.5L3.5 13.1L5.6 11L3.5 8.9ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="#BDBDBD"/>
          </svg>
          <span>{{ $t('Remove') }}</span>
        </div>
      </more-icon>
    </div>
    <div class="product-right">
      <div class="product-qty" v-if="product.type_id !== 'grouped' && product.type_id !== 'bundle'">
        <product-quantity-new
          v-model.number="product.qty"
          @input="udpateQty($event)"
          :is-simple-or-configurable="isSimpleOrConfigurable"
          :show-quantity="manageQuantity"
          :check-max-quantity="manageQuantity"
          :loading="isQtyUpdating"
        />
      </div>
      <div class="product-price">
        <span> {{ product.price * product.qty | price(storeView) }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import ProductQuantityNew from 'theme/components/core/ProductQuantityNew.vue';
import { onlineHelper } from '@vue-storefront/core/helpers';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { Product } from '@vue-storefront/core/modules/checkout/components/Product';
import i18n from '@vue-storefront/i18n';
import MoreIcon from 'theme/components/core/MoreIcon';

export default {
  mixins: [Product],
  components: {
    ProductQuantityNew,
    MoreIcon
  },
  data: () => ({
    maxQuantity: 0,
    detailsOpen: false,
    quantityError: false,
    isStockInfoLoading: false,
    isQtyUpdating: false,
    hasAttributesLoaded: false,
    manageQuantity: true
  }),
  computed: {
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      };
    },
    isSimpleOrConfigurable () {
      return ['simple', 'configurable'].includes(this.product.type_id)
    },
    isOnline (value) {
      return onlineHelper.isOnline
    },
    storeView () {
      return currentStoreView();
    }
  },
  methods: {
    removeFromCart () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: i18n.t('Are you sure you would like to remove this item from the shopping cart?'),
        action1: { label: i18n.t('Cancel'), action: 'close' },
        action2: { label: i18n.t('OK'),
          action: async () => {
            this.$store.dispatch('cart/removeItem', { product: this.product })
          }
        },
        hasNoTimeout: true
      })
    },
    async udpateQty (qty) {
      this.isQtyUpdating = true
      await this.$store.dispatch('cart/updateQuantity', { product: this.product, qty })
      this.isQtyUpdating = false
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.product-left,
.product-right {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.product-right {
  margin-left: auto;
  max-width: 205px;
  width: 100%;
}

.more {
  display: none;
  margin-left: auto;
}

.price-sale {
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  line-height: 16px;
  text-transform: uppercase;
  color: #FFFFFF;
  background: #EE2C39;
  border-radius: 30px;
  padding: 1px 7px;
  margin-left: 10px;
}

.product-remove {
  margin-right: 12px;
  cursor: pointer;

  svg {
    width: 14px;
    height: 18px;
  }
}

.product-image {
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-family: DIN Pro;
  font-style: normal;

  img {
    max-width: 50px;
    max-height: 50px;
    width: auto;
    height: auto;
  }
}

.product-info {
  margin-right: 20px;
  max-width: 280px;
}

.product-info-name {
  font-family: DIN Pro;
  font-style: normal;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
  margin-bottom: 4px;
}

.product-info-price {
  font-family: DIN Pro;
  font-style: normal;
  font-size: 15px;
  font-weight: 600;
  line-height: 16px;
  color: #1a1919;
}

.product-price {
  width: 100%;
  font-family: DIN Pro;
  font-style: normal;
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  color: #1A1919;
  text-align: right;
}

.product-qty {
  margin-right: 20px;
  margin-left: auto;
}

img {
  width: 100%;
}

.original-price {
  &.disabled {
    text-decoration: line-through;
    color: #5F5E5E;
  }
}

.price-special {
  color: #1A1919;
}

.product-name {
  font-family: "DIN Pro";
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
  margin-bottom: 2px;
}

.product-data {
  display: flex;
  margin-left: 18px;
  flex: 1;
}
.product-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.product-price-container {
  display: flex;
  align-items: center;
  min-width: 75px;
}

.total-price {
  font-family: "DIN Pro";
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  text-align: right;
  color: #1A1919;
}

.more-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  
  svg {
    margin-right: 20px;
  }

  span {
    font-family: DIN Pro;
    font-style: normal;
    font-size: 14px;
    line-height: 24px;
    color: #5F5E5E;
  }
}
</style>
<style>
  .checkout-product-quantity {
    padding: 0 20px;
  }
</style>
