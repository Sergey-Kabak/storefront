<template>
  <div class="w-100">
    <current-credit />
    <credit-rule v-if="isExtraItemsPart" />
    <credit-form v-if="!+selectedCredit.liqpay_allowed && (alertStatus.class === 'success' || !isExtraItemsPart)" ref="creditForm" />
  </div>
</template>

<script>
import CreditForm from './CreditForm';
import CurrentCredit from './CurrentCredit';
import CreditRule from './CreditRule';
import mixin from './mixin'
export default {
  name: 'CreditMethod',
  mixins: [mixin],
  components: {
    CreditForm,
    CurrentCredit,
    CreditRule
  }
}
</script>
