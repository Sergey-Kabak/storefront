<template>
  <div class="thank-you" v-if="order">
    <div class="thank-you-content">
      <h3 class="thank-you-title">
        {{ $t('Thank!') }}
        {{ $t('Your order') }} <span>№ {{ order.increment_id }}</span>
      </h3>
      <p class="thank-you-description">{{ $t('In the near future we will call you back to clarify the details. Have a nice day!)') }}</p>
      <button-filled-small
        color="dark"
        class="thank-you-button"
        @click.native="$router.push('/')"
      >
        {{ $t('to main') }}
      </button-filled-small>
      <div class="thank-you-body">
        <div class="thank-you-row" >
          <span class="left">{{ $t('Contact details') }}: </span>
          <span class="middle">{{order.billing_address.firstname}} {{order.billing_address.lastname}}, {{order.billing_address.telephone}}, {{order.billing_address.email}}</span>
        </div>
        <div class="thank-you-row">
          <span class="left">{{ $t('Payment method') }}: </span>
          <span class="middle">{{ $t(order.payment.method) }}</span>
          <span class="right label-paid" v-if="order.payment.method === 'liqpaymagento_liqpay'"> {{ $t('paid') }} </span>
        </div>
        <div class="thank-you-row">
          <span class="left">{{ $t('Shipping method') }}: </span>
          <span class="middle">{{ $t(order.shipping_description) }}</span>
          <span class="right label-free"> {{ $t('free') }} </span>
        </div>
        <div class="thank-you-row">
          <span class="left">{{ $t('Shipping address') }}: </span>
          <span class="middle">{{ order.billing_address.street && order.billing_address.street[0], order.billing_address.street && order.billing_address.street[1] }}</span>
        </div>
      </div>
      <div class="thank-you-body" v-if="products && products.length">
        <ul class="thank-you-page-products products">
          <li class="product-item-row" v-for="product in products" :key="product.server_item_id || product.id">
            <product-image :image="image(product)" />
            <div class="product-left">
              <span class="product-name">
                {{ product.name | htmlDecode }}
              </span>
            </div>
            <div class="product-middle">
              <span class="qty">
                {{ product.qty }}&nbsp;{{ $t('pc.') }}
              </span>
            </div>
            <div class="product-right">
              <div class="prices">
                <span class="price-special">
                  {{ finalPrice(product) | price(storeView) }}
                </span>
              </div>
            </div>
          </li>
          <li class="product-price">
            <div data-v-2eee09e6="" data-v-4f8ccff9="" class="total-prices">
              <div data-v-2eee09e6="" class="total-price">
                <div data-v-2eee09e6="" class="total-price-label">
                  {{ $t('Total') }}:
                </div>
                <div data-v-2eee09e6="" class="total-price-value">
                  {{ order.total_paid | price(storeView) }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { PaymentService } from '@vue-storefront/core/data-resolver';
import { getThumbnailForProduct } from '@vue-storefront/core/modules/cart/helpers';
import totalAmount from '../mixins/cart/totalAmount'
import ProductImage from 'theme/components/core/ProductImage';
import ButtonFilledSmall from 'theme/components/theme/ButtonFilledSmall';
import TotalPrice from 'theme/components/core/TotalPrice';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

export default {
  mixins: [totalAmount],
  data () {
    return {
      order: null,
      productSKUs: null,
      products: null
    }
  },
  components: {
    ProductImage,
    ButtonFilledSmall,
    TotalPrice
  },
  computed: {
    storeView () {
      return currentStoreView();
    }
  },
  created () {
    this.getOrder()
  },
  methods: {
    getOrder () {
      // jBNd8Y20EPY1SC2LeR5i178pIIcsl7wn
      PaymentService.getOrderByCartId(this.$route.query.cartId).then(async res => {
        this.order = res.result
        this.productSKUs = this.order.items.filter(product => product.product_type === 'simple').map(it => {
          return { sku: it.sku, qty: it.qty_ordered }
        })
        this.products = await this.$store.dispatch('search/getProductsBySKU', this.productSKUs.map(it => it.sku))
        // eslint-disable-next-line no-return-assign
        this.products.forEach(it => it.qty = this.productSKUs.find(el => el.sku === it.sku).qty)
        if (Object.keys(this.$route.query).includes('payparts')) {
          let PayPartStatus = await this.$store.dispatch('themeCredit/partPaymentStatus', { id: this.order.increment_id, marketplace: this.$route.query.marketplace })
          PayPartStatus.paymentState !== 'SUCCESS' && this.$router.push('/')
        }
      }).catch(e => {
        this.$router.push('/')
      })
    },
    image (product) {
      return {
        loading: this.thumbnail(product),
        src: this.thumbnail(product)
      }
    },
    thumbnail (product) {
      return getThumbnailForProduct(product)
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
}

.thank-you {
  padding: 42px 0;

  &-title {
    margin-bottom: 16px;
    margin-top: 0;
  }

  &-button {
    margin: auto;
    margin-bottom: 33px;
  }

  &-description {
    margin: 0 0 32px 0;
  }
}

.thank-you-body {
  border-radius: 4px;
  margin-bottom: 22px;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
}

.thank-you-row {
  display: grid;
  align-items: flex-start;
  grid-template-columns: 40% 48% 12%;
  padding: 16px 15px 22px 15px;
  text-align: left;

  .left {
    color: #595858;
    margin-right: 80px;
    font-weight: 600;
  }

  .right {
    text-align: right;
  }

  .middle {
    text-align: left;
    margin-right: 80px;
  }
}

.product-image {
  grid-row-start: 1;
  min-width: 35px;
  width: 35px;
  margin-right: 17px;
}

.thank-you-content {
  max-width: 680px;
  width: 95%;
  margin: auto;
  text-align: center;
  padding-left: 0;

  .products {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .m-auto {
    margin: 0 auto;
  }

  .mr-auto {
    margin-right: auto;
  }

  h3 {
    font-family: 'DIN Pro';
    font-weight: 800;
    font-size: 24px;
    line-height: 30px;
    color: #1A1919;

    span {
      font-size: 24px;
      font-weight: 600;
      margin: 0 5px;
      color: #23BE20;
    }
  }

  p {
    font-family: 'DIN Pro';
    font-size: 16px;
    line-height: 24px;
    color: #595858;
  }
}

.product-item-row {
  display: grid;
  border-bottom: 1px solid #e0e0e0;;
  align-items: flex-start;
  grid-template-columns: auto 52% 20% 20%;
  padding: 20px 15px;
  text-align: left;
  font-family: DIN Pro;
  font-style: normal;
  font-size: 13px;
  line-height: 16px;

  .product-left {
    display: flex;
    grid-row-start: 1;
    align-items: flex-start;
    margin-right: 60px;
  }

  .product-right {
    grid-row-start: 1;
    text-align: right;
  }

  .product-middle {
    grid-row-start: 1;
  }
}

.product-price {
  padding: 24px 16px 16px 16px;
}

.thank-you-improvment {
  padding: 0 20px 15px;

  textarea {
    min-height: 100px;
  }
}

.product-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price-title,
.price-total {
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
}

.price-special {
  font-weight: 600;
}

.label-paid {
  font-weight: 600;
  color: #23BE20;
}

.label-free {
  font-weight: 600;
}

.product-item-row ::v-deep {
  .product-image__thumb {
    height: auto!important
  }
}

.total-prices {
  width: 100%;
}

::v-deep {
  .total-price {
    display: flex;
    justify-content: space-between;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

@media (max-width: 700px) {
  .thank-you-row {
    padding: 15px;
    grid-template: 1fr / 2fr;

    .middle {
      grid-row-start: 2;
      margin-right: 50px;
      margin-right: 0;
    }

    .right {
      grid-row-start: 2;
    }

    .left {
      margin-bottom: 15px;
    }
  }

  .product-item-row {
    grid-template-columns: auto 1fr;

    .product-left {
      grid-column-start: 2;
      grid-row-start: 1;
      margin-bottom: 20px;
    }

    .product-middle {
      grid-row-start: 1;
      grid-column-start: 2;
      margin-left: auto;
      margin-top: auto;
    }

    .product-right {
      margin-top: auto;
      margin-right: auto;
      grid-row-start: 1;
      grid-column-start: 2;
    }
  }

  .product-image {
    grid-row-start: 1;
  }
}
</style>
