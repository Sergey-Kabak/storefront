<template>
  <modal name="modal-credits" class="modal-credits" :width="900">
    <h3 slot="header" class="modal-credits_header align-center">
      {{ $t('Credit') }}
    </h3>
    <div slot="content" class="modal-credits_content">

      <div class="credit-card-block__row desctop_header head flex">
          <div>{{ $t('Suggestion') }}</div>
          <div>{{ $t('The first installment') }}, ₴</div>
          <div>{{ $t('Number of payments') }}</div>
          <div>{{ $t('Monthly payment') }}</div>
      </div>

      <div class="credit-card-block__wrap">
         <div v-for="(bank , index) in banks" :key="index" class="credit-card-block__row flex h-center" :class="{'active' : selectedBank === index}">
            <div class="credit-card-block__radio-wrap flex v-center">
              <div class="flex v-center">
                <base-radiobutton :id="'bank' + index" name="bank" @change="setSelectedBank(index)" :checked="selectedBank === index">{{bank.name}}</base-radiobutton>
                <img :src="'assets/banks/' + bank.icon" alt="">
              </div>
            </div>
            <div>
              <input
                type="number"
                v-if="index === selectedBank"
                :value="bank.first_installment"
                @blur="changeFirstInstallment($event, index)"
              >
              <span v-if="index !== selectedBank">
                {{ bank.first_installment }}
              </span>
            </div>
            <div>
              <custom-select :selected-index="1"
                             :options="bank.range" v-on:input="selectedPaymentCount($event, bank.icon)"/>
            </div>
            <div>
              <b>{{ bank.monthly_payment }} ₴</b>
            </div>
        </div>

      </div>

      <p class="description">
        Здесь будет текст про флоу оформления кредита:
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
        velit mollit. Exercitation veniam consequat sunt nostrud amet.
      </p>

      <div class="credits-to-order flex">
        <span class="underline" @click="close()">{{ $t('Continue shopping') }}</span>
        <span @click="close()">
          <button-active class="ml30">
            {{ $t('Go to checkout') }}
          </button-active>
        </span>
      </div>

    </div>
  </modal>
</template>

<script>
import BaseRadiobutton     from 'theme/components/core/blocks/Form/BaseRadiobutton'
import BaseInputNumber     from 'theme/components/core/blocks/Form/BaseInputNumber'
import CustomSelect        from 'theme/components/core/blocks/Form/CustomSelect'
import ButtonActive        from 'theme/components/core/blocks/Product/ButtonActive'
import Modal               from 'theme/components/core/Modal.vue'
import { mapGetters }      from 'vuex'
import config              from 'config'
import {localizedRoute} from "@vue-storefront/core/lib/multistore";
import {CREDIT_SET_BANKS, CREDIT_SET_SELECTED_BANK} from "../../../store/credit/mutation-types";

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
      installment: 0,
      banks: []
    }
  },
  mounted() {
    this.initBanks()
  },
  computed: {
    ...mapGetters({
      totals: 'cart/getTotals'
    }),
    totalPrice () {
      return this.totals.find(it => it.code === 'grand_total').value
    },
  },
  methods: {
    setSelectedBank(index) {
      this.selectedBank = index;
      this.saveBanks();
    },
    close() {
      this.saveBanks();
      this.$bus.$emit('modal-close', 'modal-credits');
      this.$router.push(localizedRoute('/checkout'));
    },
    initBanks() {

      let banks = config.credit.banks;

      if (!banks.find(it => it.icon === config.credit.bank_standart.icon)) {
        banks.unshift(config.credit.bank_standart);
      }

      this.banks = banks;

      this.calculateBanks();
    },
    saveBanks() {
      // Save banks to store
      this.$store.dispatch('themeCredit/creditSetBanks', { banks: this.banks });
      this.$store.dispatch('themeCredit/creditSetSelectedBank', { bank_index: this.selectedBank });
    },
    calculateBanks(installment = true) {

      this.banks.map((bank) => {

        if (installment) {
          bank.first_installment = this.monthlyPayment(bank);
        }

        // Do calculate new monthly payment
        let new_monthly_payment = 0;
        let total_minus_installment = this.totalPrice - bank.first_installment;

        if (total_minus_installment > 0) {
          new_monthly_payment = total_minus_installment / (bank.number_of_payments - 1);
        }

        bank.monthly_payment = Math.ceil(new_monthly_payment);

        return bank;

      });

      this.saveBanks();
    },
    changeFirstInstallment(event, bank_index) {

      let installment = false;
      let value = Number(event.target.value);

      if (value > this.totalPrice || value < this.banks[bank_index].monthly_payment || this.banks[bank_index].number_of_payments === 1) {
        installment = true;
      }

      this.banks[bank_index].first_installment = value;
      this.calculateBanks(installment);
    },
    monthlyPayment(bank) {
      return Math.ceil(this.totalPrice / bank.number_of_payments)
    },
    selectedPaymentCount(value, icon) {

      this.banks = this.banks.map((bank) => {

        if (bank.icon === icon) {
          bank.number_of_payments = value;
        }

        return bank;
      });

      this.calculateBanks();
    }
  },
  beforeDestroy(){
    this.banks = [];
  },
  watch: {
    totalPrice: function() {
      this.calculateBanks();
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .modal-container{
    display: flex;
    flex-direction: column;
    height: calc(100% - 58px);
    .modal-content{
      position: relative;
      flex: 1;
      max-height: calc(100vh - 57px - 58px);
      padding-bottom: 90px;
      @media (max-width : 600px){
        padding-bottom: 111px;
      }
      overflow: auto;
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
    border: 0 0 4px 4px;
    align-items: center;
    justify-content: flex-end;
    padding: 24px;
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: #fff;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25);
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
            margin: 13px 0;
        }
      }
      .modal-content{
          padding: 24px;
      }
      p{
          margin-bottom: 16px;
      }
  }
</style>
