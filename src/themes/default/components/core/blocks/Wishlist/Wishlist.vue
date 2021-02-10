<template>
  <div class="wishlist">
    <div class="option-panel">
      <i class="material-icons close-icon" @click="closeWishlist">close</i>
    </div>
    <div class="wishlist-body" v-if="productsInWishlist.length">
      <div class="wishlist-header">
        <div class="wishlist-header-main">
          <h2 class="wishlist-title">
            {{ $t('Wishlist') }}
          </h2>
          <div class="wishlist-header-info">
            <svg class="wishlist-icon" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0005 1.59511C8.91087 0.593213 7.48468 0.0371559 6.00447 0.0371094C5.22101 0.0379251 4.44544 0.193669 3.72241 0.495378C2.99937 0.797087 2.34313 1.2388 1.79147 1.79511C-0.561531 4.15811 -0.560531 7.85411 1.79347 10.2071L9.12547 17.5391C9.29547 17.8381 9.62347 18.0311 10.0005 18.0311C10.1553 18.0296 10.3076 17.9918 10.4451 17.9208C10.5827 17.8498 10.7016 17.7475 10.7925 17.6221L18.2075 10.2071C20.5615 7.85311 20.5615 4.15811 18.2055 1.79111C17.6541 1.23583 16.9984 0.795006 16.276 0.493993C15.5537 0.192979 14.779 0.037709 13.9965 0.0371094C12.5163 0.0373513 11.0902 0.593382 10.0005 1.59511ZM16.7915 3.20511C18.3545 4.77611 18.3555 7.23011 16.7935 8.79311L10.0005 15.5861L3.20747 8.79311C1.64547 7.23011 1.64647 4.77611 3.20547 3.20911C3.96547 2.45311 4.95947 2.03711 6.00447 2.03711C7.04947 2.03711 8.03947 2.45311 8.79347 3.20711L9.29347 3.70711C9.38626 3.80006 9.49646 3.87379 9.61778 3.9241C9.73909 3.97441 9.86914 4.00031 10.0005 4.00031C10.1318 4.00031 10.2618 3.97441 10.3832 3.9241C10.5045 3.87379 10.6147 3.80006 10.7075 3.70711L11.2075 3.20711C12.7195 1.69811 15.2815 1.70211 16.7915 3.20511Z" fill="#FFCA41"/>
            </svg>
          </div>
          <more-icon class="more">
            <div class="more-item" @click="clearWishlist()">
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3.5 8.9L4.9 7.5L7 9.6L9.1 7.5L10.5 8.9L8.4 11L10.5 13.1L9.1 14.5L7 12.4L4.9 14.5L3.5 13.1L5.6 11L3.5 8.9ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="#BDBDBD"/>
              </svg>
              <span>{{ $t('Remove all') }}</span>
            </div>
          </more-icon>
        </div>
        <div class="wishlist-header-secondary">
          <span class="microcart-top-total-count" v-if="productsInWishlist.length">
            {{ $tc('{count} items', productsInWishlist.length, { count: productsInWishlist.length}) }}
          </span>
          <button-text class="wishlist-clear" @click.native="clearWishlist()">{{ $t('Remove all') }}</button-text>
        </div>
      </div>

      <ul class="wishlist-list">
        <product v-for="wishlistProduct in productsInWishlist" :key="wishlistProduct.id" :product="wishlistProduct" />
      </ul>
      <div class="wishlist-footer">
        <div class="wishlist-footer-info">
          <span class="wishlist-footer-count">
            {{ $tc('{count} products worth', productsInWishlist.length) }}:
          </span>
          <span class="wishlist-footer-amount">
            {{ price | price(storeView) }}
          </span>
        </div>
        <div class="wishlist-footer-actions">
          <button-text  @click.native="addAllProductsToCart">{{ $t('Add all products to cart') }}</button-text>
          <button-full
            @click.native="createOrder()"
            :aria-label="$t('Go to checkout')"
          >
            {{ $t('Go to checkout') }}
          </button-full>
        </div>
      </div>
    </div>

    <div class="wishlist-empty" v-else>
      <div class="wishlist-empty-top">
        <h4 class="wishlist-title">
          {{ $t('Your wishlist is empty.') }}
        </h4>
        <svg width="20" height="19" viewBox="0 0 20 19" fill="#FFCA41" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.0005 1.59511C8.91087 0.593213 7.48468 0.0371559 6.00447 0.0371094C5.22101 0.0379251 4.44544 0.193669 3.72241 0.495378C2.99937 0.797087 2.34313 1.2388 1.79147 1.79511C-0.561531 4.15811 -0.560531 7.85411 1.79347 10.2071L9.12547 17.5391C9.29547 17.8381 9.62347 18.0311 10.0005 18.0311C10.1553 18.0296 10.3076 17.9918 10.4451 17.9208C10.5827 17.8498 10.7016 17.7475 10.7925 17.6221L18.2075 10.2071C20.5615 7.85311 20.5615 4.15811 18.2055 1.79111C17.6541 1.23583 16.9984 0.795006 16.276 0.493993C15.5537 0.192979 14.779 0.037709 13.9965 0.0371094C12.5163 0.0373513 11.0902 0.593382 10.0005 1.59511ZM16.7915 3.20511C18.3545 4.77611 18.3555 7.23011 16.7935 8.79311L10.0005 15.5861L3.20747 8.79311C1.64547 7.23011 1.64647 4.77611 3.20547 3.20911C3.96547 2.45311 4.95947 2.03711 6.00447 2.03711C7.04947 2.03711 8.03947 2.45311 8.79347 3.20711L9.29347 3.70711C9.38626 3.80006 9.49646 3.87379 9.61778 3.9241C9.73909 3.97441 9.86914 4.00031 10.0005 4.00031C10.1318 4.00031 10.2618 3.97441 10.3832 3.9241C10.5045 3.87379 10.6147 3.80006 10.7075 3.70711L11.2075 3.20711C12.7195 1.69811 15.2815 1.70211 16.7915 3.20511Z" />
        </svg>
      </div>
      <span class="wishlist-empty-description">{{ $t('Add items to wishlist!') }}</span>
    </div>
  </div>
