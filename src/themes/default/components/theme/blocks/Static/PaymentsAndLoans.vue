<template>
  <div class="payments-and-loans">{{ translate('payments and loans text') }}</div>
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
