<template>
  <modal name="modal-credits" class="modal-credits" :width="900">
    <h3 slot="header" class="modal-credits_header align-center">
      {{ $t('Credit') }}
    </h3>
    <div slot="content" class="modal-credits_content">
      <div class="credit-card-block__row desctop_header head flex">
        <div>{{ $t('Suggestion') }}</div>
        <div>{{ $t('Monthly payment') }}, ₴</div>
        <div>{{ $t('Number of payments') }}</div>
        <div>{{ $t('grand_total') }}</div>
      </div>
      <div class="credit-card-block__wrap">
        <div v-for="(bank , index) in availableBanks" :key="index"
             :class="{'active' : selectedBank === index, 'credit-card-block__row flex h-center' : bank.visible}">
          <template v-if="bank.visible">
            <div class="credit-card-block__radio-wrap flex v-center">
              <div class="flex v-center">
                <base-radiobutton
                  :id="'bank' + index" name="bank" @change="setSelectedBank(index)"
                  :checked="selectedBank === index">{{ bank.name }}
                </base-radiobutton>
                <img :src="getThumbnail(bank.logo, 24, 24, 'credit')">
              </div>
            </div>
            <div >
              <div class="mobile-label">{{ $t('Monthly payment') }}, ₴</div>
              <span>{{getMonthlyPayment[index] | price(storeView)}}</span>
            </div>
            <div>
              <div class="mobile-label">{{ $t('Number of payments') }}</div>
              <custom-select
                :selected-index="0"
                :options="bank.credits.filter(el => !!el)"
                @bankProduct="selectedPaymentCount($event, index, bank)"/>
            </div>
            <div>
              <div class="mobile-label">{{ $t('grand_total') }}</div>
              <b class="grand-total">{{totalPrice | price(storeView)}}</b>
            </div>
          </template>
        </div>
      </div>

      <div class="credits-to-order flex">
        <span class="underline" @click="close()">{{ $t('Continue shopping') }}</span>
        <span @click="toCheckout()">
          <button-active class="ml30">
            {{ $t('Go to checkout') }}
          </button-active>
        </span>
      </div>
    </div>
  </modal>
</template>

<script>
import BaseRadiobutton from 'theme/components/core/blocks/Form/BaseRadiobutton'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'
import CustomSelect from 'theme/components/core/blocks/Form/CustomSelect'
import ButtonActive from 'theme/components/core/blocks/Product/ButtonActive'
import Modal from 'theme/components/core/Modal.vue'
import { mapState, mapGetters } from 'vuex'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'
import { price } from 'theme/helpers';

