<template>
  <div class="payment">
    <div class="subtitle" v-if="!activeSection.personalDetails" >
      <div class="number-block" :class="{ 'checked': !activeSection.payment }">
        <div class="number align-center" v-if="activeSection.payment || activeSection.personalDetails">3</div>
        <img src='/assets/custom/Check.svg' v-else alt="correct">
      </div>
      <div class="subtitle-text">{{ $t('the Payment') }}:</div>
      <div class="lh30 flex end-lg ml-auto" v-if="activeSection.orderReview">
        <span class="edit" @click.prevent="$bus.$emit('checkout-before-edit', 'payment')">{{ $t('Edit') }}</span>
      </div>
    </div>
    <div class="subtitle disabled" v-else>
      <div class="number-block">
        <div class="number align-center">3</div>
      </div>
      <div class="subtitle-text">{{ $t('the Payment') }}:</div>
    </div>
    <div v-if="isActive && activeSection.payment" class="payment-body">
      <div class="label">
        {{ $t('Payment method') }}
        <span class="label--highlighted">*</span>
      </div>
      <div class="payment-methods">
        <div class="payment-card" v-for="(method, index) in paymentMethods" :key="index" v-if="isShowPaymentMethod(method)">
          <label class="radioStyled"> {{ method.title ? $t(method.title) : $t(method.name) }}
            <input
              type="radio"
              :value="method.code"
              name="payment-method"
              v-model="payment.paymentMethod"
              @change="onPaymentMethodChange()"
            >
            <span class="checkmark" />
          </label>
        </div>
      </div>
      <span class="validation-error" v-if="!$v.payment.paymentMethod.required">{{ $t('Field is required') }}</span>
    </div>
    <div class="mobile-data" v-show="isActive">
      <promo-code class="promo-code"/>
      <div class="summary-price">
        <span>Всего:</span>
        {{ totalPrice | price(storeView) }}
      </div>
    </div>
    <div v-show="isActive">
      <LiqPay class="button-pay" v-if="payment.paymentMethod === 'liqpaymagento_liqpay'" />
      <button-full
        v-else
        @click.native="placeOrder()"
        data-testid="paymentSubmit"
        :disabled="$v.payment.$invalid"
        class="button-pay"
      >
        {{ $t('To pay') }}
      </button-full>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { unicodeAlpha, unicodeAlphaNum } from '@vue-storefront/core/helpers/validators'
import { Payment } from '@vue-storefront/core/modules/checkout/components/Payment'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import PromoCode from 'theme/components/core/blocks/Microcart/PromoCode'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Tooltip from 'theme/components/core/Tooltip'
import { mapState } from 'vuex'
import LiqPay from 'src/modules/payment-liqpay/components/Liqpay'

export default {
  props: {
    activeSection: {
      type: Object,
      required: true,
      default: false
    }
  },
  components: {
    BaseCheckbox,
    BaseInput,
    BaseSelect,
    ButtonFull,
    Tooltip,
    LiqPay,
    PromoCode
  },
  mixins: [Payment],
  watch: {
    'payment.paymentMethods': {
      handler: function (after, before) {
        this.sendDataToCheckout()
      },
      deep: true
    }
  },
  computed: {
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
      return this.$store.state.cart.cartItems.reduce((acc, it) => acc + it.price * it.qty, 0)
    },
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
  methods: {
    isShowPaymentMethod (method) {
      return this.assoc[this.type].includes(method.code)
    },
    onPaymentMethodChange () {
      this.$v.payment.paymentMethod.$touch()
      this.changePaymentMethod()
      this.sendDataToCheckout()
    },
    placeOrder () {
      this.$bus.$emit('checkout-before-placeOrder')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~bootstrap';

  .mobile-data {
    display: none;
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

  .number-block {
    &.disabled {
      margin-bottom: 0;
      opacity: .5;
      background-color: #ffffff;
    }
  }

  .payment-methods {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
        flex-direction: row-reverse;
        justify-content: center;
        padding: 12px 20px;

        .checkmark {
          margin-bottom: 0;
          margin-right: 20px;
        }
      }
    }

    .promo-code ::v-deep {
      .promo-code-button {
        max-width: 100px;
      }
    }

    .button-pay ::v-deep {
      max-width: 100%;
      button {
        max-width: 100%;
      }
    }
  }
</style>
