<template>
  <form
    method="POST"
    action="https://www.liqpay.ua/api/3/checkout"
    accept-charset="utf-8"
    target="_blank"
    ref="form"
  >
    <input
      type="hidden"
      name="data"
      :value="data"
    />
    <input
      type="hidden"
      name="signature"
      :value="signature"
    />
    <button @click="onCreateOrder()">{{ $t('To pay') }}</button>
  </form>
</template>

<script>

import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8'
import sha1 from 'crypto-js/sha1'
import config from 'config'
import { mapState } from 'vuex';

export default {
	computed: {
    ...mapState({
      cartItems: (state) => state.cart.cartItems,
      cartServerToken: (state) => state.cart.cartServerToken
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
						action: config.liqpay.action,
						currency: config.liqpay.currency, 
						amount: this.totalPrice,
						description: "description",
            order_id: this.cartServerToken,
            result_url: config.liqpay.result_url
          })
        )
      )
    },
		signature () {
			return Base64.stringify(sha1(config.liqpay.private_key + this.data + config.liqpay.private_key))
    }
  },
  methods: {
    onCreateOrder () {
      this.$bus.$emit('checkout-before-placeOrder')
    }
  }
};
</script>

<style lang="scss" scoped>	
	button {
		width: 100%;
    height: 40px;
    background: #23BE20;
		border-style: none;
		max-width: 250px;
    border-radius: 4px;
    font-family: 'DIN Pro';
    font-weight: 700;
    font-size: 15px;
    line-height: 16px;
    color: #FFFFFF;
    padding: 12px 0;
	}
</style>