export default {
  components: {
    Modal,
    BaseRadiobutton,
    ButtonActive,
    CustomSelect,
    BaseInputNumber
  },
  data () {
    return {
      loading: false,
      selectedBank: 0,
      banks: [],
      selectedPositions: {},
      selectedCreditProduct: {}
    }
  },
  computed: {
    ...mapState({
      selectedPayment: (state) => state.checkoutPage.selectedPayment
    }),
    ...mapGetters({
      getBanks: 'themeCredit/getBanks',
      getCurrentProduct: 'product/getCurrentProduct',
      productsInCart: 'cart/getCartItems',
      totals: 'cart/getTotals',
      getPaypartsBanks: 'themeCredit/getPaypartsBanks',
      getCreditBanks: 'themeCredit/getCreditBanks'
    }),
    availableBanks () {
      if (this.$route.name === 'checkout') {
        return this.selectedPayment.code === 'credit' ? this.getCreditBanks : this.getPaypartsBanks
      }
      return this.getBanks
    },
    storeView () {
      return currentStoreView()
    },
    getMonthlyPayment () {
      return this.selectedPositions
    },
    getBankProduct () {
      return this.banks[this.selectedBank]
    },
    getCreditProduct () {
      return this.selectedCreditProduct[this.selectedBank]
    },
    totalPrice () {
      if (this.$route.name === 'checkout') {
        return this.totals.find(it => it.code === 'grand_total').value
      } else {
        return price(this.getCurrentProduct) * this.getCurrentProduct.qty
      }
    }
  },
  beforeMount () {
    this.initBanks(this.getBanks)
  },
  methods: {
    initBanks (banks) {
      this.selectedBank = 0;
      this.selectedPositions = {};
      this.selectedCreditProduct = {};
      this.banks = [];
      banks.forEach((bank, index) => {
        if (bank) {
          this.$set(this.selectedPositions, index, this.CalculateMontlyPayment(bank.credits[0]))
          this.$set(this.selectedCreditProduct, index, bank.credits[0])
          this.$set(this.banks, index, bank);
        }
      });
    },
    CalculateMontlyPayment (creditRule) {
      if (this.$route.name === 'checkout') {
        return this.productsInCart.reduce((acc, it) => acc += (price(it) / +creditRule.terms) * it.qty, 0)
      } else {
        return price(this.getCurrentProduct) / +creditRule.terms
      }
    },
    setBankAndCredit () {
      this.$store.commit('themeCredit/themeCredit/CREDIT_SET_SELECTED_BANK', { bank: this.getBankProduct })
      this.$store.commit('themeCredit/themeCredit/CREDIT_SET_SELECTED_CREDIT', { credit: this.getCreditProduct })
    },
    async toCheckout () {
      if (this.$route.name !== 'checkout') {
        try {
          await this.$store.dispatch('cart/addItem', { productToAdd: this.getCurrentProduct });
          this.setBankAndCredit()
          this.$router.push({ name: 'checkout' });
        } catch (e) {
          console.log(e)
        } finally {
          this.$bus.$emit('modal-hide', 'modal-credits');
        }
      } else {
        this.setBankAndCredit()
        this.$bus.$emit('modal-hide', 'modal-credits');
      }
    },
    close () {
      this.$bus.$emit('modal-hide', 'modal-credits');
      this.$router.push(localizedRoute('/'));
    },
    selectedPaymentCount (value, index, bank) {
      this.$set(this.selectedCreditProduct, index, value)
      this.$set(this.selectedPositions, index, this.CalculateMontlyPayment(value))
    },
    setSelectedBank (index) {
      this.selectedBank = index
    }
  },
  watch: {
    getBanks: function (banks) {
      if (banks.length) {
        this.initBanks(banks)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-label{
  @media (min-width: 576px){
    display: none;
  }
  font-size: 13px;
  line-height: 16px;
  color: rgba(95, 94, 94, 0.6);
  display: block;
  margin-bottom: 12px;
}
.grand-total{
  @media (max-width: 575px){
    font-size: 24px;
    line-height: 30px;
  }
}
::v-deep .modal-container{
  display: flex;
  flex-direction: column;
  height: calc(100% - 58px);
  .modal-content{
    @media (min-width: 601px) {
      position: relative;
      flex: 1;
      max-height: calc(100vh - 57px - 58px);
      padding-bottom: 90px;
    }
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #E0E0E0;;
    }
  }
}
</style>
<style lang="scss">
.modal-header{
  @media (max-width: 575px){
    padding-top: 65px !important;
    h3{
      margin: 0;
      line-height: 30px;
    }
    .modal-close{
      position: absolute;
      right: 0;
      top: 0;
      min-width: 56px;
      min-height: 56px;
      background-color: #F9F9F9;
      color: #BDBDBD;
      font-size: 24px;
      margin: 0 !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
  .desctop_header{
    @media (max-width : 840px){
      display: none !important;
    }
  }
  .mob_header{
    @media (min-width : 841px){
      display: none !important;
    }
    display: block;
    font-family: 'DIN Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: rgba(95, 94, 94, 0.6);
    margin-bottom: 12px;
  }
  .custom-select{
    @media (min-width : 841px){
      max-width:  132px;
    }
  }
  .description{
    font-family: 'DIN Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #5F5E5E;
    margin: 25px 0 7px;
  }
  .l20{
    position: relative;
    left: 20px;
    @media (max-width : 600px){
      left: 0px;
    }
  }
  .credits-to-order{
    @media (max-width : 600px){
      flex-direction: column-reverse;
      padding: 16px;
    }
    @media (min-width: 600px) {
      border-radius: 0 0 4px 4px;
      box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25);
      position: fixed;
      bottom: 0;
      right: 0;
    }
    align-items: center;
    justify-content: flex-end;
    padding: 24px;
    background-color: #fff;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
    &>span{
      font-size: 14px;
      line-height: 18px;
      font-weight: 700;
      color: #1A1919;
      border-color: #1A1919;
      cursor: pointer;
    }
    button{
      @media (max-width : 600px){
        margin-left: 0;
        margin-bottom: 16px;
        min-width: 100%;
      }
      min-width: 223px;
      text-align: center;
      display: block;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
     @media (max-width : 840px){
       width: 100%;
     }
    -moz-appearance: textfield;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 12px 16px;
    width: 138px;
    font-family: 'DIN Pro';
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
    &:focus{
      outline: none;
      border-color: #23BE20;
    }
  }

  $col1 : 200px;
  $col2 : 206px;
  $col3 : 206px;
  $col4 : 145px;
  .select-wrapper{
    min-width: 138px;
    box-sizing: border-box;
    border-radius: 4px;
    select{
      border: 1px solid #E0E0E0 !important;
      box-sizing: border-box;
      border-radius: 4px !important;
      padding: 0 16px;
      height: 40px;
    }
  }
  .credit-card-block{
    &__wrap{
      border: 1px solid #E0E0E0;
      border-radius: 4px;
      box-sizing: border-box;
      .credit-card-block__row{
        &:not(:last-child){
          border-bottom: 1px solid #E0E0E0;
        }
      }
    }
    &__row{
      @media (max-width: 575px){
        padding-left: 16px;
        padding-right: 16px;
      }
      @media (max-width : 840px){
        flex-direction: column;
        &>div:not(:last-child){
          margin-bottom: 16px;
        }
        &>div{
          display: flex;
          flex-direction: column;
          width: 100% !important;
          align-items: flex-start !important;
        }
      }
      &.head{
        div{
          font-family: 'DIN Pro';
          font-size: 13px;
          line-height: 16px;
          color: rgba(95, 94, 94, 0.6);
        }
      }
      &.active{
        background-color: #F9F9F9;
      }
      padding: 15px 30px;
      justify-content: space-between;
      div{
        display: flex;
        align-items: center;
      }
      &>div:nth-child(1){
        width : $col1;
        flex: 1;
      }
      &>div:nth-child(2){
        width : $col2;
      }
      &>div:nth-child(3){
        width : $col3;
      }
      &>div:nth-child(4){
        width : $col4;
      }
    }
    &__radio-wrap{
      label{
        font-family: 'DIN Pro';
        font-size: 15px;
        line-height: 24px;
        color: #1A1919;
      }
      img{
        margin-left: 7px;
      }
    }
  }
  .modal-credits{
      *:not(i){
        font-family: 'DIN Pro';
      }
      .modal-header{
        background-color: #fff;
        padding: 0 0 0 24px;
        font-style: normal;
        font-weight: 0;
        font-size: 24px;
        line-height: 30px;
        color: #1A1919;
        border-bottom: 1px solid #E0E0E0;
        h3{
          @media (max-width: 767px) {
            margin: 13px 0 13px 24px;
          }
          margin: 13px 0 13px 16px;
        }
      }
      p{
          margin-bottom: 16px;
      }
  }
  .modal-header{
    border-bottom: none !important;
    padding-bottom: 12px !important;
  }
.modal-content{
  @media (max-width: 767px) {
    padding-left: 16px !important;
    padding-right: 16px !important;
    padding-top: 0px !important;
  }
}
</style>
