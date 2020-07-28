<template>
  <form
    method="POST"
    action="https://www.liqpay.ua/api/3/checkout"
    accept-charset="utf-8"
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
    <button type="submit">Оплатить</button>
  </form>
</template>

<script>

import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8'
import sha1 from 'crypto-js/sha1'
import config from 'config'

export default {
	props: ["cart"],
	computed: {
		totalPrice () {
      return this.cart && this.cart.cartItems.reduce((acc, it) => acc + it.price * it.qty, 0)
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
						"description":"test",
						"order_id":"000002"
			})))
		},
		signature () {
			return Base64.stringify(sha1(config.liqpay.private_key + this.data + config.liqpay.private_key))
		}
	},
  created: function() {}
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
