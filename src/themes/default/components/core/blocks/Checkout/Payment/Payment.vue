<template>
  <div class="payment-wrapper">
    <payment-active v-if="paymentStatus === 'active'"/>
    <payment-disabled v-if="paymentStatus === 'disabled'"/>
  </div>
</template>

<script>
import PaymentActive from 'theme/components/core/blocks/Checkout/Payment/PaymentActive'
import PaymentDisabled from 'theme/components/core/blocks/Checkout/Payment/PaymentDisabled'
import { mapState } from 'vuex'

export default {
  components: {
    PaymentDisabled,
    PaymentActive
  },
  created () {
    this.$store.dispatch('themeCredit/fetchBanksCheckout', this.$store.state.cart.cartServerToken);
  },
  computed: {
    ...mapState({
      paymentStatus: (state) => state.checkoutPage.paymentStatus
    })
  }
}
</script>
