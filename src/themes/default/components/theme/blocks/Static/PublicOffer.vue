<template>
  <div class="public-offer">{{ translate('public offer text') }}</div>
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
