<template>
  <div class="using-a-promo-code">{{ translate('using a promo code text') }}</div>
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
