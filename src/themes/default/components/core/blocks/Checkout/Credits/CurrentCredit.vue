<template>
  <div v-if="isCreditAvailable" class="credit-product-wrapper">
    <div class="credit-product">
      <div class="credit-product-name">
        {{getSelectedBank.name}}
      </div>

      <div @click="showCreditPopup()" class="align-right underline cursor">
        {{ $t('Edit') }}
      </div>
    </div>
    <div class="credit-info">
      <span>{{ $t('First installment') }} {{ isSingleCreditProduct.monthly_payment | price(storeView) }},
        {{$tc(`{count} payment` , isSingleCreditProduct.number_of_payments)}}</span>
      <div class="inline"><b>по</b> <strong>{{ isSingleCreditProduct.monthly_payment | price(storeView) }}</strong> <b>/ {{$t('short month')}}</b></div>
    </div>
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      isCreditAvailable: true,
      terms: 0
    }
  },
  computed: {
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
    isSingleCreditProduct () {
      if (this.isCreditAvailable) {
        return {
          number_of_payments: this.productsInCart.reduce((acc, it) => acc += +this.terms, 0),
          monthly_payment: this.productsInCart.reduce((acc, it) => acc += (it.price_incl_tax / +this.terms) * it.qty, 0)
        }
      }
    }
  },
  created () {
    if (this.productsInCart.length === 1 && this.productsInCart[0].credit) {
      this.terms = +this.productsInCart[0].credit.terms
      this.$store.dispatch('themeCredit/creditSetSelectedCredit', { credit: this.productsInCart[0].credit })
    } else {
      this.terms = +this.getSelectedBank.credits[0].terms
      this.$store.dispatch('themeCredit/creditSetSelectedCredit', { credit: this.getSelectedBank.credits[0] })
    }
  },
  methods: {
    showCreditPopup () {
      this.$bus.$emit('modal-show', 'modal-credits')
    }
  },
  watch: {
    selectedCredit: function (val) {
      this.terms = +val.terms
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
