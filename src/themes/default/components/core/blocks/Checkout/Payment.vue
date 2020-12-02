<template>
  <div class="payment">
    <div class="checkout-subtitle" v-if="!activeSection.personalDetails" >
      <div class="checkout-number-block" :class="{ 'checked': !activeSection.payment }">
        <div class="number align-center" v-if="activeSection.payment || activeSection.personalDetails">3</div>
        <img src='/assets/custom/Check.svg' v-else alt="correct">
      </div>
      <div class="checkout-subtitle-text">{{ $t('the Payment') }}:</div>
      <div class="lh30 flex end-lg ml-auto" v-if="activeSection.orderReview">
        <span class="edit" @click.prevent="$bus.$emit('checkout-before-edit', 'payment')">{{ $t('Edit') }}</span>
      </div>
    </div>
    <div class="checkout-subtitle disabled" v-else>
      <div class="checkout-number-block">
        <div class="number align-center">3</div>
      </div>
      <div class="checkout-subtitle-text">{{ $t('the Payment') }}:</div>
    </div>
    <div v-if="isActive && activeSection.payment" class="payment-body">
      <div class="label mb10">
        {{ $t('Payment method') }}
        <span class="label--highlighted">*</span>
      </div>
      <div class="payment-methods">
        <div class="payment-card" v-for="(method, index) in paymentMethods" :key="index" v-if="isShowPaymentMethod(method)">
          <label class="radioStyled">
            <div class="radio-input-row">
              <input
                type="radio"
                :value="method.code"
                name="payment-method"
                v-model="payment.paymentMethod"
                @change="onPaymentMethodChange()"
              >
              <span class="checkmark" />
              <div>
                {{ method.title ? $t(method.title) : $t(method.name) }}
              </div>
              <div v-if="method.code === 'credit'" class="note-right">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="#EE2C39"/>
                </svg>
                {{ $t('only for pickup') }}
              </div>
            </div>
            <div v-if="method.code === 'credit' && payment.paymentMethod === 'credit'" class="credit-block-wrapper">
              <div class="credit-block">
                <div class="block-title">{{ $t('Credit offer') }}</div>
                <credit-method v-if="getBanks.length" ref="creditMethod" />
              </div>
            </div>
          </label>
        </div>
      </div>
      <span class="validation-error" v-if="!$v.payment.paymentMethod.required">{{ $t('Field is required') }}</span>
    </div>
    <div class="mobile-data" v-show="isActive">
      <promo-code
        class="promo-code"
        :isActive.sync="isShowPromocode"
      />
      <total-price />
    </div>
    <div v-show="isActive">
      <LiqPay class="button-pay" v-if="payment.paymentMethod === 'liqpaymagento_liqpay' || (payment.paymentMethod === 'credit' && creditMethod === 'liqpay')" />
      <button-full
        v-else
        @click.native="placeOrder()"
        data-testid="paymentSubmit"
        :disabled="$v.payment.$invalid || (payment.paymentMethod === 'credit' && typeof maxTermsSelected !== 'undefined' && maxTermsSelected && alertStatus.class !== 'success')"
        class="button-pay"
        :aria-label="$t('To pay')"
      >
        {{ $t('To pay') }}
      </button-full>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength
} from 'vuelidate/lib/validators';
import {
  unicodeAlpha,
  unicodeAlphaNum
} from '@vue-storefront/core/helpers/validators';
import { mapState, mapGetters } from 'vuex';
import { Payment } from '@vue-storefront/core/modules/checkout/components/Payment';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import PromoCode from 'theme/components/core/blocks/Microcart/PromoCode';
import ButtonFull from 'theme/components/theme/ButtonFull';
import Tooltip from 'theme/components/core/Tooltip';
import LiqPay from 'src/modules/payment-liqpay/components/Liqpay';
import TotalPrice from 'theme/components/core/TotalPrice';
import CreditMethod from './Credits/CreditMethod';
import { CreditService } from '../../../../services';
import mixin from './Credits/mixin';
import totalAmount from '../../../../mixins/cart/totalAmount';
const lettersOnly = value => (
  /^[\u0400-\u04FF]+$/.test(value) ||
  /^[a-zA-Zа-яА-Я]+$/.test(value) ||
  value === ''
);
import config from 'config'

