<template>
  <div>
    <ButtonSmall @click.native="onCreateOrder()">
      {{ $t('To pay') }}
    </ButtonSmall>
    <div id="liqpay_checkout" :key="liqpayKey"/>
  </div>
</template>
<script>

import ButtonSmall from 'theme/components/theme/ButtonFilledSmall'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import sha1 from 'crypto-js/sha1'
import config from 'config'
import { mapState } from 'vuex';

export default {
  data: () => ({
    liqpayKey: 1,
    liqpayStatus: null,
    languages: {
      'ua-UA': 'uk',
      'ru-RU': 'ru',
      'en-US': 'en'
    }
  }),
  components: {
    ButtonSmall
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
    ...mapState({
      cartItems: (state) => state.cart.cartItems,
      orderId: (state) => state.order.last_order_confirmation && state.order.last_order_confirmation.confirmation && state.order.last_order_confirmation.confirmation.backendOrderId,
      incrementId: (state) => state.order.last_order_confirmation && state.order.last_order_confirmation.confirmation && state.order.last_order_confirmation.confirmation.orderNumber
    }),
		totalPrice () {
      return this.cartItems.reduce((acc, it) => acc + it.price * it.qty, 0)
    },
		data () {
			return Base64.stringify(
				Utf8.parse(
					JSON.stringify({
						public_key: config.liqpay.public_key,
						version: config.liqpay.version,
						action: 'pay',
						currency: config.liqpay.currency,
						amount: this.totalPrice,
						description: 'description',
            order_id: this.orderId,
            incrementId: this.incrementId,
            server_url: config.liqpay.server_url
          })
        )
      )
    },
		signature () {
			return Base64.stringify(sha1(config.liqpay.private_key + this.data + config.liqpay.private_key))
    },
    liqpayUpdate () {
      this.liqpayKey += 1
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
            this.$store.dispatch('payment/cancelPayment', this.orderId)
          }
          this.liqpayUpdate()
          this.liqpayStatus = null
        })
      })
    }
  },
  beforeDestroy (){
    this.$bus.$off('liqpay', this.submit)
  }
};
</script>
