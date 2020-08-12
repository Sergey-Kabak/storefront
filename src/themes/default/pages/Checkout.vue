<template>
  <div id="checkout">
    <div class="container">
      <div class="row" v-show="!isThankYouPage">
        <div class="col-xs-12 pb70">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">
                1. {{ $t('Delivery') }} <span class="material-icons">keyboard_arrow_right</span>
              </li>
              <li class="breadcrumb-item">
                2. {{ $t('Contact details') }} <span class="material-icons">keyboard_arrow_right</span>
              </li>
              <li class="breadcrumb-item">3. {{ $t('the Payment') }}</li>
            </ol>
          </nav>
          <shipping
              class="line relative"
              :class="{hidden: !activeSection.shipping}"
              :is-active="activeSection.shipping"
          />
          <div class="custom-active-block container-fluid" v-show="!activeSection.shipping">
            <div class="row">
              <div class="col-md-7 col-xs-12">
                <div class="container-fluid">
                  <div class="row pl20">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                      <div class="row mb15">
                        <div class="checkout-title mb-3">
                          <h1>
                            {{ $t('Checkout') }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-12">
                      <div class="shipping-details__edit" v-if="activeSection.personalDetails || activeSection.payment || activeSection.orderReview">
                        <div class="number-block d-flex align-items-center">
                          <div class="number align-center">1</div>
                          <div class="text">{{ $t('Delivery') }}:</div>
                          <div class="lh30 flex end-lg ml-auto">
                            <a href="#" class="cl-tertiary flex action" @click.prevent="$bus.$emit('checkout-before-edit', 'shipping')">
                              <span class="pr5">{{ $t('Edit') }}</span>
                            </a>
                          </div>
                        </div>
                        <div class="shipping-data">
                          <div class="text">
                            <template v-if="shippingDetails.isNewPost">
                              {{ `${shippingDetails.city}, ${shippingDetails.shopName}` }}
                            </template>
                            <template v-else>
                              {{ `${shippingDetails.city}, ${shippingDetails.streetAddress}, ${shippingDetails.apartmentNumber}` }}
                            </template>
                          </div>
                        </div>
                      </div>
                      <div class="shipping-details__edit mt-3" v-if="activeSection.payment || activeSection.orderReview">
                        <div class="number-block d-flex align-items-center">
                          <div class="number align-center">2</div>
                          <div class="text">{{ $t('Contact details') }}:</div>
                          <div class="lh30 flex end-lg ml-auto">
                            <a href="#" class="cl-tertiary flex action" @click.prevent="$bus.$emit('checkout-before-edit', 'personalDetails')">
                              <span class="pr5">{{ $t('Edit') }}</span>
                            </a>
                          </div>
                        </div>
                        <div class="shipping-data">
                          <div class="text">
                            {{ `${personalDetails.firstName} ${personalDetails.lastName}, ${shippingDetails.phoneNumber}, ${personalDetails.emailAddress}` }}
                          </div>
                        </div>
                      </div>
                      <div class="shipping-details__edit mt-3" v-if="activeSection.orderReview">
                        <div class="number-block d-flex align-items-center">
                          <div class="number align-center">3</div>
                          <div class="text">{{ $t('the Payment') }}:</div>
                          <div class="lh30 flex end-lg ml-auto">
                            <a href="#" class="cl-tertiary flex action" @click.prevent="$bus.$emit('checkout-before-edit', 'payment')">
                              <span class="pr5">{{ $t('Edit') }}</span>
                            </a>
                          </div>
                        </div>
                        <div class="shipping-data">
                          <div class="text">
                            {{ `${personalDetails.firstName} ${personalDetails.lastName}, ${shippingDetails.phoneNumber}, ${personalDetails.emailAddress}` }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="container-fuild">
                    <personal-details
                        :class="{hidden: !activeSection.personalDetails}"
                        class="line relative"
                        :is-active="activeSection.personalDetails"
                        :focused-field="focusedField"
                    />
                    <payment
                        class="line relative"
                        :is-active="activeSection.payment"
                        :class="{hidden: !activeSection.payment}"
                    />
                    <!--<order-review-->
                        <!--class="line relative"-->
                        <!--:is-active="activeSection.orderReview"-->
                        <!--:class="{hidden: !activeSection.orderReview}"-->
                    <!--/>-->
                    <div id="custom-steps" />
                  </div>
                </div>
              </div>
              <div class="col-md-5 hidden-xs">
                <div class="row">
                  <div class="hidden-xs col-sm-12">
                    <cart-summary />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <thank-you-page v-show="isThankYouPage" />
  </div>
</template>

<script>
import Checkout from '@vue-storefront/core/pages/Checkout'

import PersonalDetails from 'theme/components/core/blocks/Checkout/PersonalDetails'
import Shipping from 'theme/components/core/blocks/Checkout/NewShipping'
import Payment from 'theme/components/core/blocks/Checkout/Payment'
import OrderReview from 'theme/components/core/blocks/Checkout/OrderReview'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary'
import ThankYouPage from 'theme/components/core/blocks/Checkout/ThankYouPage'
import { registerModule } from '@vue-storefront/core/lib/modules'
import { OrderModule } from '@vue-storefront/core/modules/order'

export default {
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    OrderReview,
    CartSummary,
    ThankYouPage
  },
  mixins: [Checkout],
  beforeCreate () {
    registerModule(OrderModule)
  },
  methods: {
    notifyEmptyCart () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Shopping cart is empty. Please add some products before entering Checkout'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyOutStock (chp) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: chp.name + this.$t(' is out of stock!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyNotAvailable () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('Some of the ordered products are not available!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyStockCheck () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Stock check in progress, please wait while available stock quantities are checked'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyNoConnection () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('There is no Internet connection. You can still place your order. We will notify you if any of ordered products is not available because we cannot check it right now.'),
        action1: { label: this.$t('OK') }
      })
    }
  }
}
</script>

