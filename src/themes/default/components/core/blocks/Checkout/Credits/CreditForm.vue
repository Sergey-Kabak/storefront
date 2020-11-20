<template>
  <div>
    <form class="w-100">
      <div class="block-title">
        {{ $t('Loan processing')}}
      </div>
<!--      <div class="credit-method-block">-->
<!--        <div v-if="+selectedCredit.liqpay_allowed" class="credit-method-select">-->
<!--          <span class="credit-method-title">Способ оплаты</span>-->
<!--          <div class="credit-method-radio">-->
<!--            <label v-for="(method, index) in availableMethods"-->
<!--                   :key="index"-->
<!--                   :for="'credit-method&#45;&#45;' + method"-->
<!--                   :class="{'active': creditMethod === method}"-->
<!--            >-->
<!--              <input @input="chageMethod(method)" :id="'credit-method&#45;&#45;' + method" type="radio" :value="method" name="credit-method">-->
<!--              {{ method }}-->
<!--            </label>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-if="maxTermsSelected" class="credit-method-select">-->
<!--          <span class="credit-method-title">Дополнительные услуги</span>-->
<!--        </div>-->
<!--        <div v-if="AdditionalRules && +selectedCredit.liqpay_allowed">-->
<!--          <div class="alert">-->
<!--            Для возможности оплаты через систему Liqpay необходимо добавить к заказу аксессуар(ы) на сумму от {{accessoriesMinPrice | price(storeView)}}!-->
<!--          </div>-->
<!--          <product-list />-->
<!--        </div>-->
<!--      </div>-->
      <div class="form-row flex">
        <div class="form-column">
          <div class="form-label">
            {{ $t('FIO') }}
          </div>
        </div>
        <div class="form-column">
          <div class="form-field">
            <base-input
              class="custom-input"
              :class="{ error: $v.surname.$error && $v.surname.$dirty }"
              type="text"
              :autofocus="true"
              name="surname"
              :placeholder="$t('Last name')"
              v-model.trim="surname"
              @blur="$v.surname.$touch()"
              autocomplete="given-name"
              :validations="[
                          {
                            condition: $v.surname.$error && !$v.surname.required && $v.surname.$dirty,
                            text: $t('Field is required')
                          },
                        ]"
            />
          </div>
          <div class="form-field">
            <base-input
              class="custom-input"
              :class="{ error: $v.name.$error && $v.name.$dirty }"
              type="text"
              :autofocus="true"
              name="name"
              :placeholder="$t('First name')"
              v-model.trim="name"
              @blur="$v.name.$touch()"
              autocomplete="given-name"
              :validations="[
                          {
                            condition: $v.name.$error && !$v.name.required && $v.name.$dirty,
                            text: $t('Field is required')
                          },
                        ]"
            />
          </div>
          <div class="form-field">
            <base-input
              class="custom-input"
              :class="{ error: $v.last_name.$error && $v.last_name.$dirty }"
              type="text"
              :autofocus="true"
              name="last_name"
              :placeholder="$t('surname')"
              v-model.trim="last_name"
              @blur="$v.last_name.$touch()"
              autocomplete="given-name"
              :validations="[
                          {
                            condition: $v.last_name.$error && !$v.last_name.required && $v.last_name.$dirty,
                            text: $t('Field is required')
                          },
                        ]"
            />
          </div>
        </div>
      </div>
      <div class="form-row flex">
        <div class="form-column">
          <div class="form-label">
            {{ $t('date of birth') }}
          </div>
        </div>
        <div class="form-column">
          <div class="form-label datepicker">
            <base-datepicker-checkout v-model="date_of_birth" :class="{ error: $v.date_of_birth.$error && $v.date_of_birth.$dirty }" :validations="[
                          {
                            condition: $v.date_of_birth.$error && !$v.date_of_birth.required && $v.date_of_birth.$dirty,
                            text: $t('Field is required')
                          },
                        ]"/>
          </div>
        </div>
      </div>
      <div class="form-row flex">
        <div class="form-column">
          <div class="form-label">
            {{ $t('INN') }}
          </div>
        </div>
        <div class="form-column">
          <div class="form-label">
            <base-input
              class="custom-input inn-input"
              :class="{ error: $v.identification_code.$error && $v.identification_code.$dirty }"
              type="number"
              :autofocus="true"
              name="INN"
              :placeholder="$t('INN')"
              v-model.trim="identification_code"
              @blur="$v.identification_code.$touch()"
              autocomplete="given-name"
              :validations="[
                          {
                            condition: $v.identification_code.$error && !$v.identification_code.required && $v.identification_code.$dirty,
                            text: $t('Field is required')
                          },
                        ]"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseDatepickerCheckout from '../../Form/BaseDatepickerCheckout';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput';
