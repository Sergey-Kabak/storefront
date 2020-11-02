<template>
  <div class="thank-you">
    <div class="thank-you-content">
      <h3 v-if="OnlineOnly" class="thank-you-title">
        {{ $t('Thank!') }}
        {{ $t('Your order') }} <span v-if="OnlineOnly && lastOrderConfirmation.orderNumber">№{{ lastOrderConfirmation.orderNumber }}</span>
        {{ (productsHasPreorder || isCredit) ? '' : $t('already going )') }}
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
        <div class="thank-you-row" v-if="billingAddress">
          <span class="left">{{ $t('Contact details') }}: </span>
          <span class="middle">{{ billingAddress.firstname }} {{ billingAddress.lastname }}, {{ billingAddress.telephone }}, {{ billingAddress.email }}</span>
        </div>
        <div class="thank-you-row" v-if="addressInformation">
          <span class="left">{{ $t('Payment method') }}: </span>
          <span class="middle">{{ $t(addressInformation.payment_method_code) }}</span>
          <span class="right label-paid" v-if="addressInformation.payment_method_code === 'liqpaymagento_liqpay'"> {{ $t('paid') }} </span>
        </div>
        <div class="thank-you-row" v-if="addressInformation">
          <span class="left">{{ $t('Shipping method') }}: </span>
          <span class="middle">{{ $t(shippingType) }}</span>
          <span class="right label-free"> {{ $t('free') }} </span>
        </div>
        <div class="thank-you-row" v-if="billingAddress">
          <span class="left">{{ $t('Shipping address') }}: </span>
          <span class="middle">{{ $t('st.') }} {{ billingAddress.street && billingAddress.street[0] }}, {{ billingAddress.street && billingAddress.street[1] }}</span>
        </div>
      </div>
      <div class="thank-you-body" v-if="products.length">
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
           <total-price />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Composite from '@vue-storefront/core/mixins/composite';
import Breadcrumbs from 'theme/components/core/Breadcrumbs';
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea';
import ButtonFilledSmall from 'theme/components/theme/ButtonFilledSmall';
import GoogleMap from 'src/modules/google-map/google-map';
import VueOfflineMixin from 'vue-offline/mixin';
import { EmailForm } from '@vue-storefront/core/modules/mailer/components/EmailForm';
import config from 'config';
import { mapState, mapGetters } from 'vuex';
import { registerModule } from '@vue-storefront/core/lib/modules';
import { MailerModule } from '@vue-storefront/core/modules/mailer';
import { getThumbnailForProduct } from '@vue-storefront/core/modules/cart/helpers';
import ProductImage from 'theme/components/core/ProductImage';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import TotalPrice from 'theme/components/core/TotalPrice';

export default {
  name: 'ThankYouPage',
  components: {
    BaseTextarea,
    Breadcrumbs,
    GoogleMap,
    ProductImage,
    ButtonFilledSmall,
    TotalPrice
  },
  mixins: [Composite, VueOfflineMixin, EmailForm],
  beforeCreate () {
    registerModule(MailerModule)
  },
  data () {
    return {
      feedback: '',
      center: {
        lat: 55.488351,
        lng: 9.479296
      },
    }
  },
  computed: {
    ...mapState({
      shippingType: state => state.customShipping.type
    }),
    isCredit () {
      return this.$store.state.order.last_order_confirmation.order.addressInformation.payment_method_code === 'credit'
    },
    productsHasPreorder () {
      return this.products.some(it => !!it.preorder);
    },
    lastOrderConfirmation () {
      return this.$store.state.order.last_order_confirmation ? this.$store.state.order.last_order_confirmation.confirmation : {}
    },
    products () {
      return (this.$store.state.order.last_order_confirmation && this.$store.state.order.last_order_confirmation.order) ? this.$store.state.order.last_order_confirmation.order.products : []
    },
    billingAddress () {
      return (this.$store.state.order.last_order_confirmation && this.$store.state.order.last_order_confirmation.order && this.$store.state.order.last_order_confirmation.order.addressInformation) ? this.$store.state.order.last_order_confirmation.order.addressInformation.billingAddress : {}
    },
    addressInformation () {
      return this.$store.state.order.last_order_confirmation && this.$store.state.order.last_order_confirmation.order && this.$store.state.order.last_order_confirmation.order.addressInformation
    },
    isNotificationSupported () {
      if (isServer || !('Notification' in window)) return false
      return 'Notification' in window
    },
    isPermissionGranted () {
      if (isServer || !('Notification' in window)) return false
      return Notification.permission === 'granted'
    },
    checkoutPersonalEmailAddress () {
      return this.$store.state.checkout.personalDetails.emailAddress
    },
    mailerElements () {
      return config.mailer.contactAddress
    },
    storeView () {
      return currentStoreView();
    }
  },
  mounted: function() {
    this.initAdmitad()
  },
  methods: {
    finalPrice (product) {
      return product.original_special_price || product.original_price_incl_tax
    },
    onSuccess (message) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message,
        action1: { label: this.$t('OK') }
      })
      if (this.mailerElements.sendConfirmation) {
        this.sendEmail(
          {
            sourceAddress: this.mailerElements,
            targetAddress: this.checkoutPersonalEmailAddress,
            subject: this.$t('Confirmation of receival'),
            emailText: this.$t(`Dear customer,\n\nWe have received your letter.\nThank you for your feedback!`),
            confirmation: true
          }
        )
      }
    },
    onFailure (message) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message,
        action1: { label: this.$t('OK') }
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
    },
    initAdmitad() {
      ADMITAD = window.ADMITAD || {};
      ADMITAD.Invoice = ADMITAD.Invoice || {};
      ADMITAD.Invoice.category = '1';

      const orderedItem = [];
      this.products.map(it => {
        orderedItem.push({
          Product: {
            productID: it.id,
            category: '1',
            price: it.original_special_price || it.original_price,
            priceCurrency: 'UAH',
          },
          orderQuantity: it.qty,
          additionalType: 'sale'
        });
      })
      ADMITAD.Invoice.referencesOrder = ADMITAD.Invoice.referencesOrder || [];

      ADMITAD.Invoice.referencesOrder.push({
        orderNumber: this.lastOrderConfirmation.orderNumber,
        orderedItem: orderedItem
      });
      ADMITAD.Tracking.processPositions();
    }
  },
  destroyed () {
    this.$store.dispatch('checkout/setThankYouPage', false)
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
