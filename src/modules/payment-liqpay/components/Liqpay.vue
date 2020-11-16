<template>
  <div>
    <button-full @click.native="onCreateOrder()">
      {{ $t('To pay') }}
    </button-full>
    <div id="liqpay_checkout" :key="liqpayKey"/>
  </div>
</template>
<script>

import ButtonFull from 'theme/components/theme/ButtonFull'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import sha1 from 'crypto-js/sha1'
import config from 'config'
import { mapState, mapGetters } from 'vuex';

export default {
  data: () => ({
    liqpayKey: 1,
    liqpayStatus: null,
    languages: {
      'uk-UA': 'uk',
      'ru-RU': 'ru',
      'en-US': 'en'
    }
  }),
  components: {
    ButtonFull
  },
  beforeMount: function () {
    this.$bus.$on('liqpay', this.submit)
  },
  mounted: function () {
    let liqpayScript = document.createElement('script')
    liqpayScript.setAttribute('src', 'https://static.liqpay.ua/libjs/checkout.js')
    liqpayScript.async = true
    document.head.appendChild(liqpayScript)
  },
	computed: {
    ...mapGetters({
      totals: 'cart/getTotals'
    }),
    ...mapState({
      cartItems: (state) => state.cart.cartItems,
      orderId: (state) => state.order.last_order_confirmation && state.order.last_order_confirmation.confirmation && state.order.last_order_confirmation.confirmation.backendOrderId,
      incrementId: (state) => state.order.last_order_confirmation && state.order.last_order_confirmation.confirmation && state.order.last_order_confirmation.confirmation.orderNumber
    }),
		data () {
			return Base64.stringify(
				Utf8.parse(
					JSON.stringify({
						public_key: this.liqpayData.public_key,
						version: '3',
						action: 'pay',
						currency: 'UAH',
						amount: this.totalPrice,
            order_id: this.incrementId,
            incrementId: this.incrementId,
            server_url: this.liqpayData.server_url
          })
        )
      )
    },
    totalPrice () {
      return this.totals.find(it => it.code === 'grand_total').value
    },
		signature () {
			return Base64.stringify(sha1(this.liqpayData.private_key + this.data + this.liqpayData.private_key))
    },
    liqpayUpdate () {
      this.liqpayKey += 1
    },
    liqpayData () {
      return this.cartItems.some(it => +it.marketplace) ? config.liqpay_marketplace : config.liqpay
    }
  },
  methods: {
    onCreateOrder () {
      this.$bus.$emit('checkout-before-placeOrder')
    },
    submit(payload) {
      this.$nextTick(() => {
        LiqPayCheckout.init({
          data: this.data,
          signature: this.signature,
          embedTo: '#liqpay_checkout',
          language: this.languages[this.$i18n.locale],
          mode: 'popup'
        }).on('liqpay.callback', (data) => {
          this.liqpayStatus = data.status
        }).on('liqpay.close', (data) => {
          if (this.liqpayStatus === 'success') {
            this.$bus.$emit('order-after-placed', payload)
          } else {
            this.cancelOrder()
          }
          this.liqpayUpdate()
          this.liqpayStatus = null
        })
      })
    },
    cancelOrder() {
      this.$router.push('/')
      this.$store.dispatch('cart/clear', { sync: false })
    }
  },
  beforeDestroy (){
    this.$bus.$off('liqpay', this.submit)
  }
};
</script>