export default {
  props: {
    activeSection: {
      type: Object,
      required: true
    }
  },
  components: {
    ButtonFull,
    Tooltip,
    LiqPay,
    PromoCode,
    TotalPrice,
    CreditMethod
  },
  mixins: [Payment, mixin],
  data: () => ({
    isShowPromocode: false
  }),
  mounted () {
    // this.$store.dispatch('themeCredit/findExtraCreditAttributes')
  },
  watch: {
    'payment.paymentMethods': {
      handler: function (after, before) {
        this.sendDataToCheckout()
      },
      deep: true
    }
    // productsInCart: function (products) {
    //   this.$store.dispatch('themeCredit/fetchBanksCheckout', this.$store.state.cart.cartServerToken)
    // }
  },
  computed: {
    ...mapGetters({
      productsInCart: 'cart/getCartItems',
      totals: 'cart/getTotals',
      getCartToken: 'cart/getCartToken',
      getBanks: 'themeCredit/getBanks',
      creditMethod: 'themeCredit/creditMethod',
      selectedCredit: 'themeCredit/getSelectedCredit',
    }),
    countryOptions () {
      return this.countries.map((item) => {
        return {
          value: item.code,
          label: item.name
        }
      })
    },
    storeView () {
      return currentStoreView();
    },
    totalPrice () {
      return this.totals.find(it => it.code === 'grand_total').value
    }
  },
  validations () {
    if (!this.generateInvoice) {
      return {
        payment: {
          firstName: {
            required,
            minLength: minLength(2),
            unicodeAlpha
          },
          lastName: {
            required,
            unicodeAlpha
          },
          country: {
            required
          },
          streetAddress: {
            required,
            unicodeAlphaNum
          },
          apartmentNumber: {
            required,
            unicodeAlphaNum
          },
          city: {
            required,
            unicodeAlpha
          },
          paymentMethod: {
            required
          }
        }
      }
    } else {
      return {
        payment: {
          firstName: {
            required,
            minLength: minLength(2),
            unicodeAlpha
          },
          lastName: {
            required,
            unicodeAlpha
          },
          company: {
            required,
            unicodeAlphaNum
          },
          taxId: {
            required,
            minLength: minLength(3)
          },
          country: {
            required
          },
          streetAddress: {
            required,
            unicodeAlphaNum
          },
          apartmentNumber: {
            required,
            unicodeAlphaNum
          },
          zipCode: {
            required,
            minLength: minLength(3),
            unicodeAlphaNum
          },
          city: {
            required,
            unicodeAlpha
          },
          paymentMethod: {
            required
          }
        }
      }
    }
  },
  created () {
    this.$store.dispatch('themeCredit/fetchBanksCheckout', this.$store.state.cart.cartServerToken);
  },
  methods: {
    isShowPaymentMethod (method) {
      return this.assoc[this.type].includes(method.code) && !this.productsHasPreorder(method) && this.creditsIsAvailable(method) && this.isLiqpayEnabled(method)
    },
    creditsIsAvailable (method) {
      if (method.code === 'credit') {
        return !!this.getBanks.length
      }
      return true
    },
    onPaymentMethodChange () {
      this.$v.payment.paymentMethod.$touch()
      this.changePaymentMethod()
      this.sendDataToCheckout()
    },
    placeOrder () {
      if (this.payment.paymentMethod === 'credit') {
        this.$refs.creditMethod[0].$refs.creditForm.$v.$touch()
        if (this.payment.paymentMethod === 'credit' && this.$refs.creditMethod[0].$refs.creditForm.$v.$error) {
          return
        }
        this.$store.state.themeCredit.creditDetails = { ...this.$refs.creditMethod[0].$refs.creditForm.form }
      }
      this.$bus.$emit('checkout-before-placeOrder')
    },
    productsHasPreorder (method) {
      return this.productsInCart.some(it => !!it.preorder) && method.code === 'liqpaymagento_liqpay'
    },
    isLiqpayEnabled (method) {
      if (
        method.code === 'liqpaymagento_liqpay' &&
        (
          !config.liqpay_enabled.liqpay ||
          (this.productsInCart.find(product => !!product.marketplace) && !config.liqpay_enabled.liqpay_marketplace)
        )
      ) { return false }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bootstrap';
.note-right {
  @media (max-width: 360px) {
    min-width: 100%;
    margin-top: 18px;
    margin-left: -2px;
  }
  svg {
    @media (max-width: 575px) {
      margin-right: 14px;
    }
    margin-right: 12px;
  }
  margin-left: auto;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  display: flex;
  align-items: center;
  text-align: right;
  text-transform: uppercase;
  color: #5F5E5E;
}
.mobile-data {
  display: none;
  .button-pay {
    max-width: 204px;
  }
  .payment-card {
    .radioStyled {
      padding: 16px 0;
      flex-direction: column !important;
    }
  }
}
.radio-input-row {
  @media (max-width: 575px) {
    flex-wrap: wrap;
  }
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  input[type=radio] {
    height: 20px;
  }
  .checkmark {
    margin-bottom: 0;
    margin-right: 16px;
  }
}
.credit-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  &-wrapper {
    width: 100%;
    padding: 16px 16px 0;
    cursor: default;
  }
  .block-title {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
    display: block;
    margin-bottom: 16px;
    text-align: left;
  }
  .label {
    display: flex;
    align-items: center;
    color: #595858;
    font-family: DIN Pro;
    font-style: normal;
    font-size: 13px;
    line-height: 16px;
    margin-bottom: 12px;

    .form-label {
      text-align: left;
    }

    form {
      width: 100%;
      display: flex;
      flex-direction: column;

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        margin: 0;
      }
    }

    .radioStyled.disabled {
      opacity: 0.55;
    }

    .button-pay {
      max-width: 204px;
      margin-bottom: 16px;
    }
  }
  .summary-price {
    display: flex;
    justify-content: space-between;
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: #1a1919;
  }
  .payment-methods {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    margin-bottom: 30px;
  }
  .payment-card {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button-pay {
    max-width: 131px;
  }
  .label {
    display: flex;
    align-items: center;
    color: #5F5E5E;
    font-family: DIN Pro;
    font-style: normal;
    font-size: 13px;
    line-height: 16px;
    margin-bottom: 12px;
    &--highlighted {
      color: #23BE20;
    }
  }
  @media (max-width: 960px) {
    .subtitle {
      &.disabled {
        display: none;
      }
    }
    .summary-price {
      margin-bottom: 24px;
    }
    .promo-code {
      margin-bottom: 24px;
    }
    .payment-methods {
      grid-template-columns: 1fr 1fr;
      margin-bottom: 0;
    }
    .mobile-data {
      display: block;
    }
    .payment-body {
      padding-bottom: 16px;
      border-bottom: 1px solid #E0E0E0;
      margin-bottom: 16px;
    }
    .button-pay {
      max-width: 131px;
      margin-bottom: 16px;
    }
  }
  @media (max-width: 460px) {
    .payment-methods {
      grid-template-columns: 1fr;
    }
    #checkout {
      .radioStyled {
        flex-direction: column !important;
        justify-content: center;
        padding: 12px 20px;
        .checkmark {
          margin-bottom: 0;
          margin-right: 20px;
        }
      }
    }
    .button-pay ::v-deep {
      max-width: 100%;
      button {
        max-width: 100%;
      }
    }
  }
}
.credit-block-wrapper{
  order: -1;
}
</style>
