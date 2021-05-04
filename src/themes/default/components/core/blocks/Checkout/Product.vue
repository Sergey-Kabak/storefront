<template>
  <div class="product-wrap" :data-productKey="product.id">
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
            :class="{ 'overlay-below': productNotAvailable }"
            v-model.number="product.qty"
            @input="updateQty($event)"
            :show-quantity="manageQuantity"
            :check-max-quantity="manageQuantity"
            :loading="isQtyUpdating"
            :plusDisabled="plusDisabled"
          />
        </div>
        <product-cart-price :calculateWithPromo="false" :product="product" :nameVisibility="false">
          <template v-if="product.price_decreased" v-slot:price-decrease>
            <div class="product-price-changed-block ml15">
              <div class="product-price-changed-icon">
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.2 9L13.032 7.2825L9.128 3.6225L5.928 6.6225L0 1.0575L1.128 0L5.928 4.5L9.128 1.5L14.168 6.2175L16 4.5V9H11.2Z"
                    fill="#EE2C39"/>
                </svg>
              </div>
              <div class="product-price-changed-text">{{ $t('price decreased') }}</div>
            </div>
          </template>
        </product-cart-price>
      </div>
      <div class="product-actions">
        <div class="actions">
          <AddToWishlist :product="product" class="product-icon" />
          <div class="remove product-icon" @click="removeFromCart()">
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
    <div class="product__message" v-if="productNotAvailable || outOfQuantity">
      <svg class="product__message-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99935 1.66675C5.39935 1.66675 1.66602 5.40008 1.66602 10.0001C1.66602 14.6001 5.39935 18.3334 9.99935 18.3334C14.5993 18.3334 18.3327 14.6001 18.3327 10.0001C18.3327 5.40008 14.5993 1.66675 9.99935 1.66675ZM10.8327 14.1667H9.16602V12.5001H10.8327V14.1667ZM10.8327 10.8334H9.16602V5.83342H10.8327V10.8334Z" fill="#EE2C39"/>
      </svg>
      <div class="product__message-text" v-if="productNotAvailable && !outOfQuantity">{{ $t('item out of stock') }}</div>
      <div class="product__message-text" v-else-if="outOfQuantity">{{ $t('item not available decreate quantity') }}</div>
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
import ProductCartPrice from '../Product/ProductCartPrice';
import GTM from 'theme/mixins/GTM/dataLayer'
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import { ProductStock } from 'theme/helpers';

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
    productNotAvailable () {
      return !['InStock', 'PendingDelivery'].includes(ProductStock(this.product));
    },
    outOfQuantity () {
      return this.product.qty > this.product.msi_salable_quantity
    },
    plusDisabled () {
      return this.product.qty >= this.product.msi_salable_quantity
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
              await this.$store.dispatch('cart/removeItem', { product: this.product })
              await this.GTM_REMOVE_FROM_CART([this.product])
            }
          },
          hasNoTimeout: true
        })
      } catch (e) {
        console.log(e);
      }
    },
    async updateQty (qty) {
      this.isQtyUpdating = true
      await this.$store.dispatch('cart/updateProductQuantity', { product: this.product, qty })
      this.isQtyUpdating = false
    }
  }
};
</script>

<style lang="scss" scoped>
.product-wrap {
  margin-bottom: 16px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
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
  &__message {
    width: 100%;
    background: #FDE6E7;
    border-radius: 4px;
    margin-top: 16px;
    display: flex;
    align-items: center;
    padding: 9px;
  }
  &__message-text {
    font-size: 13px;
    line-height: 20px;
  }
  &__message-icon {
    margin-right: 13px;
    flex: 0 0 20px;
  }
  &__top {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    grid-row-gap: 16px;
    grid-template-areas:
      "image top-info actions"
      "image bottom-info actions";
  }
  &__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.55);
  }
}
.overlay-below {
  z-index: -1;
}
.overlay-ontop {
  z-index: 1;
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
  padding: 4px 16px;

  svg {
    padding: 4px;
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

.product-icon {
  margin-right: 6px;

  &:last-child {
    margin-right: 0;
  }
}

.remove {
  display: flex;
  cursor: pointer;

  svg {
    padding: 4px;
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
