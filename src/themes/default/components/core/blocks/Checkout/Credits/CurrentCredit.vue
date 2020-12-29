<template>
  <div class="credit-product-wrapper">
    <div class="credit-product">
      <div class="credit-product-name">
        {{getSelectedBank.name}}
      </div>
      <div @click="showCreditPopup()" class="align-right underline cursor">
        {{ $t('Edit') }}
      </div>
    </div>
    <div class="credit-info">
      <span>{{ $t('First installment') }} {{ creditProduct.monthly_payment | price(storeView) }},
        {{$tc(`{count} payment` , creditProduct.number_of_payments)}}</span>
      <div class="inline"><b>по</b> <strong>{{ creditProduct.monthly_payment | price(storeView) }}</strong> <b>/ {{$t('short month')}}</b></div>
    </div>
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { mapGetters, mapMutations, mapState } from 'vuex'
import totalAmount from '../../../../../mixins/cart/totalAmount';
import * as types from '../../../../../store/credit/mutation-types';
export default {
  mixins: [totalAmount],
  mounted () {
    console.log(this.$route.name === 'checkout' && this.shippingType === 'new_post' && this.getBanks.length)
    this.PayPartsOnly()
  },
  computed: {
    ...mapState({
      shippingType: state => state.customShipping.type
    }),
    ...mapGetters({
      productsInCart: 'cart/getCartItems',
      selectedCredit: 'themeCredit/getSelectedCredit',
      getSelectedBank: 'themeCredit/getSelectedBank',
      getBanks: 'themeCredit/getBanks',
      totals: 'cart/getTotals'
    }),
    totalPrice () {
      return this.totals.find(code => code.code === 'grand_total').value
    },
    storeView () {
      return currentStoreView()
    },
    creditProduct () {
      return {
        number_of_payments: +this.selectedCredit.terms,
        monthly_payment: this.productsInCart.reduce((acc, it) => acc += (this.finalPrice(it) / +this.selectedCredit.terms) * it.qty, 0)
      }
    }
  },
  methods: {
    showCreditPopup () {
      this.$bus.$emit('modal-show', 'modal-credits')
    },
    PayPartsOnly () {
      if (this.$route.name === 'checkout' && this.shippingType === 'new_post' && this.getBanks.length) {
        const banks = this.getBanks.map(bank => {
          if (bank.credits.some(it => !+it.liqpay_allowed)) {
            return { ...bank, visible: false }
          }
          return { ...bank, visible: true }
        })
        this.$store.state.themeCredit.selectedBank = banks.find(bank => bank.visible)
        this.$store.state.themeCredit.selectedCredit = banks.find(bank => bank.visible).credits[0]
        console.log(this.selectedCredit);
        console.log(this.getSelectedBank);
        console.log(banks.find(bank => bank.visible));
        console.log(banks.find(bank => bank.visible).credits[0]);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.inline{
  display: inline-block;
}
  .credit-product{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 11px;
    &-wrapper{
      @media (max-width: 575px){
        width: calc(100% + 32px);
        margin-left: -16px;
      }
      box-sizing: border-box;
      background: #E4F9E4;
      border-radius: 4px;
      padding: 18px 16px;
      margin-bottom: 32px;
      width: 100%;
      user-select: text;
    }
    &-name{
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 0;
      font-size: 15px;
      line-height: 24px;
      color: #1A1919;
    }
    .align-right{
      margin-left: auto;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 0;
      font-size: 13px;
      line-height: 16px;
      color: #1A1919;
      padding-bottom: 4px;
      border-bottom: 1px dashed #1A1919;
    }
    .cursor{
      cursor: pointer;
    }
  }
  .credit-info{
    text-align: left;
    span{
      font-family: DIN Pro;
      font-weight: 700;
      font-size: 13px;
      line-height: 16px;
      color: #5F5E5E;
    }
    b{
      font-family: DIN Pro;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      color: #1A1919;
    }
    strong{
      font-family: DIN Pro;
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
      color: #1A1919;
    }
  }
</style>
