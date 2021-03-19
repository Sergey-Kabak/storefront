<template>
  <div class="product-wrap" :data-productKey="product.sku">
    <div class="product">
      <router-link :to="productLink" class="product-image">
        <img :src="image.src" alt="product" />
      </router-link>
      <router-link :to="productLink" class="product-info-top">
        <span class="product-name">{{ product.name }}</span>
      </router-link>
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
        <product-cart-price :calculateWithPromo="false" :product="product" :nameVisibility="false"/>
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
          <div class="more-item">
            <AddToWishlist :product="product" showDescription />
          </div>
          <div class="more-item" @click="removeFromCart()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z" fill="#BDBDBD"/>
            </svg>
            <span>{{ $t('Remove') }}</span>
          </div>
        </more-icon>
      </div>
    </div>
    <microcart-product-bundle-options v-if="product.bundle_options" :product="product" class="product-bundle-options" />
  </div>
</template>

<script>
import MicrocartProductBundleOptions from 'theme/components/core/blocks/Microcart/MicrocartProductBundleOptions.vue';
import ProductQuantityNew from 'theme/components/core/ProductQuantityNew.vue';
import { onlineHelper } from '@vue-storefront/core/helpers';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { Product } from '@vue-storefront/core/modules/checkout/components/Product';
import i18n from '@vue-storefront/i18n';
import MoreIcon from 'theme/components/core/MoreIcon';
import ProductCartPrice from "../Product/ProductCartPrice";
import GTM from 'theme/mixins/GTM/dataLayer'
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';

export default {
  mixins: [Product, ProductCartPrice, GTM],
  components: {
    ProductQuantityNew,
    MoreIcon,
    ProductCartPrice,
    AddToWishlist,
    MicrocartProductBundleOptions
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
    },
    productLink() {
      return formatProductLink(this.product, currentStoreView().storeCode)
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
.product-wrap {
  margin-bottom: 16px;
  border: 1px solid #E0E0E0;
}

.product {
  padding: 15px 12px 15px 15px;
  display: grid;
  grid-row-gap: 8px;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "image top-info actions"
    "image bottom-info actions";
  align-items: flex-start;
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
  margin-right: 16px;

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
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
  margin-right: 8px;
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
  margin-bottom: 5px;
}

.product-info-bottom {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  grid-area: bottom-info;
}

.more-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;

  svg {
    box-sizing: content-box;
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

.product-bundle-options ::v-deep {
  .bundle-option {
    .options {
      .option {
        padding-bottom: 15px;
      }
    }

    &:last-child {
      .options {
        padding: 16px;

        .option {
          border-bottom: none;
          padding-bottom: 0;
        }
      }
    }

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

  .product-image {
    width: 56px;
    height: 56px;
  }
}

</style>
