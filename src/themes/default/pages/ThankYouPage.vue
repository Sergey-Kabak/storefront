<template>
	<div class="thank-you-content align-justify pl20" v-if="order">
		<div class="container">
			<div class="row">
				<div class="col-md-8 pl20 pr20 m-auto align-center">
					<h3>
						{{ $t('Thank!') }}
						{{ $t('Your order') }} <span v-if="order && order.orderNumber">№{{order && order.orderNumber}}</span>
						{{ $t('already going )') }}
					</h3>
					<p>{{ $t('In the near future we will call you back to clarify the details. Have a nice day!)') }}</p>

					<p>
						<button-full
							class="custom-action-button"
							@click.native="$router.push('/')"
						>
							{{ $t('To main') }}
						</button-full>
					</p>
					<div id="thank-you-extensions" />
					<div class="grid-container">
						<div class="grid-item">
							<div class="flex">
								<span class="left">{{ $t('Contact details') }}: </span>
								<span class="right">{{ order.addressInformation && order.addressInformation.billingAddress.firstname }} {{ order.addressInformation && order.addressInformation.billingAddress.lastname }}, {{ order.addressInformation && order.addressInformation.billingAddress.telephone }}, {{ order.addressInformation && order.addressInformation.billingAddress.email }}</span>
							</div>
						</div>
						<div class="grid-item">
							<div class="flex">
								<span class="left">{{ $t('Payment method') }}: </span>
								<span class="right">{{ order.addressInformation && order.addressInformation.payment_method_code }} </span>
							</div>
						</div>
						<div class="grid-item">
							<div class="flex">
								<span class="left">{{ $t('Shipping method') }}: </span>
								<span class="right">{{ order.addressInformation && order.addressInformation.shipping_method_code }} </span>
							</div>
						</div>
						<div class="grid-item">
							<div class="flex">
								<span class="left">{{ $t('Shipping address') }}: </span>
								<span class="right">{{ $t('st.') }} {{ order.addressInformation && order.addressInformation.street && order.addressInformation.street[0] }}, {{ order.addressInformation && order.addressInformation.street && order.addressInformation.street[1] }}</span>
							</div>
						</div>
						<ul class="thank-you-page-products products">
							<li class="product-item-row" v-for="(product, index) in order.products" :key="index">
								<div class="blend">
									<product-image :image="image(product)" />
									<span class="serif h4 name">
										{{ product.name | htmlDecode }}
									</span>
								</div>
								<div class="qty">
									{{ product.qty }}{{ $t('pc.') }}
								</div>
								<div class="prices">
									<span class="h4 serif price-special" v-if="product && product.totals">
										{{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount }}₴
									</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import VueOfflineMixin from 'vue-offline/mixin'
import config from 'config'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import sha1 from 'crypto-js/sha1'
import fetch from 'isomorphic-fetch'
import ButtonFull from 'theme/components/theme/ButtonFull'
import ProductImage from 'theme/components/core/ProductImage'
import { getThumbnailForProduct } from '@vue-storefront/core/modules/cart/helpers'

export default {
	components: {
		ButtonFull,
		ProductImage
	},
	data: () => ({
		order: null
	}),
	computed: {
		data () {
			return Base64.stringify(
				Utf8.parse(
					JSON.stringify({ 
						public_key: config.liqpay.public_key, 
						version: config.liqpay.version,
						action: 'status',
            order_id: '000000157'
          })
        )
			)
		},
		signature () {
			return Base64.stringify(sha1(config.liqpay.private_key + this.data + config.liqpay.private_key))
		}
	},
	mounted: function() {
		this.order = JSON.parse(localStorage.getItem('shop/order'))
	},
	created: async function() {
		// const res = await fetch('https://www.liqpay.ua/api/request', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/x-www-form-urlencoded',
		// 		'Access-Control-Allow-Origin': '*',
		// 		'Access-Control-Allow-Methods': 'GET, OPTIONS, POST',
		// 		'Access-Control-Allow-Headers': 'Content-Type'
		// 	},
		// 	body: `data=${this.data}&signature=${this.signature}`
		// })
	},
	methods: {
		image (product) {
      return {
        loading: this.thumbnail(product),
        src: this.thumbnail(product)
      }
		},
		thumbnail (product) {
      return getThumbnailForProduct(product)
    },
	},
	// beforeDestroy() {
	// 	localStorage.removeItem('shop/order')
	// }
}
</script>

<style lang="scss" scoped>
	.thank-you-content {
		margin-top: 60px;
		padding-left: 0;
		min-height: calc(100vh - 188px);

    .products {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .grid-container {
      border: 1px solid #E0E0E0;
      box-sizing: border-box;
      border-radius: 4px;
      .grid-item {
        padding: 16px;
        border-bottom: 1px solid #e0e0e0;
        .left {
					max-width: 130px;
					width: 100%;
					text-align: left;
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 700;
          font-size: 13px;
          line-height: 16px;
          color: #5F5E5E;
          opacity: 0.6;
        }
        .right {
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          line-height: 16px;
          color: #1A1919;
          margin-left: 20px;
        }
      }
      .name {
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;
        color: #1A1919;
      }
      .product-image {
        width: 32px;
        height: auto;
      }
			.price-special {
				font-family: DIN Pro;
				font-style: normal;
				font-weight: 400;
				font-size: 13px;
				line-height: 16px;
				text-align: right;
				color: #1A1919;
			}
      .qty {
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;
        color: #1A1919;
      }
    }

    .m-auto {
      margin: 0 auto;
    }

    .mr-auto {
      margin-right: auto;
    }

    h3 {
			margin: 0;
      font-family: 'DIN Pro';
      font-weight: 800;
      font-size: 24px;
      line-height: 30px;
      color: #1A1919;

      span {
        color: #23BE20;
      }
    }

    p {
      font-family: 'DIN Pro';
      font-size: 16px;
      line-height: 24px;
      color: #5F5E5E;
    }
		
		.custom-action-button {
			margin-bottom: 30px;
			max-width: 130px;
			min-width: auto;
			margin: auto;
		}

    @media (min-width: 64em) {
      h4 {
        font-size: 24px;
      }
    }
  }
	.product-item-row {
		padding: 15px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.blend {
		display: flex;
		align-items: flex-start;
		max-width: 400px;
		width: 100%;
	}

	.product-image {
		margin-right: 10px;
	}

  .thank-you-improvment {
    padding: 0 20px 15px;

    @media (min-width: 64em) {
      padding: 0 40px 10px;
    }

    textarea {
      min-height: 100px;
    }
  }
</style>