import { mapState, mapGetters } from 'vuex';
import { minLength, required } from 'vuelidate/lib/validators';
import ProductList from './ProductList';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import * as types from 'theme/store/credit/mutation-types'
import CreditRule from './CreditRule'

export default {
  name: 'CreditForm',
  data () {
    return {
      surname: '',
      name: '',
      last_name: '',
      date_of_birth: '',
      identification_code: '',
      availableMethods: ['pickup', 'liqpay']
    }
  },
  components: {
    BaseDatepickerCheckout,
    BaseInput,
    ProductList,
    CreditRule
  },
  computed: {
    ...mapGetters({
      selectedCredit: 'themeCredit/getSelectedCredit',
      getSelectedBank: 'themeCredit/getSelectedBank',
      creditMethod: 'themeCredit/creditMethod',
      totals: 'cart/getTotals'
    }),
    storeView () {
      return currentStoreView()
    },
    AdditionalRules () {
      return ['liqpay'].includes(this.creditMethod);
    },
    accessoriesMinPrice () {
      return this.totals.find(it => it.code === 'grand_total').value / 100 * +this.selectedCredit.extra_items_part
    },
    maxTermsSelected () {
      return !+this.selectedCredit.liqpay_allowed && +this.selectedCredit.terms === this.maxTerms
    },
    maxTerms () {
      const propositions = this.getSelectedBank.groups[Object.keys(this.getSelectedBank.groups)[0]];
      return propositions.map(it => +it.terms).sort((a, b) => b - a)[0]
    }
  },
  // methods: {
  //   chageMethod (method) {
  //     this.$store.commit('themeCredit/' + types.CREDIT_SET_METHOD, { creditMethod: method });
  //   }
  // },
  // watch: {
  //   selectedCredit: function (v) {
  //     if (!+v.liqpay_allowed) {
  //       this.$store.commit('themeCredit/' + types.CREDIT_SET_METHOD, { creditMethod: 'pickup' })
  //     }
  //   }
  // },
  // beforeDestroy () {
  //   this.$store.commit('themeCredit/' + types.CREDIT_SET_METHOD, { creditMethod: 'pickup' })
  // },
  validations () {
    return {
      surname: {
        required,
        minLength: minLength(3)
      },
      name: {
        required,
        minLength: minLength(2)
      },
      last_name: {
        required,
        minLength: minLength(2)
      },
      date_of_birth: {
        required
      },
      identification_code: {
        required,
        minLength: minLength(10)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-label.datepicker{
  ::v-deep .error {
    input {
      border-color: #EE2C39;
      &::placeholder {
        color: #EE2C39;
      }
    }
    svg{
      color: #EE2C39;
    }
    .cl-error{
      margin-top: -24px;
      margin-bottom: 8px;
    }
  }
}
.block-title{
  display: block;
  text-align: left;
  font-weight: 700;
  margin-bottom: 32px;
  font-size: 14px;
  line-height: 16px;
  color: #1A1919;
}
.inn-input {
  width: 100%;

  ::v-deep input[type=number] {
    width: 100%;
  }
}
.inn-input:not(.error) {
  ::v-deep input[type=number] {
    border-color: #bdbdbd;
  }
}
.form-row {
  @media (max-width: 575px) {
    flex-direction: column;
    align-items: flex-start;
    ::v-deep {
      .base-input {
        min-height: 3.5rem;
      }
    }
  }
  margin: 0;
  justify-content: space-between;
}
.form-column:first-child .form-label {
  @media (max-width: 575px) {
    margin-bottom: 16px;
  }
}
.form-column:last-child {
  @media (max-width: 575px) {
    max-width: 100%;
  }
  max-width: 312px;
  width: 100%;
}
::v-deep .date-picker.mx-datepicker {
  width: 100%;
  height: 4.5rem;

  input {
    height: 40px;
    box-shadow: none;
    border-color: #bdbdbd;
    padding-left: 15px;
    font-size: 13px;
    color: #1A1919;

    &::placeholder {
      color: #999;
      font-size: 13px;
    }
  }
}
::v-deep .base-input {
  input {
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;
    font-size: 13px;
    color: #1A1919;
    line-height: 16px;
  }

  label {
    background: #fff;
    padding: 0 5px;
    margin-left: -5px;
  }
}

.credit-method{
  &-block{
    display: flex;
    flex-direction: column;
  }
  &-select{
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  &-title{
    font-size: 13px;
    line-height: 16px;
    color: #5F5E5E;
  }
  &-radio{
    background: #F2F2F2;
    border-radius: 4px;
    display: flex;
    label{
      cursor: pointer;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      color: #1A1919;
      min-width: 156px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    label.active{
      background: #FFFFFF;
      border: 1px solid #23BE20;
      box-sizing: border-box;
      border-radius: 4px;
    }
  }
}
.alert{
  background: #FDE6E7;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
  margin-bottom: 24px;
  text-align: left;
}
</style>
