<template>
  <div id="checkout">
    <div class="checkout-container" v-show="!isThankYouPage">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" :class="{'active': activeSection.shipping}" aria-current="page">
            <span>1.</span>
            {{ $t('Delivery') }} <span class="material-icons">keyboard_arrow_right</span>
          </li>
          <li class="breadcrumb-item" :class="{'active': activeSection.personalDetails}">
            <span>2.</span>
            {{ $t('Contact details') }} <span class="material-icons">keyboard_arrow_right</span>
          </li>
          <li class="breadcrumb-item" :class="{'active': activeSection.payment}">
            <span>3.</span>
            {{ $t('the Payment') }}
          </li>
        </ol>
      </nav>
      <shipping
        class="line relative"
        :class="{hidden: !activeSection.shipping}"
        :is-active="activeSection.shipping"
      />
      <div class="custom-active-block" v-show="!activeSection.shipping">
        <div class="checkout-left">
          <div class="checkout-title">
            <h1>
              {{ $t('Checkout') }}
            </h1>
          </div>
          <div class="shipping-details__edit" v-if="activeSection.personalDetails || activeSection.payment || activeSection.orderReview">
            <div class="subtitle">
              <div class="number-block" :class="{'checked': !activeSection.shipping}">
                <div class="number align-center" v-if="activeSection.shipping">1</div>
                <img src='/assets/custom/Check.svg' v-else alt="correct">
              </div>
              <div class="subtitle-text">{{ $t('Delivery') }}:</div>
              <div class="lh30 flex end-lg ml-auto">
                <span class="edit" @click.prevent="$bus.$emit('checkout-before-edit', 'shipping')">{{ $t('Edit') }}</span>
              </div>
            </div>
            <div class="shipping-data">
              <div class="text">
                {{ `${shippingDetails.city}, ${shippingDetails.shopName ? shippingDetails.shopName : ''},
                ${$t('st.')} ${shippingDetails.streetAddress}, ${shippingDetails.apartmentNumber}` }}
              </div>
            </div>
          </div>
          <div class="shipping-details__edit" v-if="activeSection.payment || activeSection.orderReview">
            <div class="subtitle">
              <div class="number-block" :class="{'checked': !activeSection.personalDetails}">
                <div class="number" v-if="activeSection.shipping">3</div>
                <img src='/assets/custom/Check.svg' v-else alt="correct">
              </div>
              <div class="subtitle-text">{{ $t('Contact details') }}:</div>
              <div class="lh30 flex end-lg ml-auto">
                <span class="edit" @click.prevent="$bus.$emit('checkout-before-edit', 'personalDetails')">{{ $t('Edit') }}</span>
              </div>
            </div>
            <div class="shipping-data">
              <div class="text">
                {{ `${personalDetails.firstName} ${personalDetails.lastName}, ${shippingDetails.phoneNumber}, ${personalDetails.emailAddress}` }}
              </div>
            </div>
          </div>
          <personal-details
            :class="{hidden: !activeSection.personalDetails}"
            class="line relative"
            :is-active="activeSection.personalDetails"
            :focused-field="focusedField"
          />
          <payment
            :activeSection="activeSection"
            class="line relative"
            :is-active="activeSection.payment"
          />
        </div>
        <cart-summary class="checkout-right" />
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
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary'
import ThankYouPage from 'theme/components/core/blocks/Checkout/ThankYouPage'
import { registerModule } from '@vue-storefront/core/lib/modules'
import { OrderModule } from '@vue-storefront/core/modules/order'

export default {
  components: {
    PersonalDetails,
    Shipping,
    Payment,
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
    .checkout-container
      box-sizing: border-box
      padding-top: 18px
      max-width: 1324px
      width: 95%
      margin: auto
    .action
      font-family: 'DIN Pro'
      font-size: 13px
      line-height: 16px
      color: #1A1919
    .shipping-details__edit
      margin-bottom: 24px
      .shipping-data
        border-bottom: 1px solid #E0E0E0
        .text
          font-family: 'DIN Pro'
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis;
          padding-bottom: 24px
          font-size: 13px
          line-height: 16px
          color: #5F5E5E
          opacity: 0.6
          background: #ffffff
  .edit
    cursor: pointer
    font-family: DIN Pro
    font-style: normal
    padding-bottom: 4px
    border-bottom: 1px dashed #1A1919
    font-size: 13px
    line-height: 16px
    color: #1A1919

    &:hover
      border-color: transparent

  .number-block
    display: flex;
    align-items: center;
    justify-content: center
    font-family: 'DIN Pro'
    font-size: 14px
    line-height: 16px
    color: #ffffff
    margin-right: 15px
    background: #ffffff
    border-radius: 100%
    border: 1px solid #23BE20
    color: #1A1919
    font-weight: 600
    box-sizing: border-box
    width: 24px
    height: 24px

    &.checked
      background-color: #23BE20
  .subtitle
    margin-bottom: 24px
    display: flex
    align-items: center

    &.disabled
      opacity: .5
      .number-block
        background-color: #ffffff
  
  .subtitle-text
    font-family: 'DIN Pro'
    font-size: 14px
    line-height: 16px
    color: #1A1919
    font-weight: 700
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
      padding: 0;
      margin: 0 0 26px 0;
      background-color: transparent;
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
          color: #BDBDBD;
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
      display: flex;
      width: 100%;
      flex-direction: column-reverse;
      align-items: center;
      position: relative;
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
      margin-bottom: 0;
      border-radius: 4px;
      text-align: center;
      padding: 13px 0;
      font-family: 'DIN Pro';
      color: #1A1919;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      .checkmark {
        position: relative;
        margin-bottom: 18px;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: 2px solid #23be20;
        padding: 3px;

        &:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: none;
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
    margin-bottom: 24px;

    h1 {
      font-family: 'DIN Pro';
      margin-bottom: 0!important;
      font-style: normal;
      font-size: 24px!important;
      font-weight: 600!important;
      line-height: 30px!important;
      color: #1A1919;
    }
    @media (max-width: 767px) {
      margin-bottom: 25px;

      h1 {
        font-size: 36px;
      }
    }
  }

  .custom-active-block {
    display: flex;
    justify-content: space-between;
  }

  .checkout-left {
    max-width: 652px;
    width: 100%;
    margin-right: 76px;
  }

  .checkout-right {
    max-width: 592px;
    width: 100%;
  }

  @media (max-width: 1200px) {
    .checkout-left {
      margin-right: 30px;
    }
  }

  @media (max-width: 960px) {
    .checkout-right {
      display: none;
    }

    .checkout-left {
      max-width: 100%;
      margin-right: 0;
    }
  }

  @media (max-width: 460px) {
    #checkout {
      .checkout-container {
        width: 92%;
      }

      .breadcrumb {
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;

        .material-icons {
          display: none;
        }

        .breadcrumb-item {
          flex-direction: column;
          justify-content: center;
          margin-right: 30px;
          align-items: center;

          &:last-child {
            margin-right: 0;
          }
        }
      }
      .subtitle {
        margin-bottom: 15px;
      }
      .text {
        padding-bottom: 15px!important;
      }
    }
    .checkout-title {
      margin-bottom: 15px;
    }
  }
</style>

<style lang="scss" scoped>
@import '~bootstrap';

</style>
