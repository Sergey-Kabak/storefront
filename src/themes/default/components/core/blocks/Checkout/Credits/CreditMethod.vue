<template>
  <div class="w-100">
    <current-credit />
    <credit-form ref="creditForm" />
  </div>
</template>

<script>
import CreditForm from './CreditForm';
import CurrentCredit from './CurrentCredit';
export default {
  name: 'CreditMethod',
  components: {
    CreditForm,
    CurrentCredit
  }
}
</script>
