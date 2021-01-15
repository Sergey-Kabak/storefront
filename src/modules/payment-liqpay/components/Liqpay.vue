<template>
  <div class="liqpay">
    <span class="liqpay-text">{{ $t("By paying i accept") }} <router-link class="link" to="/info/umovi-vikoristannja-sajtu"> {{ $t("User conditions") }}</router-link></span>
    <button-full class="submit" @click.native="onCreateOrder()">
      {{ $t('To pay') }}
    </button-full>
  </div>
</template>
<script>

import ButtonFull from 'theme/components/theme/ButtonFull'
import config from 'config'
import { mapState, mapGetters } from 'vuex';
import { CheckoutService } from 'theme/services'

export default {
  components: {
    ButtonFull
  },
  beforeMount: function () {
    this.$bus.$on('order-after-placed', this.submit)
  },
  beforeDestroy: function () {
    this.$bus.$off('order-after-placed', this.submit)
  },
	computed: {
    ...mapGetters({
      totals: 'cart/getTotals'
    }),
    ...mapState({
      cartItems: (state) => state.cart.cartItems,
      cartServerToken: (state) => state.cart.cartServerToken,
      cartId: (state) => state.cart.cartServerToken,
      incrementId: (state) => state.order.last_order_confirmation && state.order.last_order_confirmation.confirmation && state.order.last_order_confirmation.confirmation.orderNumber
    }),
    totalPrice () {
      return this.totals.find(it => it.code === 'grand_total').value
    },
    isMarketplace () {
      return this.cartItems.some(it => +it.marketplace)
    }
  },
  methods: {
    onCreateOrder () {
      this.$bus.$emit('checkout-before-placeOrder')
    },
    async submit () {
      const url = await this.$store.dispatch('checkoutPage/getLiqpayUrl', {
        amount: this.totalPrice,
        marketplace: this.isMarketplace,
        orderId: this.incrementId,
        resultUrl: window.location.origin + '/thank-you-page?cartId=' + this.cartServerToken
      })

      window.location.href = url
    }
  }
};
</script>
<style lang="scss" scoped>
.liqpay {
  display: flex;
  justify-content: space-between;
  padding: 16px 32px;
}

.liqpay-text {
  margin-right: 24px;
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
}

.link {
  border-bottom: 1px solid #1A1919;
}

.submit {
  max-width: 195px;
}

@media  (max-width: 576px) {
  .liqpay {
    padding: 8px 16px 16px 16px;
    flex-direction: column-reverse;
  }

  .button-full {
    max-width: 100%;
    margin-bottom: 12px;
  }

  .liqpay-text {
    margin-right: 0;
  }
}
</style>
