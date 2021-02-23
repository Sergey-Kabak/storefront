<template>
  <div id="checkout">
    <div class="v-container">
      <checkout-title />
      <div class="checkout">
        <div class="checkout-sections">
          <cart-summary-mobile class="checkout-item cart-summary-mobile"/>
          <personal-details class="checkout-item"/>
          <shipping class="checkout-item"/>
          <payment class="checkout-item"/>
        </div>
        <div class="order">
          <cart-summary class="checkout-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Checkout from '@vue-storefront/core/pages/Checkout';
import PersonalDetails from 'theme/components/core/blocks/Checkout/PersonalDetails/PersonalDetails';
import Shipping from 'theme/components/core/blocks/Checkout/Shipping/Shipping';
import Payment from 'theme/components/core/blocks/Checkout/Payment/Payment';
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary';
import CartSummaryMobile from 'theme/components/core/blocks/Checkout/CartSummaryMobile';
import CheckoutTitle from 'theme/components/core/blocks/Checkout/CheckoutTitle';
import { registerModule } from '@vue-storefront/core/lib/modules';
import { OrderModule } from '@vue-storefront/core/modules/order';
import { syncCartWhenLocalStorageChange } from '@vue-storefront/core/modules/cart/helpers';

export default {
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    CartSummary,
    CheckoutTitle,
    CartSummaryMobile
  },
  mixins: [Checkout],
  beforeCreate () {
    registerModule(OrderModule)
  },
  methods: {
    notifyEmptyCart () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Shopping cart is empty. Please add some products before entering Checkout'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyOutStock (chp) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: chp.name + this.$t(' is out of stock!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyNotAvailable () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('Some of the ordered products are not available!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyStockCheck () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Stock check in progress, please wait while available stock quantities are checked'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyNoConnection () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('There is no Internet connection. You can still place your order. We will notify you if any of ordered products is not available because we cannot check it right now.'),
        action1: { label: this.$t('OK') }
      })
    }
  },
  mounted () {
    this.$store.state.ui.microcart = false
    syncCartWhenLocalStorageChange.addEventListener()
    this.$once('hook:beforeDestroy', () => {
      syncCartWhenLocalStorageChange.removeEventListener()
    })
  }
}
</script>

<style lang="scss" scoped>
.v-container {
  padding-bottom: 48px;
}

.checkout {
  display: flex;
  align-items: flex-start;
}

.checkout-sections {
  margin-right: 20px;
  max-width: 652px;
  width: 100%;
}

.order {
  max-width: 485px;
  width: 100%;
}

.checkout-item {
  width: 100%;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
.cart-summary-mobile {
  display: none;
}

@media  (max-width: 960px) {
  .order {
    display: none;
  }

  .checkout-sections {
    max-width: 100%;
    margin-right: 0;
  }

  .cart-summary-mobile {
    display: block;
  }

  .checkout-item {
    margin-bottom: 16px
  }
}
</style>
