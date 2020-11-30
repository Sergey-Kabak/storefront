<template>
  <div>
    <date-picker
      :value="value"
      :clearable="false"
      :editable="false"
      format="DD/MM/YYYY"
      type="datetime"
      placeholder='ДД/ММ/ГГГГ'
      :lang="currentLang"
      @change="$emit('input', $event)"
      class="date-picker"
    >
    </date-picker>
    <ValidationMessages v-if="validations" :validations="validations" :errorClass="errorClass" />
  </div>
</template>

<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/ru';
import 'vue2-datepicker/locale/uk';
import ValidationMessages from './ValidationMessages.vue';

export default {
  components: {
    DatePicker,
    ValidationMessages
  },
  props: {
    value: {
      type: [Date, String],
      default: ''
    },
    validations: {
      type: Array,
      default: () => []
    },
    errorClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentLang () {
      return {
        'uk-UA': {
          monthFormat: 'MMMM'
        },
        'ru-RU': {
          monthFormat: 'MMMM'
        },
        'en-US': 'en'
      }[this.$i18n.locale]
    }
  }
}
</script>

<style lang="scss">
  $primary-color: #23be20;
  @import "~vue2-datepicker/scss/index";
  .cell div{
    font-family: "DIN Pro" !important;
  }
</style>
