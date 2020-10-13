<template>
  <date-picker
    :value="value"
    :clearable="false"
    :editable="false"
    format="DD/MM/YYYY"
    placeholder='ДД/ММ/ГГГГ'
    :lang="currentLang"
    @change="$emit('input', $event)"
    class="date-picker"
  >
  </date-picker>
</template>

<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import 'vue2-datepicker/locale/uk';

export default {
  components: {
    DatePicker
  },
  props: {
    value: {
      type: [Date, String],
      default: ''
    }
  },
  computed: {
    currentLang() {
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

</style>
