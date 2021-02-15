<template>
  <div class="thank-you" v-if="order">
    <div class="v-container">
      <div class="thank-you-header">
        <div class="title">
          <svg class="title-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#23BE20">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9.29 16.29L5.7 12.7C5.31 12.31 5.31 11.68 5.7 11.29C6.09 10.9 6.72 10.9 7.11 11.29L10 14.17L16.88 7.29C17.27 6.9 17.9 6.9 18.29 7.29C18.68 7.68 18.68 8.31 18.29 8.7L10.7 16.29C10.32 16.68 9.68 16.68 9.29 16.29Z"/>
          </svg>
          <p class="title-text"> {{ $t('Thank!') }} {{ $t('Your order') }}&nbsp;<span class="highlighted">№ {{ order.increment_id }}</span></p>
        </div>
        <p class="thank-you-description">
          {{ $t('In the near future we will call you back to clarify the details. Have a nice day!)') }}</p>
      </div>
      <div class="thank-you-page-content">
        <div class="order-info">
          <div class="thank-you-body">
            <div class="thank-you-row">
              <span class="left">{{ $t('Contact details') }}: </span>
              <div class="middle">
                <span>{{ order.billing_address.firstname }} {{ order.billing_address.lastname }}, {{ order.billing_address.telephone }}</span>
                <span>{{ order.billing_address.email }}</span>
              </div>
            </div>
            <div class="thank-you-row">
              <span class="left">{{ $t('Payment method') }}: </span>
              <span class="middle">{{ $t(order.payment.method) }}</span>
              <span class="right pay-status" :class="status" v-if="status"> {{ $t(status) }} </span>
            </div>
            <div class="thank-you-row">
              <span class="left">{{ $t('Shipping method') }}: </span>
              <span class="middle">{{ $t(shippingMethod) }}</span>
              <span class="right label-free"> {{ $t('free') }} </span>
            </div>
            <div class="thank-you-row">
              <span class="left">{{ $t('Shipping address') }}: </span>
              <span class="middle">{{ order.billing_address.street && order.billing_address.street[0] }} {{ order.billing_address.street && order.billing_address.street[1] }}</span>
            </div>
          </div>
          <div class="order-prices">
            <div class="price-row discount" v-if="order.base_discount_amount">
              <span class="left">{{ $t('discount') }}:</span>
              <span class="right">{{ order.base_discount_amount * -1 | price(storeView) }}</span>
            </div>
            <div class="price-row grand-total">
              <span class="left">{{ $t('Grand total') }}:</span>
              <span class="right">{{ order.base_grand_total | price }}</span>
            </div>
          </div>
        </div>
        <ul class="products" v-if="order.items.length">
          <li class="products-title">{{ $t('Your order') }}</li>
          <li class="product-item-row" v-for="product in products" :key="product.server_item_id || product.id">
            <product-image :image="image(product)"/>
            <div class="product-info">
              <span class="product-name">
                {{ product.name | htmlDecode }}
              </span>
              <span class="qty">
                {{ product.qty_ordered }}&nbsp;{{ $t('pc.') }}
              </span>
              <div class="prices">
                <span class="price-original" :class="{ 'old-price': product.original_price > product.price }">
                  {{ product.original_price | price(storeView) }}
                </span>
                <span class="price-special" v-if="product.original_price > product.price">
                  {{ product.price | price(storeView) }}
                </span>
                <span class="price-discount" v-if="product.original_price > product.price">
                  -{{ discount(product) }} %
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ProductImage from 'theme/components/core/ProductImage';
import TotalPrice from 'theme/components/core/TotalPrice';
import {getThumbnailForProduct} from '@vue-storefront/core/modules/cart/helpers';
import {currentStoreView} from '@vue-storefront/core/lib/multistore';
import {price} from 'theme/helpers';
import {mapState} from 'vuex';
import {Logger} from '@vue-storefront/core/lib/logger';
import {localizedRoute} from '@vue-storefront/core/lib/multistore';
import {PaymentService} from '@vue-storefront/core/data-resolver';

