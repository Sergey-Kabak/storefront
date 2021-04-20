<template>
  <div class="credit">
    <current-credit />
    <credit-rule v-if="isExtraItemsPart" />
    <credit-form v-if="selectedPayment.code === 'credit' && (alertStatus.class === 'success' || !isExtraItemsPart)" ref="creditForm" />
    <div class="flex w-100" v-if="alertStatus.class === 'success'">
      <payment-button :method="placeOrder"/>
    </div>
  </div>
</template>

<script>
import CreditForm from './CreditForm';
import CurrentCredit from './CurrentCredit';
import CreditRule from './CreditRule';
import ButtonFull from 'theme/components/theme/ButtonFull'
import { price } from 'theme/helpers'
import mixin from './mixin'
import { mapState } from 'vuex'
import PaymentButton from '../Payment/PaymentButton';
export default {
  name: 'CreditMethod',
  mixins: [mixin],
  components: {
    CreditForm,
    CurrentCredit,
    CreditRule,
    ButtonFull,
    PaymentButton
  },
  computed: {
    ...mapState({
      last_order_confirmation: (state) => state.order.last_order_confirmation,
      orderId: (state) => state.order.last_order_confirmation && state.order.last_order_confirmation.confirmation && state.order.last_order_confirmation.confirmation.orderNumber
    })
  },
  beforeMount () {
    this.$bus.$on('order-after-placed', this.orderAfterPlaced)
  },
  beforeDestroy () {
    this.$bus.$off('order-after-placed', this.orderAfterPlaced);
  },
  methods: {
    async orderAfterPlaced () {
      if (this.$store.getters['themeCredit/getPartPaymentData'] && this.$store.state.themeCredit.selectedBank.bank_code === 'privat') {
        this.$bus.$off('order-after-placed');
        const result = await this.$store.dispatch('themeCredit/sendPartPayment', { orderNumber: this.orderId });
        if (result.state === 'SUCCESS') {
          location.href = 'https://payparts2.privatbank.ua/ipp/v2/payment?token=' + result.token
        }
      }
    },
    placeCreditOrder () {
      this.$refs.creditForm.$v.$touch()
      if (this.$refs.creditForm.$v.$error) {
        return
      }
      this.$store.state.themeCredit.creditDetails = { ...this.$refs.creditForm.form }
      this.$bus.$emit('checkout-before-placeOrder')
    },
    placePayPartsOrder () {
      const products = this.productsInCart.map(product => {
        return {
          name: product.name,
          count: product.qty,
          price: price(product).toFixed(2)
        }
      })
      const marketplace = this.productsInCart.some(it => !!it.marketplace)
      const data = {
        amount: this.totals.find(it => it.code === 'grand_total').value.toFixed(2),
        partsCount: +this.selectedCredit.terms,
        merchantType: 'PP',
        products,
        redirectUrl: location.origin + '/thank-you-page?cartId=' + this.$store.state.cart.cartServerToken + '&marketplace=' + marketplace
      }
      this.$store.commit('themeCredit/SET_PART_PAYMENT', data)
      this.$bus.$emit('checkout-before-placeOrder')
    },
    placeOrder () {
      this.selectedPayment.code === 'credit' ? this.placeCreditOrder() : this.placePayPartsOrder()
    }
  }
}
</script>
<style lang="scss" scoped>
.credit {
  padding: 16px;
}
.place-order {
  display: flex;
  justify-content: space-between;
  padding: 16px 0px;
}

.place-order-text {
  margin-right: 24px;
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
}

.link {
  border-bottom: 1px solid #1A1919;
}

.submit {
  max-width: 195px;
}
</style>
