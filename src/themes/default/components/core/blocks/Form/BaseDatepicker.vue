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
    <template v-slot:icon-calendar>
      <icon-base> <calendar-icon /> </icon-base>
    </template>
  </date-picker>
</template>

<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/ru';
import 'vue2-datepicker/locale/uk';
import IconBase from 'theme/components/theme/IconBase';
import { CalendarIcon } from 'theme/assets/account/index';

export default {
  components: {
    CalendarIcon,
    DatePicker,
    IconBase
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