export default {
  components: {
    ProductImage,
    TotalPrice
  },
  data: () => ({
    status: null
  }),
  computed: {
    ...mapState({
      order: (state) => state.checkoutPage.order,
      cartServerToken: (state) => state.cart.cartServerToken
    }),
    products () {
      return this.order.items.filter(it => it.parent_item && it.parent_item.product_type === 'bundle' || !it.parent_item)
    },
    isMarketplace () {
      return this.products.some(it => it.extension_attributes.marketplace)
    },
    shippingMethod() {
      return this.order.extension_attributes.shipping_assignments && this.order.extension_attributes.shipping_assignments[0] && this.order.extension_attributes.shipping_assignments[0].shipping.method
    },
    storeView () {
      return currentStoreView();
    }
  },
  async asyncData ({ context, route, store }) {
    try {
      const order = await store.dispatch('checkoutPage/getOrderByCartId', route.query.cartId)
      if (order.errorMessage) {
        context.server.response.redirect(localizedRoute('/'))
      }
    } catch (e) {
      Logger.error(e)()
      throw e
    }
  },
  async mounted() {
    if (!this.cartServerToken) { // clear only correct cart
      this.$store.commit('checkoutPage/RESET_CHECKOUT', null)
      this.$store.dispatch('cart/clear', { sync: false })
    }
    if (this.order.payment.method === 'liqpaymagento_liqpay') {
      this.status = await this.$store.dispatch('checkoutPage/getLiqpayStatus', {
        orderId: this.order.increment_id,
        marketplace: this.isMarketplace
      })
    }

    if (this.order.payment.method === 'temabit_payparts') {
      const status = await this.$store.dispatch('themeCredit/partPaymentStatus', {
        id: this.order.increment_id,
        marketplace: this.isMarketplace
      })
      this.status = status.state && status.state.toLowerCase()
    }
    this.initAdmitad()
  },
  methods: {
    image(product) {
      return {
        src: this.getThumbnail(product.extension_attributes.thumbnail, 88, 88)
      }
    },
    discount (product) {
      if (product.original_price > product.price) {
        return parseInt(((product.original_price - product.price) / (product.original_price / 100)))
      }
    },
    initAdmitad() {
      ADMITAD = window.ADMITAD || {};
      ADMITAD.Invoice = ADMITAD.Invoice || {};
      ADMITAD.Invoice.category = '1';

      const orderedItem = [];
      this.products.map(it => {
        orderedItem.push({
          Product: {
            productID: it.item_id,
            category: '1',
            price: it.price,
            priceCurrency: 'UAH',
          },
          orderQuantity: it.qty_ordered,
          additionalType: 'sale'
        });
      })
      ADMITAD.Invoice.referencesOrder = ADMITAD.Invoice.referencesOrder || [];

      ADMITAD.Invoice.referencesOrder.push({
        orderNumber: this.order.increment_id,
        orderedItem: orderedItem
      });
      ADMITAD.Tracking.processPositions();
    }
  }
}
</script>

<style lang="scss" scoped>
.v-container {
  width: 90%;
  max-width: 1157px;
  padding-bottom: 24px;
}

span {
  display: block;
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
  overflow-wrap: break-word;
}

.thank-you {
  width: 100%;
  margin: 0 auto;
}

.thank-you-page-content {
  display: flex;
  align-items: flex-start;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  svg {
    min-width: 24px;
    min-height: 24px;
  }
}

.title-icon {
  margin-right: 16px;
}

.title-text {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
}

.highlighted {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #23be20;
}

.thank-you-description {
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 24px;
  color: #5F5E5E;
  margin: 0 0 24px 0;
}

