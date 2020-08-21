<template>
  <div>
    <div class="thank-you-content align-justify py40 pl20">
      <div class="container">
        <div class="row">
          <div class="col-md-8 pl20 pr20 pt70 m-auto align-center">
            <h3 v-if="OnlineOnly">
              {{ $t('Thank!') }}
              {{ $t('Your order') }} <span v-if="OnlineOnly && lastOrderConfirmation.orderNumber">№{{lastOrderConfirmation.orderNumber}}</span>
              {{ $t('already going )') }}
            </h3>
            <p>{{ $t('In the near future we will call you back to clarify the details. Have a nice day!)') }}</p>

            <p>
              <button-outline
                  color="dark"
                  class="custom-action-button"
                  @click.native="$router.push('/')"
              >
                {{ $t('Return to shopping') }}
              </button-outline>
            </p>
            <div id="thank-you-extensions" />

            <div class="grid-container">
              <div class="grid-item" v-if="addressInfo">
                <div class="flex">
                  <span class="left">{{ $t('Contact details') }}: </span>
                  <span class="right">{{ addressInfo.firstname }} {{ addressInfo.lastname }}, {{ addressInfo.telephone }}, {{ addressInfo.email }}</span>
                </div>
              </div>
              <div class="grid-item" v-if="addressInfo">
                <div class="flex">
                  <span class="left">{{ $t('Shipping address') }}: </span>
                  <span class="right">{{ $t('st.') }} {{ addressInfo.street && addressInfo.street[0] }}, {{ addressInfo.street && addressInfo.street[1] }}</span>
                </div>
              </div>
              <ul v-if="products.length" class="thank-you-page-products products">
                <li class="row py10 product-item-row" v-for="product in products" :key="product.server_item_id || product.id">
                  <div class="blend">
                    <div class="ml10">
                      <product-image :image="image(product)" />
                    </div>
                  </div>
                  <div class="col-xs flex flex-wrap">
                    <div class="flex flex-nowrap details w-100">
                      <div class="flex w-100 flex-wrap between-xs main-info">
                        <div class="mr-auto">
                          <span class="serif h4 name">
                            {{ product.name | htmlDecode }}
                          </span>
                        </div>
                        <div class="qty">
                          {{ product.qty }}{{ $t('pc.') }}
                        </div>
                        <div class="flex mr10 align-right start-xs between-sm prices">
                          <div class="prices">
                            <span class="h4 serif price-special" v-if="product && product.totals">
                              {{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount }}₴
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Composite from '@vue-storefront/core/mixins/composite'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import VueOfflineMixin from 'vue-offline/mixin'
import { EmailForm } from '@vue-storefront/core/modules/mailer/components/EmailForm'
import config from 'config'
import { registerModule } from '@vue-storefront/core/lib/modules'
import { MailerModule } from '@vue-storefront/core/modules/mailer'
import { getThumbnailForProduct } from '@vue-storefront/core/modules/cart/helpers'
import ProductImage from 'theme/components/core/ProductImage'

export default {
  name: 'ThankYouPage',
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
    lastOrderConfirmation () {
      return this.$store.state.order.last_order_confirmation ? this.$store.state.order.last_order_confirmation.confirmation : {}
    },
    products () {
      return (this.$store.state.order.last_order_confirmation && this.$store.state.order.last_order_confirmation.order) ? this.$store.state.order.last_order_confirmation.order.products : []
    },
    addressInfo () {
      return (this.$store.state.order.last_order_confirmation && this.$store.state.order.last_order_confirmation.order && this.$store.state.order.last_order_confirmation.order.addressInformation) ? this.$store.state.order.last_order_confirmation.order.addressInformation.billingAddress : {}
    },
    checkoutPersonalEmailAddress () {
      return this.$store.state.checkout.personalDetails.emailAddress
    },
    mailerElements () {
      return config.mailer.contactAddress
    }
  },
  methods: {
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
  },
  destroyed () {
    this.$store.dispatch('checkout/setThankYouPage', false)
  },
  components: {
    ButtonOutline,
    ProductImage
  }
}
</script>

<style lang="sass">
  .custom-action-button
    width: auto !important
    height: 40px
    background: #23BE20
    border-radius: 4px
    font-family: 'DIN Pro'
    font-weight: 700
    font-size: 15px
    line-height: 16px
    color: #FFFFFF
    padding: 12px 0
</style>

<style lang="scss">
  .thank-you-content {
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
      .prices {
        margin-left: auto;
        .price-special {
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          line-height: 16px;
          text-align: right;
          color: #1A1919;
        }
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

    @media (min-width: 64em) {
      h4 {
        font-size: 24px;
      }
    }
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
