<template>
  <div class="payment">
    <div class="subtitle" :class="{ 'disabled': activeSection.personalDetails }">
      <div class="number-block" :class="{ 'checked': !activeSection.payment }">
        <div class="number align-center" v-if="activeSection.payment || activeSection.personalDetails">3</div>
        <img src='/assets/custom/Check.svg' v-else alt="correct">
      </div>
      <div class="subtitle-text">{{ $t('the Payment') }}:</div>
      <div class="lh30 flex end-lg ml-auto" v-if="activeSection.orderReview">
        <span class="edit" @click.prevent="$bus.$emit('checkout-before-edit', 'payment')">{{ $t('Edit') }}</span>
      </div>
    </div>
    <div v-if="isActive && activeSection.payment" class="payment-methods">
      <div class="payment-card" v-for="(method, index) in paymentMethods" :key="index" v-if="isShowPaymentMethod(method)">
        <label class="radioStyled"> {{ method.title ? method.title : method.name }}
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
      <span class="validation-error" v-if="!$v.payment.paymentMethod.required">{{ $t('Field is required') }}</span>
    </div>
    <div v-show="isActive">
      <LiqPay v-if="payment.paymentMethod === 'liqpaymagento_liqpay'" />
      <button-full
        v-else
        @click.native="placeOrder()"
        data-testid="paymentSubmit"
        :disabled="$v.payment.$invalid"
      >
        {{ $t('Next') }}
      </button-full>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { unicodeAlpha, unicodeAlphaNum } from '@vue-storefront/core/helpers/validators'
import { Payment } from '@vue-storefront/core/modules/checkout/components/Payment'

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

  .payment-methods {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 30px;
  }
</style>