</template>

<script>
import Wishlist from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Wishlist';
import Product from 'theme/components/core/blocks/Wishlist/Product';
import ClearWishlistButton from 'theme/components/core/blocks/Wishlist/ClearWishlistButton';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import ButtonFull from 'theme/components/theme/ButtonFull';
import ButtonText from 'theme/components/theme/ButtonText';
import { notifications } from '@vue-storefront/core/modules/cart/helpers';
import MoreIcon from 'theme/components/core/MoreIcon';
import { mapGetters } from 'vuex';

export default {
  mixins: [Wishlist],
  components: {
    Product,
    ClearWishlistButton,
    ButtonFull,
    ButtonText,
    MoreIcon
  },
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  computed: {
    ...mapGetters({
      totals: 'cart/getTotals'
    }),
    storeView () {
      return currentStoreView()
    },
    price () {
      return this.totals.find(it => it.code === 'grand_total').value
    }
  },
  methods: {
    async addAllProductsToCart() {
      this.closeWishlist();
      try {
        const productsToAdd = this.productsInWishlist.filter(it => !!it.stock.is_in_stock)
        await this.$store.dispatch('cart/addItems', { productsToAdd })
      } catch (message) {
        this.notifyUser(notifications.createNotification({ type: 'error', message }))
      }
    },
    notifyUser (notificationData) {
      this.$store.dispatch('notification/spawnNotification', notificationData, { root: true })
    },
    closeWishlist () {
      this.$store.commit('ui/setWishlist', false)
    },
    async createOrder () {
      this.closeWishlist();
      await this.addAllProductsToCart()
      this.$router.push('/checkout')
    },
    clearWishlist () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Are you sure you would like to remove all the items from the wishlist?'),
        action1: { label: this.$t('OK'),
          action: () => {
            this.$store.dispatch('wishlist/clear')
          }
        },
        action2: { label: this.$t('Cancel'), action: 'close' },
        hasNoTimeout: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.wishlist {
  height: 100%;
}

.wishlist-header {
  flex-direction: column;
  .more {
    display: none;
  }
}

.option-panel {
  text-align: right;

  .close-icon {
    color: #bdbdbd;
    cursor: pointer;
    background: #F9F9F9;
    padding: 13px;
    transition: .2s ease-in-out;

    &:hover {
      color: #3d3d3d;
    }
  }
}

.wishlist-body {
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
}

.wishlist-header {
  display: flex;
  padding: 0 32px;
  margin-bottom: 24px;
  flex-direction: column;
}

.wishlist-title {
  margin: 0 16px 0 0;
  font-family: DIN Pro;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
}

.wishlist-header-main {
  display: flex;
}
.wishlist-header-info {
  display: flex;
  align-items: center;

  .wishlist-icon {
    margin-right: 8px;
  }

  .wishlist-counter {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: DIN Pro;
    font-size: 12px;
    line-height: 13px;
    border-radius: 50%;
    background: #23be20;
    padding: 0 2px;
    font-weight: 600;
    min-width: 24px;
    min-height: 24px;
    color: #fff;
  }
}

.wishlist-list {
  padding: 0 32px 0 32px;
  margin: 0;
  overflow-y: auto;
  height: 100%;
  list-style-type: none;
}

.wishlist-clear {
  margin-left: auto;
}

.wishlist-footer {
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25);
  padding: 32px;
  margin-top: auto;
}

.wishlist-footer-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .wishlist-footer-count {
    font-family: DIN Pro;
    font-size: 14px;
    line-height: 16px;
    color: #595858;
  }

  .wishlist-footer-amount {
    font-family: DIN Pro;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: #1A1919;
  }
}

