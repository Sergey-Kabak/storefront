<template>
  <div class="work-in-the-company">{{ translate('work in the company text') }}</div>
</template>

<script>
import i18n from '@vue-storefront/i18n'

export default {
  methods: {
    translate (t) {
      return i18n.t(t)
    }
  }
}
</script>
