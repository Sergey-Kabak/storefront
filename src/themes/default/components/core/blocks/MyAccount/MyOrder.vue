<template>
  <div class="order-wrapper">
    <div class="order-title">
      <router-link class="order-title-link" :to="localizedRoute('/account/orders')">
        <icon-base class="order-title-icon"> <arrow-left-icon /> </icon-base>
        <span class="order-title-text">{{ $t('All orders') }}</span>
      </router-link>
    </div>
    <div class="order" v-if="order">
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
        </div>
      <div class="summary">
        <ul class="products" v-if="order.items.length">
          <li class="products-title">{{ $t('Products') }}</li>
          <li class="product-item-row" v-for="product in filterOrderItems(order.items)" :key="product.server_item_id || product.id">
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
      <div class="cancel-order" v-if="canCancel(order.status)" @click="cancelOrder()">
        <span class="cancel-order-text">{{ $t('cancel order') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import MyOrder from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrder';
import ProductImage from 'theme/components/core/ProductImage';
import IconBase from 'theme/components/theme/IconBase';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { ArrowLeftIcon } from 'theme/assets/account/index';

export default {
  mixins: [MyOrder],
  components: {
    ProductImage,
    IconBase,
    ArrowLeftIcon
  },
  data: () => ({
    status: null
  }),
  computed: {
    storeView () {
      return currentStoreView()
    },
    shippingMethod() {
      return this.order.extension_attributes.shipping_assignments && this.order.extension_attributes.shipping_assignments[0] && this.order.extension_attributes.shipping_assignments[0].shipping.method
    },
    isMarketplace () {
      return this.order.items.some(it => it.extension_attributes.marketplace)
    }
  },
  async mounted() {
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
  },
  methods: {
    canCancel(status) {
      return ['pending'].includes(status)
    },
    cancelOrder() {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Are you sure you want to cancel order?'),
        action1: { label: this.$t('OK'),
          action: () => {
            this.$store.dispatch('user/cancelOrder', this.order.entity_id)
          }
        },
        action2: { label: this.$t('Cancel'), action: 'close' },
        hasNoTimeout: true
      })
    },
    filterOrderItems(products) {
      if (products) {
        return products.filter(it => it.parent_item && it.parent_item.product_type === 'bundle' || !it.parent_item)
      }
      return [] 
    },
    image(product) {
      return {
        src: this.getThumbnail(product.extension_attributes.thumbnail, 88, 88)
      }
    },
    discount (product) {
      if (product.original_price > product.price) {
        return parseInt(((product.original_price - product.price) / (product.original_price / 100)))
      }
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
  width: 100%;
  margin-bottom: 20px;
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

.summary {
  margin-bottom: 24px;
}

.products {
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  width: 100%;
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

.order-title {
  margin-bottom: 16px;
}

.order-title-link {
  display: flex;
  align-items: center;
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
.cancel-order {
  padding: 16px 0;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  text-align: center;
  margin-bottom: 68px;
  cursor: pointer;
}

.cancel-order-text {
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 24px;
  color: #EE2C39;
}

</style>
