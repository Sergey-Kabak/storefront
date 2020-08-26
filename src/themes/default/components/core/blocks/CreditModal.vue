<template>
  <modal name="modal-credits" class="modal-credits" :width="900">
    <h3 slot="header" class="modal-credits_header align-center">
        Кредит
    </h3>
    <div slot="content" class="modal-credits_content">  
      
      <div class="credit-card-block__row desctop_header head flex">
          <div>Предложение</div>
          <div>Первый взнос, ₴</div>
          <div>Кол-во платежей</div>
          <div>Ежемесячный платеж</div>
      </div>

      <div class="credit-card-block__wrap">
         <div v-for="(bank , index) in banks" :key="index" class="credit-card-block__row flex h-center" :class="{'active' : selectedBank === index}">
            <div class="credit-card-block__radio-wrap flex v-center">
              <div class="mob_header">Предложение</div>
              <div class="flex v-center">
                <base-radiobutton :id="'bank' + index" name="bank" @change="selectedBank = index" :checked="selectedBank === index">{{bank.name}}</base-radiobutton>
                <img :src="'assets/banks/' + bank.icon" alt="">
              </div>
            </div>
            <div v-if="bank.hasOwnProperty('default')">
              <div class="mob_header">Первый взнос, ₴</div>
              <input type="number">
            </div>
            <div v-else class="l20">
              <div class="mob_header">Первый взнос, ₴</div>
              
              {{bank.first_installment}}
            </div>
            <div>
              <div class="mob_header">Кол-во платежей</div>
              
              <custom-select :options="bank.range" v-model="bank.currentMonth" />
            </div>
            <div> 
              <div class="mob_header">Ежемесячный платеж</div>
              
              <b>{{(bank.monthly_payment / bank.currentMonth).toFixed(2)}} ₴</b>
            </div>
        </div>
        
      </div>

      <p class="description">
        Здесь будет текст про флоу оформления кредита:
Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
      </p>

      <div class="credits-to-order flex">
        <span class="underline">Продолжить покупки</span>
        <button-active class="ml30 ">
          Оформить заказ
        </button-active>
      </div>
        
    </div>
  </modal>
</template>

