<template>
  <div class="shipping-wrapper">
    <shipping-active v-if="shippingStatus === 'active'" />
    <shipping-selected v-if="shippingStatus === 'selected'" />
    <shipping-disabled v-if="shippingStatus === 'disabled'" />
  </div>
</template>

<script>
import ShippingDisabled from 'theme/components/core/blocks/Checkout/Shipping/ShippingDisabled'
import ShippingActive from 'theme/components/core/blocks/Checkout/Shipping/ShippingActive'
import ShippingSelected from 'theme/components/core/blocks/Checkout/Shipping/ShippingSelected'
import { mapState } from 'vuex'

export default {
  components: {
    ShippingDisabled,
    ShippingActive,
    ShippingSelected
  },
  computed: {
    ...mapState({
      shippingStatus: (state) => state.checkoutPage.shippingStatus
    })
  }
}
</script>
