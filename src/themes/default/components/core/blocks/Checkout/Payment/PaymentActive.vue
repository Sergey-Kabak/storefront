<template>
  <div class="payment active">
    <div class="title">
      <span>3. {{ $t("the Payment") }}</span>
    </div>
    <radio-button
      v-for="payment in methods"
      :key="payment.code"
      :label="payment.code"
      :value="selectedPayment.code"
      @change="setActivePaymentMethod($event)"
      :showDefaultButton="false"
      :class="{ 'active': payment.code === selectedPayment.code }"
      class="payment-radio"
    >
      <template v-slot:default="slotProps">
        <div class="payment-item">
          <payment-radio :payment="payment" :active="slotProps.active" />
          <transition name="slide" mode="out-in">
            <component v-if="slotProps.active" :is="payment.code"/>
          </transition>
        </div>
      </template>
    </radio-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import RadioButton from 'theme/components/core/blocks/Checkout/RadioButton';
import { Payment } from '@vue-storefront/core/modules/checkout/components/Payment';
import PaymentRadio from 'theme/components/core/blocks/Checkout/Payment/PaymentRadio';
import Credit from 'theme/components/core/blocks/Checkout/Credits/CreditMethod';
import Liqpay from 'src/modules/payment-liqpay/components/Liqpay.vue';
import PaymentButton from './PaymentButton';

export default {
  components: {
    RadioButton,
    PaymentRadio,
    'cashondelivery': PaymentButton,
    'credit': Credit,
    'temabit_payparts': Credit,
    'liqpaymagento_liqpay': Liqpay
  },
  mixins: [Payment],
  computed: {
    ...mapGetters({
      creditMethod: 'themeCredit/creditMethod',
      selectedCredit: 'themeCredit/getSelectedCredit',
      getPaypartsBanks: 'themeCredit/getPaypartsBanks',
      getCreditBanks: 'themeCredit/getCreditBanks'
    }),
    ...mapState({
      selectedPayment: (state) => state.checkoutPage.selectedPayment,
      selectedShipping: (state) => state.checkoutPage.selectedShipping
    }),
    methods () {
      const methods = {
        'cashondelivery': true,
        'liqpaymagento_liqpay': !['freeshipping'].includes(this.selectedShipping.method_code),
        'temabit_payparts': this.getPaypartsBanks.length,
        'credit': this.selectedShipping.method_code === 'freeshipping' && this.getCreditBanks.length
      }
      return this.paymentMethods.filter(it => {
        return methods[it.code]
      })
    }
  },
  methods: {
    onPaymentMethodChange () {
      this.changePaymentMethod()
      this.sendDataToCheckout()
    },
    setActivePaymentMethod (code) {
      const activePayment = this.paymentMethods.find(it => it.code === code)
      this.$bus.$emit('checkout-payment-method-changed', activePayment.code)
      this.$store.commit('checkoutPage/SET_SELECTED_PAYMENT', activePayment)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  border: 1px solid #E0E0E0;
  border-radius: 4px 4px 0 0;
  padding: 16px;
  border-bottom: transparent;

  span {
    font-family: DIN Pro;
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
    color: #1A1919;
  }
}

.payment-radio {
  .payment-item {
    border: 1px solid #E0E0E0;
    border-bottom: 1px solid transparent;
  }

  &:last-child {
    .payment-item {
      border-radius: 0 0 4px 4px;
      border-bottom: 1px solid #E0E0E0;
    }
  }

  &.active {
    .payment-item {
      border: 1px solid#23BE20;
    }

    & + .payment-radio {
      .payment-item {
        border-top: none
      }
    }
  }
}

.slide-enter-active {
  transition: opacity .2s, transform .3s;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
