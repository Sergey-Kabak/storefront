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
      <div class="label">
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
                <credit-products :banks="getBanks" :totalPrice="totals.find(code => code.code === 'grand_total').value" />
                <form class="w-100">
                  <div class="block-title">
                    {{ $t('Loan processing')}}
                  </div>
                  <div class="form-row">
                    <div class="form-column">
                      <div class="form-label">
                        {{ $t('FIO') }}
                      </div>
                    </div>
                    <div class="form-column">
                      <div class="form-field">
                        <base-input
                          class="custom-input"
                          :class="{ error: $v.creditDetails.surname.$error && $v.creditDetails.surname.$dirty }"
                          type="text"
                          :autofocus="true"
                          name="surname"
                          :placeholder="$t('Last name')"
                          v-model.trim="$v.creditDetails.surname.$model"
                          @blur="$v.creditDetails.surname.$touch()"
                          autocomplete="given-name"
                          :validations="[
                          {
                            condition: $v.creditDetails.surname.$error && !$v.creditDetails.surname.required && $v.creditDetails.surname.$dirty,
                            text: $t('Field is required')
                          },
                        ]"
                        />
                      </div>
                      <div class="form-field">
                        <base-input
                          class="custom-input"
                          :class="{ error: $v.creditDetails.name.$error && $v.creditDetails.name.$dirty }"
                          type="text"
                          :autofocus="true"
                          name="name"
                          :placeholder="$t('First name')"
                          v-model.trim="$v.creditDetails.name.$model"
                          @blur="$v.creditDetails.name.$touch()"
                          autocomplete="given-name"
                          :validations="[
                          {
                            condition: $v.creditDetails.name.$error && !$v.creditDetails.name.required && $v.creditDetails.name.$dirty,
                            text: $t('Field is required')
                          },
                        ]"
                        />
                      </div>
                      <div class="form-field">
                        <base-input
                          class="custom-input"
                          :class="{ error: $v.creditDetails.last_name.$error && $v.creditDetails.last_name.$dirty }"
                          type="text"
                          :autofocus="true"
                          name="last_name"
                          :placeholder="$t('surname')"
                          v-model.trim="$v.creditDetails.last_name.$model"
                          @blur="$v.creditDetails.last_name.$touch()"
                          autocomplete="given-name"
                          :validations="[
                          {
                            condition: $v.creditDetails.last_name.$error && !$v.creditDetails.last_name.required && $v.creditDetails.last_name.$dirty,
                            text: $t('Field is required')
                          },
                        ]"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-column">
                      <div class="form-label">
                        {{ $t('date of birth') }}
                      </div>
                    </div>
                    <div class="form-column">
                      <div class="form-label">
                        {{$v.creditDetails.date_of_birth.$model}}
                        <base-datepicker-checkout
                          v-model="$v.creditDetails.date_of_birth.$model" />
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-column">
                      <div class="form-label">
                        {{ $t('INN') }}
                      </div>
                    </div>
                    <div class="form-column">
                      <div class="form-label">
                        <base-input
                          class="custom-input inn-input"
                          :class="{ error: $v.creditDetails.identification_code.$error && $v.creditDetails.identification_code.$dirty }"
                          type="number"
                          :autofocus="true"
                          name="last_name"
                          :placeholder="$t('INN')"
                          v-model.trim="$v.creditDetails.identification_code.$model"
                          @blur="$v.creditDetails.identification_code.$touch()"
                          autocomplete="given-name"
                          :validations="[
                          {
                            condition: $v.creditDetails.identification_code.$error && !$v.creditDetails.identification_code.required && $v.creditDetails.identification_code.$dirty,
                            text: $t('Field is required')
                          },
                        ]"
                        />
                      </div>
                    </div>
                  </div>
                </form>
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
      <LiqPay class="button-pay" v-if="payment.paymentMethod === 'liqpaymagento_liqpay'" />
      <button-full
        v-else
        @click.native="placeOrder()"
        data-testid="paymentSubmit"
        :disabled="$v.payment.$invalid"
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
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput';
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect';
import ButtonFull from 'theme/components/theme/ButtonFull';
import Tooltip from 'theme/components/core/Tooltip';
import LiqPay from 'src/modules/payment-liqpay/components/Liqpay';
import TotalPrice from 'theme/components/core/TotalPrice';
import CreditProducts from './CreditProducts';
import BaseDatepickerCheckout from '../Form/BaseDatepickerCheckout';
const lettersOnly = value => (
  /^[\u0400-\u04FF]+$/.test(value) ||
  /^[a-zA-Zа-яА-Я]+$/.test(value) ||
  value === ""
);

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
    PromoCode,
    TotalPrice,
    CreditProducts,
    BaseDatepickerCheckout
  },
  mixins: [Payment],
  data: () => ({
    isShowPromocode: false
  }),
  watch: {
    'payment.paymentMethods': {
      handler: function (after, before) {
        this.sendDataToCheckout()
      },
      deep: true
    },
    productsInCart: function (products) {
      this.$store.dispatch('themeCredit/fetchBanksCheckout', this.$store.state.cart.cartServerToken)
    }
  },
  computed: {
    ...mapGetters({
      totals: 'cart/getTotals',
      getCartToken: 'cart/getCartToken',
      getBanks: 'themeCredit/getBanks'
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
    },
  },
  validations () {
    if (!this.generateInvoice) {
      return {
        creditDetails: {
          surname: {
            required,
            minLength: minLength(2),
            lettersOnly
          },
          name: {
            required,
            minLength: minLength(2),
            lettersOnly
          },
          last_name: {
            required,
            minLength: minLength(2),
            lettersOnly
          },
          date_of_birth: {
            required
          },
          identification_code: {
            required,
            minLength: minLength(10)
          }
        },
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
  methods: {
    isShowPaymentMethod (method) {
      return this.assoc[this.type].includes(method.code) && !this.productsHasPreorder(method) && this.creditsIsAvailable(method)
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
      console.log(this.payment.paymentMethod);
      this.$v.creditDetails.$touch()
      if (this.payment.paymentMethod === 'credit') {
        this.$v.creditDetails.$touch();
        console.log(this.$v.creditDetails.$error);
        if (this.$v.creditDetails.$error) return false
      }
      this.$bus.$emit('checkout-before-placeOrder')
    },
    productsHasPreorder (method) {
      return this.productsInCart.some(it => !!it.preorder) && method.code === 'liqpaymagento_liqpay'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~bootstrap';
  .inn-input{
    width: 100%;
    /deep/ input[type=number]{
      width: 100%;
    }
  }
  .form-row{
    justify-content: space-between;
  }
  .form-column:last-child{
    max-width: 312px;
    width: 100%;
  }
  /deep/ .date-picker.mx-datepicker{
    width: 100%;
    height: 4.5rem;
    input{
      height: 40px;
      box-shadow: none;
      border-color: #bdbdbd;
      padding-left: 15px;
      font-size: 13px;
      color: #1A1919;
      &::placeholder{
        color: #999;
        font-size: 13px;
      }
    }
  }
  /deep/ .base-input{
    input{
      border-style: solid;
      border-width: 1px;
      border-radius: 4px;
      font-size: 13px;
      color: #1A1919;
      line-height: 16px;
    }
    label{
      background: #fff;
      padding: 0 5px;
      margin-left: -5px;
    }
  }
  .note-right{
    svg{
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
  }
  .payment-card{
    .radioStyled {
      padding: 16px 0;
      flex-direction: column !important;
    }
  }
  .radio-input-row{
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 16px;
    input[type=radio]{
      height: 20px;
    }
    .checkmark{
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
  }
</style>
