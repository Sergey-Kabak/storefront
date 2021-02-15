<template>
  <div class="product">
    <div class="product-image">
      <img :src="image.src" alt="product" />
    </div>
    <div class="product-info-top">
      <span class="product-name">{{ product.name }}</span>
    </div>
    <div class="product-info-bottom">
      <div class="product-qty">
        <product-quantity-new
          v-model.number="product.qty"
          @input="udpateQty($event)"
          :show-quantity="manageQuantity"
          :check-max-quantity="manageQuantity"
          :loading="isQtyUpdating"
        />
      </div>
      <product-cart-price :product="product" :nameVisibility="false"/>
    </div>
    <div class="product-actions">
      <div class="actions">
        <AddToWishlist :product="product" class="product-icon" />
        <div class="remove" @click="removeFromCart()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z" fill="#BDBDBD"/>
          </svg>
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
  </div>
</template>

<script>
import ProductQuantityNew from 'theme/components/core/ProductQuantityNew.vue';
import { onlineHelper } from '@vue-storefront/core/helpers';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { Product } from '@vue-storefront/core/modules/checkout/components/Product';
import i18n from '@vue-storefront/i18n';
import MoreIcon from 'theme/components/core/MoreIcon';
import ProductCartPrice from "../Product/ProductCartPrice";
import GTM from 'theme/mixins/GTM/dataLayer'
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist';

export default {
  mixins: [Product, ProductCartPrice, GTM],
  components: {
    ProductQuantityNew,
    MoreIcon,
    ProductCartPrice,
    AddToWishlist
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
    finalPrice () {
      if (this.isBundleProduct) {
        return this.isDiscount ? this.bundleFinalPrice : this.bundlePrice
      }
      return this.product.special_price || this.product.original_price_incl_tax
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      };
    },
    isOnline (value) {
      return onlineHelper.isOnline
    },
    storeView () {
      return currentStoreView();
    }
  },
  methods: {
    async removeFromCart () {
      try {
        await this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t('Are you sure you would like to remove this item from the shopping cart?'),
          action1: { label: i18n.t('Cancel'), action: 'close' },
          action2: { label: i18n.t('OK'),
            action: async () => {
              this.$store.dispatch('cart/removeItem', { product: this.product })
              await this.GTM_REMOVE_FROM_CART([this.product])
            }
          },
          hasNoTimeout: true
        })
      } catch (e) {
        console.log(e);
      }
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
  padding: 16px 12px 16px 16px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  grid-row-gap: 16px;
  grid-template-areas:
    "image top-info actions"
    "image bottom-info actions";
  align-items: flex-start;
  padding-bottom: 16px;
  // margin-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.more {
  display: none;
}

.product-right {
  margin-left: auto;
  max-width: 205px;
  width: 100%;
}

.price-sale {
  margin-top: 4px;
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
  grid-area: image;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 88px;
  font-family: DIN Pro;
  font-style: normal;
  margin-right: 14px;

  img {
    display: block;
    max-width: 100%;
    // max-height: 100%;
    width: auto;
    height: auto;
  }
}

.product-price {
  width: 100%;
  font-family: DIN Pro;
  font-style: normal;
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  color: #1A1919;
}

.product-qty {
  margin-right: 12px;
}

img {
  width: 100%;
}

.original-price {
  &.disabled {
    text-decoration: line-through;
    color: #595858;
  }
}

.price-special {
  color: #1A1919;
}

.product-name {
  display: block;
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 18px;
  color: #1A1919;

  @media only screen and (max-width: 520px) {
    font-size: 13px;
    line-height: 15px;
  }
}

.product-data {
  display: flex;
  margin-left: 18px;
  flex: 1;
}
.product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
}

.product-info-top {
  align-items: flex-start;
  grid-area: top-info;
  padding-right: 20px;
}

.product-info-bottom {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  grid-area: bottom-info;
  margin-top: auto;
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
    color: #595858;
  }
}

.actions {
  grid-area: actions;
  display: flex;
  align-items: center;
  align-self: flex-start;
  align-self: flex-start;
}

.remove {
  display: flex;
  cursor: pointer;

  svg {
    box-sizing: content-box;
  }

  &:hover {
    background-color: #F9F9F9;
  }
}
@media only screen and (max-width: 520px) {
  .product-image {
    width: 56px;
    height: 56px;
  }
}
@media (max-width: 768px) {
  .product {
    grid-template-areas:
      "image top-info actions"
      "bottom-info bottom-info bottom-info";
  }

  .product-info-bottom {
    justify-content: space-between;
    align-items: flex-end;
  }

  .product-info-top {
    padding-right: 12px;
  }

  .actions {
    display: none;
  }

  .more {
    display: block;
  }
}

</style>
