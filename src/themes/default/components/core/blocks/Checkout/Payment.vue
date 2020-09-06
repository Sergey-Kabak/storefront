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
          <label class="radioStyled" :class="{'active': payment_system === method.code}">
            <div class="radioStyled-header">
              <div class="radioStyled-header-title" @click="setPaymentSystemIsActive(method.code)">
                <span
                  @click="setPaymentSystemIsActive(method.code)"
                  class="checkmark"
                  :class="{'is-active': payment_system === method.code}"
                >
                  <span
                    @click="setPaymentSystemIsActive(method.code)"
                    v-if="payment_system ===  method.code"
                    class="checkmark-active" />
                </span>
                <input
                  type="radio"
                  :value="method.code"
                  name="payment-method"
                  v-model="payment.paymentMethod"
                  @change="onPaymentMethodChange()"
                >
                <span>{{ method.title ? $t(method.title) : $t(method.name) }}</span>
              </div>
            </div>
          </label>
        </div>
        <div class="payment-credit">
          <label class="radioStyled" :class="{'active': payment_system === 'credit'}">
            <div class="radioStyled-header">
              <div class="radioStyled-header-title" @click="setPaymentSystemIsActive('credit')">

                <span
                  @click="setPaymentSystemIsActive('credit')"
                  class="checkmark"
                  :class="{'is-active': payment_system === 'credit'}"
                >
                  <span @click="setPaymentSystemIsActive('credit')" v-if="payment_system === 'credit'" class="checkmark-active" />
                </span>

                <input
                  type="radio"
                  name="payment-method"
                >
                {{ $t('Credit or installments') }}
              </div>
              <div class="radioStyled-header-optional">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="#EE2C39"/>
                </svg>
                <span>{{ $t('only for pickup') }}</span>
              </div>
            </div>
            <div class="radioStyled-body" v-if="payment_system === 'credit'">
              <div class="radioStyled-body-label">
                {{ $t('Credit offer') }}
              </div>
              <div class="radioStyled-body-credit-info">
                <div class="radioStyled-body-credit-info-header">
                  <div class="radioStyled-body-credit-info-header-title">

                    <span
                      @click="setPaymentSystemIsActive('credit')"
                      class="checkmark"
                      :class="{'is-active': payment_system === 'credit'}"
                    >
                      <span @click="setPaymentSystemIsActive('credit')" v-if="payment_system === 'credit'" class="checkmark-active" />
                    </span>

                    <span>{{ getCurrentCreditBank.name }}</span>

                    <svg v-if="getCurrentCreditBank.icon === 'standard.png'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.5301 15.152C14.2921 15.0736 14.0272 15.1549 13.8761 15.3574C13.7897 15.473 13.7125 15.5955 13.6478 15.7185C12.6219 15.0879 11.3288 15.0965 10.3601 15.7167C10.292 15.5874 10.2119 15.4575 10.1084 15.3328C9.94984 15.144 9.69068 15.0736 9.45834 15.1572C9.2266 15.2413 9.07211 15.4616 9.07211 15.7081V21.4138C9.07211 21.6169 9.17738 21.8052 9.35018 21.9121C9.52127 22.0191 9.73696 22.0271 9.92008 21.9379L12.0017 20.8971L14.0832 21.9379C14.2687 22.0299 14.484 22.0173 14.6531 21.9121C14.8259 21.8052 14.9312 21.6169 14.9312 21.4138V15.7081C14.9312 15.4558 14.7699 15.2321 14.5301 15.152ZM12.0017 4.32983C9.09391 4.32983 6.72852 6.69523 6.72852 9.60301C6.72852 12.5108 9.09391 14.8762 12.0017 14.8762C14.9095 14.8762 17.2749 12.5108 17.2749 9.60301C17.2749 6.69523 14.9095 4.32983 12.0017 4.32983ZM13.384 11.4964L12.0017 10.7834L10.6222 11.5067L10.8842 9.97495L9.76903 8.88207L11.3133 8.64861L12.004 7.2611L12.69 8.64861L14.2269 8.88149L13.1191 9.97491L13.384 11.4964Z" fill="url(#paint0_linear)"/>
                      <path d="M19.2089 10.7634C18.6815 10.0486 18.6815 9.15801 19.2323 8.43148L19.5018 8.0565C19.7065 7.74933 19.5915 7.32154 19.2557 7.17764L18.8338 6.99011C18.0136 6.63856 17.5682 5.87692 17.6737 4.97462L17.7206 4.52933C17.7454 4.15775 17.4505 3.85983 17.0761 3.88483L16.6191 3.9317C15.7753 4.03721 14.9668 3.58016 14.6035 2.78336L14.4278 2.36151C14.2694 1.99199 13.8465 1.9052 13.5489 2.10367L13.1622 2.3849C12.4708 2.91222 11.5451 2.9005 10.8303 2.3849L10.467 2.11543C10.2063 1.91985 9.77093 1.96075 9.57641 2.34979L9.38895 2.78336C9.096 3.49813 8.41631 3.94346 7.61951 3.94346C7.40272 3.94346 7.49436 3.93924 6.93982 3.88487C6.56827 3.86007 6.27036 4.15501 6.29532 4.52937L6.34215 4.98638C6.44765 5.85352 5.97889 6.65036 5.18205 7.00187L4.7602 7.17768C4.37908 7.34099 4.30522 7.79359 4.50236 8.05654L4.78367 8.44324C5.31095 9.13457 5.32267 10.0604 4.79531 10.7752L4.52583 11.1384C4.3067 11.4307 4.40763 11.8528 4.7602 12.029L5.19377 12.2165C6.00232 12.5562 6.43589 13.318 6.33039 14.2203L6.28356 14.6656C6.25864 15.0391 6.55577 15.3349 6.92806 15.3101L7.38507 15.2632C8.09988 15.1812 8.76781 15.4625 9.2131 16.0835C9.36727 16.2891 9.52848 16.7262 9.57637 16.8335C9.73968 17.2146 10.1923 17.2884 10.4552 17.0913L10.842 16.81C11.5217 16.2827 12.4591 16.2944 13.1739 16.81C13.4993 17.0248 13.5909 17.1967 13.8887 17.1967C14.0889 17.1967 14.3123 17.0761 14.4278 16.8452C14.5691 16.53 14.6622 16.2558 14.8145 16.0601C14.8379 16.0366 14.8496 16.0131 14.8613 15.978C15.2129 15.521 15.7753 15.2515 16.3964 15.2515C16.5976 15.2515 16.5189 15.2566 17.0644 15.3101C17.4105 15.3349 17.7351 15.0597 17.7089 14.6656L17.662 14.1969C17.5565 13.318 18.0018 12.568 18.8338 12.193L19.2439 12.0173C19.5603 11.8817 19.7125 11.4651 19.4783 11.1267L19.2089 10.7634ZM12.0021 14.2906C9.41239 14.2906 7.31488 12.193 7.31488 9.6033C7.31488 7.01355 9.41239 4.91603 12.0021 4.91603C14.5919 4.91603 16.6894 7.01355 16.6894 9.6033C16.6894 12.193 14.5919 14.2906 12.0021 14.2906ZM14.3223 8.30258L13.0802 8.11505L12.5295 7.00183C12.3303 6.60345 11.674 6.60345 11.4748 7.00183L10.9241 8.11505L9.68195 8.30258C9.47102 8.3377 9.28349 8.49004 9.21318 8.70096C9.14287 8.91189 9.20146 9.13454 9.36552 9.29859L10.2561 10.1775L10.0452 11.4079C10.01 11.6188 10.1038 11.8414 10.2795 11.9703C10.4553 12.0993 10.7014 12.1226 10.8888 12.0172L12.0021 11.443L13.1153 12.0172C13.2924 12.1183 13.536 12.117 13.7246 11.9703C13.9004 11.8414 13.9942 11.6188 13.959 11.4079L13.748 10.1775L14.6386 9.29859C14.8027 9.1345 14.8613 8.91189 14.791 8.70096C14.7206 8.49004 14.5332 8.33774 14.3223 8.30258Z" fill="url(#paint1_linear)"/>
                      <defs>
                        <linearGradient id="paint0_linear" x1="12.0017" y1="21.9997" x2="12.0017" y2="4.32983" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#FF5B66"/>
                          <stop offset="1" stop-color="#FFCACD"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear" x1="12.0001" y1="17.1971" x2="12.0001" y2="1.99996" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#EE2C39"/>
                          <stop offset="1" stop-color="#FF5B66"/>
                        </linearGradient>
                      </defs>
                    </svg>

                    <img v-if="getCurrentCreditBank.icon !== 'standard.png'" :src="'assets/banks/' + getCurrentCreditBank.icon" alt="Credit Bank Logo">

                  </div>
                  <div
                    class="radioStyled-body-credit-info-header-optional"
                    @click.prevent="$bus.$emit('modal-show', 'modal-credits')"
                  >
                    {{ $t('Edit') }}
                  </div>
                </div>
                <div class="radioStyled-body-credit-info-body">
                  <span class="radioStyled-body-credit-info-body-dark-text">
                    {{ $t('First installment') }} {{ getCurrentCreditBank.first_installment }} ₴, {{ $t('and') }}
                    {{ getCurrentCreditBank.first_installment > 0 ? getCurrentCreditBank.number_of_payments - 1 : getCurrentCreditBank.number_of_payments}}
                    {{ getCurrentCreditBank.number_of_payments - 1 === 1 ? $t('payment') : '' }}
                    {{ getCurrentCreditBank.number_of_payments - 1 === 0 && getCurrentCreditBank.number_of_payments > 4 ? $t('the payments') : '' }}
                    {{ getCurrentCreditBank.number_of_payments - 1 > 1 && getCurrentCreditBank.number_of_payments < 5 ? $t('a payment') : '' }} </span>
                  <span class="radioStyled-body-credit-info-body-black-text">по <span>{{ getCurrentCreditBank.monthly_payment }} ₴</span> / мес</span>
                </div>
              </div>
              <div class="radioStyled-body-label">
                {{ $t('Loan processing') }}
              </div>

              <div class="credit-field-section">
                <div class="credit-field">
                  <span class="credit-field-label">Имя</span>
                </div>
                <div class="credit-field">
                  <input type="text" class="credit-field-input" placeholder="Имя*">
                  <input type="text" class="credit-field-input" placeholder="Фамилия*">
                  <input type="text" class="credit-field-input" placeholder="Отчество*">
                </div>
              </div>

              <div class="credit-field-section">
                <div class="credit-field">
                  <span class="credit-field-label">Дата рождения</span>
                </div>
                <div class="credit-field">
                  <input type="date" class="credit-field-input" placeholder="ДД/ММ/ГГГГ*">
                </div>
              </div>

              <div class="credit-field-section">
                <div class="credit-field">
                  <span class="credit-field-label">ИНН</span>
                </div>
                <div class="credit-field">
                  <input type="text" class="credit-field-input" placeholder="XX XX XX XX XX*">
                </div>
              </div>

            </div>
          </label>
        </div>
      </div>
      <span class="validation-error" v-if="!$v.payment.paymentMethod.required">{{ $t('Field is required') }}</span>
    </div>
    <div class="mobile-data" v-show="isActive">
      <promo-code class="promo-code"/>
      <div class="summary-price">
        <span>{{ $t('Grand total') }}:</span>
        {{ totalPrice | price(storeView) }}
      </div>
    </div>
    <div class="bottom-block" v-show="isActive">
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
  data () {
    return {
      'payment_system': 'cashondelivery'
    }
  },
  mounted() {},
  computed: {
    ...mapGetters({
      totals: 'cart/getTotals',
      credit_banks: 'themeCredit/getBanks',
      credit_selected_bank: 'themeCredit/getSelectedBank',
    }),
    getCurrentCreditBank() {
      if (this.credit_banks !== undefined && this.credit_banks.length > 0) {
        return this.credit_banks[this.credit_selected_bank]
      }
      return null;
    },
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
    setPaymentSystemIsActive(code) {
      this.payment_system = code;
    },
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

  .bottom-block {
    margin-bottom: 25px;
  }

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
    /*grid-template-columns: 1fr 1fr 1fr;*/
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
      /*color: #23BE20;*/
    }
  }

  .radioStyled {

    display: block;
    border: none;
    padding: 18px !important;
    flex-direction: column !important;
    border: 1px solid #e0e0e0;

    &-body {

      .credit-field-section {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        margin: 0;
        padding: 0;
        flex-direction: row;

        .credit-field {
          flex: 1 0;
          width: 50%;
          padding: 0;
          text-align: left;

          &-label {
            font-family: DIN Pro;
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 16px;
            color: #5F5E5E;
          }

          &-input {
            background: #FFFFFF !important;
            border: 1px solid #E0E0E0 !important;
            box-sizing: border-box !important;
            border-radius: 4px !important;
            opacity: 1 !important;
            position: relative !important;
            cursor: pointer !important;
            width: 100%;
            margin-bottom: 20px;
            padding: 16px;
          }
        }
      }

      &-label {
        margin: 16px 0;
        text-align: left;
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 16px;
        color: #1A1919;
      }

      &-credit-info {
        background-color: #E4F9E4;
        padding: 18px;
        border-radius: 4px;

        &-body {
          text-align: left;
          margin-top: 20px;
          &-dark-text {
            font-family: DIN Pro;
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 16px;
            color: #5F5E5E;
          }
          &-black-text {
            font-family: DIN Pro;
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 16px;
            color: #1A1919;
          }

          &-big-black-text {
            font-size: 24px;
            line-height: 30px;
          }
        }

        &-header {
          display: flex;
          justify-content: space-between;

          &-title {
            display: flex;
            align-items: center;

            svg {
              margin-left: 10px;
            }

            img {
              margin-left: 10px;
              max-height: 20px;
              max-width: 20px;
            }
          }

          &-optional {
            display: flex;
            align-items: center;
            border-bottom: 1px dashed #1A1919;

            &:hover {
              border-bottom: 1px dashed #3d3a3a;
              color: #3d3a3a;
              cursor: pointer;
            }
          }
        }
      }
    }

    &-header {
      flex-direction: row !important;
      justify-content: space-between;
      /*padding: 20px !important;*/
      display: flex;
      width: 100%;

      &-title {
        display: flex;
        align-items: center;
      }

      &-optional {
        display: flex;
        align-items: center;

        span {
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 13px;
          text-transform: uppercase;
          color: #5F5E5E;
          margin-left: 20px;
        }
      }
    }

    &.active {
      border: 1px solid #23BE20;
    }

  }

  .checkmark {
    margin: 0 16px 0 0 !important;
    display: block;
    border: 2px solid #E0E0E0;

    &-active {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 12px;
      height: 12px;
      background-color: #22be21;
      border-radius: 50%;
    }

    &.is-active {
      border: 2px solid #23be20;
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
      grid-template-columns: 1fr;
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