.wishlist-header-secondary {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-top: 32px;
}

.wishlist-footer-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .button-text ::v-deep {
    max-width: 205px;
    width: 100%;

    span {
      font-size: 14px;
      font-weight: 600;
      line-height: 15px;
    }
  }

  .button-full {
    max-width: 233px;
  }
}

.wishlist-empty {
  padding: 0 32px;
}

.wishlist-empty-description {
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 24px;
  color: #1A1919;
}

.wishlist-empty-top {
  display: flex;
  align-items: center;
  margin: 9px 0 25px 0;

  .wishlist-title {
    margin: 0 16px 0 0;
  }

  svg {
    fill: #23BE20;
  }
}

@media (max-width: 520px) {
  .wishlist-footer {
    padding: 16px;
  }
  .wishlist-footer-actions {
    flex-direction: column-reverse;

    .button-full {
      max-width: 100%;
      margin-bottom: 16px;
    }
  }

  ::v-deep .product-right-compare .add-to-compare {
    display: none;
  }

  ::v-deep .product-right {
    .more {
      .add-to-compare {
        width: 100%;
        padding: 8px 16px;
      }
    }

    .product-right-data {
      display: none;
      &.mobile {
        display: block;
      }
    }
  }

  ::v-deep .actions {
    .credit {
      display: none;

      &.mobile {
        display: block;
      }
    }

    .add-to-cart-info {
      display: none;

      &.mobile {
        display: block;
      }
    }

    .add-to-cart-button {
      max-width: 38px;
    }
  }

  .wishlist-list {
    padding: 0 16px;
  }

  .wishlist-header {
    margin-bottom: 16px;
    padding: 9px 16px;
    display: flex;
    .more {
      margin-left: auto;

      .more-item {
        padding: 8px 16px;
        display: flex;
        align-items: center;

        svg {
          margin-right: 20px;
        }
      }
    }

  }

  .wishlist-title {
    font-size: 24px;
  }

  .wishlist-empty {
    padding: 0 16px;
  }
}
</style>