.order-info {
  max-width: 652px;
  width: 100%;
  margin-right: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.pay-status {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;

  &.error,
  &.failure {
    color: #EE2C39;
  }

  &.success {
    color: #1A1919;
  }
}

.thank-you-body {
  box-sizing: border-box;
  border-bottom: 1px solid #E0E0E0;
}

.thank-you-row {
  display: grid;
  align-items: flex-start;
  grid-template-columns: 40% 44% auto;
  padding: 16px;
  text-align: left;

  .left {
    font-size: 13px;
    line-height: 16px;
    color: #595858;
    font-weight: 600;
  }

  .right {
    text-align: right;
  }

  .middle {
    text-align: left;

    span {
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.product-image {
  width: auto!important;
  max-width: 88px;
  margin-right: 16px;
  min-width: 88px;
  min-height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row-start: 1;
}

.product-info {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.products {
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  width: 100%;
  max-width: 485px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.products-title {
  padding: 16px 16px 8px 16px;
  font-family: DIN Pro;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #1A1919;
}

.thank-you-content {
  max-width: 652px;
  width: 95%;
  margin: auto;
  text-align: left;
  padding-left: 0;
}

.product-name {
  width: 80%;
  margin-bottom: 8px;
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 18px;
  color: #1A1919;
}

.qty {
  width: 20%;
  display: flex;
  justify-content: flex-end;
}

.product-item-row {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  align-items: flex-start;
  padding: 16px;
  text-align: left;
  font-family: DIN Pro;
  font-style: normal;
  font-size: 13px;
  line-height: 16px;

  &:last-child {
    border-bottom: none;
  }

  .product-left {
    display: flex;
    flex-direction: column;
    grid-row-start: 1;
    align-items: flex-start;
    margin-right: 5px;
  }

  .product-right {
    grid-row-start: 1;
    text-align: right;
  }

  .product-middle {
    margin-left: auto;
    text-align: right;
  }
}

.price-row {
  display: grid;
  grid-template-columns: auto auto;
  padding: 16px;

  .right {
    text-align: right;
  }

  &.discount {
    padding: 16px 16px 8px 16px;
    span {
      font-family: DIN Pro;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      color: #23BE20;
    }
  }
}

.grand-total {
  span {
    font-family: DIN Pro;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: #1A1919;
  }
}

.product-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 16px 16px 16px;
}

.label-paid {
  font-weight: 600;
  color: #23BE20;
}

.label-free {
  color: #23BE20;
  font-weight: 600;
}

.prices {
  display: flex;
  align-items: baseline;
}

.price-original {
  white-space: nowrap;
  margin-right: 4px;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #1A1919;

  &.old-price {
    font-family: DIN Pro;
    font-weight: normal;
    font-size: 12px;
    line-height: 12px;
    text-decoration-line: line-through;
    color: #5F5E5E;
  }
}

.price-special {
  white-space: nowrap;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  color: #1A1919;
}

.price-discount {
  white-space: nowrap;
  align-self: center;
  margin-left: 5px;
  font-family: DIN Pro;
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  text-transform: uppercase;
  color: #FFFFFF;
  background: #EE2C39;
  border-radius: 30px;
  padding: 0 7px;
}

@media (max-width: 1068px) {
  .thank-you-page-content {
    flex-direction: column-reverse;
  }

  .products {
    max-width: 100%;
    margin-bottom: 16px;
  }

  .order-info {
    max-width: 100%;
    margin-right: 0;
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

  .product-name {
    width: 100%;
    font-size: 13px;
    line-height: 16px;
  }

  .price-original {
    font-size: 15px;
    line-height: 16px;

    &.old-price {
      font-size: 11px;
      line-height: 11px;
    }
  }

  .price-special {
    font-size: 15px;
    line-height: 16px;
  }

  .product-image {
    max-width: 56px;
    min-width: 56px;
    max-height: 56px;
    min-height: auto;
  }

  .qty {
    width: auto;
    margin-left: auto;
    order: 1;
  }
}
</style>