<script>
import BaseRadiobutton     from 'theme/components/core/blocks/Form/BaseRadiobutton'
import BaseInputNumber        from 'theme/components/core/blocks/Form/BaseInputNumber'
import CustomSelect        from 'theme/components/core/blocks/Form/CustomSelect'
import ButtonActive        from 'theme/components/core/blocks/Product/ButtonActive'
import Modal               from 'theme/components/core/Modal.vue'
import { mapGetters }      from 'vuex'
import i18n                from '@vue-storefront/i18n'

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
      selectedBank : 0,
      installment : 0,
      banks : [
        {
          icon : 'otp_bank.png',
          name : 'ОТП Банк',
          first_installment : 2273,
          monthly_payment : 2273,
          range : [
            {value : 1 , label : '1 платеж'},
            {value : 2 , label : '2 платежa'},
            {value : 3 , label : '3 платежa'},
            {value : 4 , label : '4 платежa'},
            {value : 5 , label : '5 платежa'},
            {value : 6 , label : '6 платежей'},
            {value : 7 , label : '7 платежей'},
            {value : 8 , label : '8 платежей'},
            {value : 9 , label : '9 платежей'},
            {value : 10 , label : '10 платежей'},
            {value : 11 , label : '11 платежей'},
            ],
          currentMonth : 1
        },
        {
          icon : 'alpha_bank.png',
          name : 'Альфа Банк',
          first_installment : 2273,
          monthly_payment : 2273,
          range : [
            {value : 1 , label : '1 платеж'},
            {value : 2 , label : '2 платежa'},
            {value : 3 , label : '3 платежa'},
            {value : 4 , label : '4 платежa'},
            {value : 5 , label : '5 платежa'},
            {value : 6 , label : '6 платежей'},
            {value : 7 , label : '7 платежей'},
            {value : 8 , label : '8 платежей'},
            {value : 9 , label : '9 платежей'},
            {value : 10 , label : '10 платежей'},
            {value : 11 , label : '11 платежей'},
            ],
          currentMonth : 1
        },
        {
          icon : 'globus_bank.png',
          name : 'Глобус Банк',
          first_installment : 2273,
          monthly_payment : 2273,
          range : [
            {value : 1 , label : '1 платеж'},
            {value : 2 , label : '2 платежa'},
            {value : 3 , label : '3 платежa'},
            {value : 4 , label : '4 платежa'},
            {value : 5 , label : '5 платежa'},
            {value : 6 , label : '6 платежей'},
            {value : 7 , label : '7 платежей'},
            {value : 8 , label : '8 платежей'},
            {value : 9 , label : '9 платежей'},
            {value : 10 , label : '10 платежей'},
            {value : 11 , label : '11 платежей'},
            ],
          currentMonth : 1
        },
        {
          icon : 'slon_credit.png',
          name : 'Слон Кредит',
          first_installment : 2273,
          monthly_payment : 2273,
          range : [
            {value : 1 , label : '1 платеж'},
            {value : 2 , label : '2 платежa'},
            {value : 3 , label : '3 платежa'},
            {value : 4 , label : '4 платежa'},
            {value : 5 , label : '5 платежa'},
            {value : 6 , label : '6 платежей'},
            {value : 7 , label : '7 платежей'},
            {value : 8 , label : '8 платежей'},
            {value : 9 , label : '9 платежей'},
            {value : 10 , label : '10 платежей'},
            {value : 11 , label : '11 платежей'},
            ],
          currentMonth : 1
        },
        {
          icon : 'card_sevice.png',
          name : 'Кардсерсис',
          first_installment : 2273,
          monthly_payment : 2273,
          range : [
            {value : 1 , label : '1 платеж'},
            {value : 2 , label : '2 платежa'},
            {value : 3 , label : '3 платежa'},
            {value : 4 , label : '4 платежa'},
            {value : 5 , label : '5 платежa'},
            {value : 6 , label : '6 платежей'},
            {value : 7 , label : '7 платежей'},
            {value : 8 , label : '8 платежей'},
            {value : 9 , label : '9 платежей'},
            {value : 10 , label : '10 платежей'},
            {value : 11 , label : '11 платежей'},
            ],
          currentMonth : 1
        },
        {
          icon : 'pumb_bank.png',
          name : 'ПУМБ',
          first_installment : 2273,
          monthly_payment : 2273,
          range : [
            {value : 1 , label : '1 платеж'},
            {value : 2 , label : '2 платежa'},
            {value : 3 , label : '3 платежa'},
            {value : 4 , label : '4 платежa'},
            {value : 5 , label : '5 платежa'},
            {value : 6 , label : '6 платежей'},
            {value : 7 , label : '7 платежей'},
            {value : 8 , label : '8 платежей'},
            {value : 9 , label : '9 платежей'},
            {value : 10 , label : '10 платежей'},
            {value : 11 , label : '11 платежей'},
            ],
          currentMonth : 1
        },
        {
          icon : 'monobank.png',
          name : 'Монобанк',
          first_installment : 2273,
          monthly_payment : 2273,
          range : [
            {value : 1 , label : '1 платеж'},
            {value : 2 , label : '2 платежa'},
            {value : 3 , label : '3 платежa'},
            {value : 4 , label : '4 платежa'},
            {value : 5 , label : '5 платежa'},
            {value : 6 , label : '6 платежей'},
            {value : 7 , label : '7 платежей'},
            {value : 8 , label : '8 платежей'},
            {value : 9 , label : '9 платежей'},
            {value : 10 , label : '10 платежей'},
            {value : 11 , label : '11 платежей'},
            ],
          currentMonth : 1
        },
        {
          icon : 'ligth.png',
          name : 'Рассрочка под 0.01%',
          first_installment : 2273,
          monthly_payment : 2273,
          range : [
            {value : 1 , label : '1 платеж'},
            {value : 2 , label : '2 платежa'},
            {value : 3 , label : '3 платежa'},
            {value : 4 , label : '4 платежa'},
            {value : 5 , label : '5 платежa'},
            {value : 6 , label : '6 платежей'},
            {value : 7 , label : '7 платежей'},
            {value : 8 , label : '8 платежей'},
            {value : 9 , label : '9 платежей'},
            {value : 10 , label : '10 платежей'},
            {value : 11 , label : '11 платежей'},
            ],
          currentMonth : 1
        },
      ]
    }
  },

  mounted(){
    this.banks.unshift({
      icon : 'standard.png',
      name : 'Стандарт',
      first_installment : 2273,
      monthly_payment : 2273,
      range : [
        {value : 1 , label : '1 платеж'},
        {value : 2 , label : '2 платежa'},
        {value : 3 , label : '3 платежa'},
        {value : 4 , label : '4 платежa'},
        {value : 5 , label : '5 платежa'},
        {value : 6 , label : '6 платежей'},
        {value : 7 , label : '7 платежей'},
        {value : 8 , label : '8 платежей'},
        {value : 9 , label : '9 платежей'},
        {value : 10 , label : '10 платежей'},
        {value : 11 , label : '11 платежей'},
        ],
      currentMonth : 1,
      default : true
    })
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
    font-weight: 0;
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
    font-weight: 0;
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
      border: 1px solid #E0E0E0 !important ;
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