<template>
  <div>
    <form class="w-100">
      <div class="block-title">
        {{ $t('Loan processing') }}
      </div>
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
              :class="{ error: $v.form.surname.$error && $v.form.surname.$dirty }"
              type="text"
              name="surname"
              :placeholder="$t('Last name')"
              v-model.trim="form.surname"
              @blur="$v.form.surname.$touch()"
              autocomplete="given-name"
              :validations="[
                {
                  condition: $v.form.surname.$error && !$v.form.surname.required && $v.form.surname.$dirty,
                  text: $t('Field is required')
                },
              ]"
            />
          </div>
          <div class="form-field">
            <base-input
              class="custom-input"
              :class="{ error: $v.form.name.$error && $v.form.name.$dirty }"
              type="text"
              name="name"
              :placeholder="$t('First name')"
              v-model.trim="form.name"
              @blur="$v.form.name.$touch()"
              autocomplete="given-name"
              :validations="[
                {
                  condition: $v.form.name.$error && !$v.form.name.required && $v.form.name.$dirty,
                  text: $t('Field is required')
                },
              ]"
            />
          </div>
          <div class="form-field">
            <base-input
              class="custom-input"
              :class="{ error: $v.form.last_name.$error && $v.form.last_name.$dirty }"
              type="text"
              name="last_name"
              :placeholder="$t('surname')"
              v-model.trim="form.last_name"
              @blur="$v.form.last_name.$touch()"
              autocomplete="given-name"
              :validations="[
                {
                  condition: $v.form.last_name.$error && !$v.form.last_name.required && $v.form.last_name.$dirty,
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
            <base-datepicker-checkout v-model="form.date_of_birth" :class="{ error: $v.form.date_of_birth.$error && $v.form.date_of_birth.$dirty }" :validations="[
              {
                condition: $v.form.date_of_birth.$error && !$v.form.date_of_birth.required && $v.form.date_of_birth.$dirty,
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
            {{ $t('INN') }}
          </div>
        </div>
        <div class="form-column">
          <div class="form-label">
            <base-input
              class="custom-input inn-input"
              :class="{ error: $v.form.identification_code.$error && $v.form.identification_code.$dirty }"
              type="number"
              name="INN"
              :placeholder="$t('INN')"
              v-model.trim="form.identification_code"
              @blur="$v.form.identification_code.$touch()"
              autocomplete="given-name"
              :validations="[
                {
                  condition: $v.form.identification_code.$error && !$v.form.identification_code.required && $v.form.identification_code.$dirty,
                  text: $t('Field is required')
                },
                {
                  condition: $v.form.identification_code.$error && !$v.form.identification_code.invalidINN && $v.form.identification_code.$dirty,
                  text: $t('Invalid INN')
                }
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

const invalidINN = (value) => {
  const strValue = String(value)
  const total = (strValue[0] * (-1)) +
    (strValue[1] * 5) +
    (strValue[2] * 7) +
    (strValue[3] * 9) +
    (strValue[4] * 4) +
    (strValue[5] * 6) +
    (strValue[6] * 10) +
    (strValue[7] * 5) +
    (strValue[8] * 7);
  let check = total % 11;
  check === 10 && (check = check[1]);
  return check === +strValue[9]
}
export default {
  name: 'CreditForm',
  data () {
    return {
      form: {
        surname: '',
        name: '',
        last_name: '',
        date_of_birth: '',
        identification_code: ''
      },
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
    ...mapState({
      personalDetails: (state) => state.checkout.personalDetails
    }),
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
    }
  },
  validations () {
    return {
      form: {
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
          minLength: minLength(10),
          invalidINN
        }
      }
    }
  },
  mounted () {
    this.form.name = this.personalDetails?.firstName
    this.form.surname = this.personalDetails?.lastName
  }
}
</script>

<style lang="scss" scoped>
.form-field{
  margin-bottom: 20px;
}
.form-label{
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #5F5E5E;
}
::v-deep .date-picker.mx-datepicker{
  input{
    border-color: #E0E0E0 !important;
  }
  i{
    color: #BDBDBD !important;
  }
}
.form-label.datepicker{
  ::v-deep .error {
    input {
      border-color: #EE2C39 !important;
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
    border-color: #E0E0E0;
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
  margin-bottom: 28px;
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