<style lang="sass">
  #checkout
    .number-block
      margin-bottom: 24px
      .number
        font-family: 'DIN Pro'
        font-size: 14px
        line-height: 16px
        color: #ffffff
        background: #23BE20
        border-radius: 100%
        width: 30px
        height: 30px
        padding-top: 7px
      .text
        margin-left: 10px
        font-family: 'DIN Pro'
        font-size: 14px
        line-height: 16px
        color: #1A1919
        font-weight: 700
      .action
        font-family: 'DIN Pro'
        font-size: 13px
        line-height: 16px
        color: #1A1919
    .shipping-details__edit
      .shipping-data
        background: #F9F9F9
        border-radius: 4px
        padding: 16px
        .text
          font-family: 'DIN Pro'
          font-size: 13px
          line-height: 16px
          color: #1A1919
          background: #ffffff
          padding: 12px 20px
          border-radius: 8px
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
  @import '~theme/css/base/text';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $bg-secondary: color(secondary, $colors-background);
  $color-tertiary: color(tertiary);
  $color-secondary: color(secondary);
  $color-error: color(error);
  $color-white: color(white);
  $color-black: color(black);

  #checkout {
    .breadcrumb {
      background-color: transparent;
      margin-top: 38px;
      &-item {
        font-family: 'DIN Pro';
        font-size: 13px;
        line-height: 16px;
        color: #BDBDBD;
        &.active {
          color: #5f5e5e;
        }
        & + .breadcrumb-item::before {
          display: none;
        }
        .material-icons {
          line-height: 16px;
        }
      }
    }
    .number-circle {
      width: 35px;
      height: 35px;

      @media (max-width: 768px) {
        width: 25px;
        height: 25px;
        line-height: 25px;
      }
    }
    .radioStyled {
      display: block;
      position: relative;
      margin-bottom: 12px;
      cursor: pointer;
      font-size: 13px;
      line-height: 16px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background: #FFFFFF;
      border: 1px solid #23BE20;
      box-sizing: border-box;
      border-radius: 4px;
      text-align: center;
      padding: 58px 16px 16px;
      font-family: 'DIN Pro';
      color: #1A1919;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      .checkmark {
        position: absolute;
        top: 16px;
        left: 0;
        right: 0;
        margin: 0 auto;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: 2px solid #23be20;
        padding: 3px;

        &:after {
          content: "";
          position: absolute;
          display: none;
          top: 3px;
          left: 3px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #23be20;
        }
      }

      input:checked ~ .checkmark:after {
        display: block;
      }
    }
  }

  .line {
    &:after {
      content: '';
      display: none;
      position: absolute;
      top: 0;
      left: 37px;
      z-index: -1;
      width: 1px;
      height: 100%;
      background-color: $bg-secondary;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .checkout-title {
    h1 {
      font-family: 'DIN Pro';
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 30px;
      color: #1A1919;
    }
    @media (max-width: 767px) {
      margin-bottom: 25px;

      h1 {
        font-size: 36px;
      }
    }
  }
</style>

<style lang="scss" scoped>
@import '~bootstrap';

</style>
