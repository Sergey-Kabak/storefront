<template>
  <div class="payments">
    <h2>{{ $t('payment cash') }}</h2>
    <p>{{ $t('payment cash description') }}</p>
    <h2>{{ $t('payment cart') }}</h2>
    <p>{{ $t('payment cart description') }}</p>
    <p>{{ $t('payment requirements') }}</p>
    <h2>{{ $t('payment cashless') }}</h2>
    <p>{{ $t('payment cashless docs') }}</p>
    <ul>
      <li>{{ $t('payment certificate of vat') }}</li>
      <li>{{ $t('payment certificate single tax') }}</li>
      <li>{{ $t('payment certificate registration') }}</li>
      <li>{{ $t('payment info organization') }}</li>
    </ul>
    <p>{{ $t('payment reply') }}</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  .payments {
    text-align: justify;
  }
  h2 {
    font-family: sans-serif;
    &:first-child {
      margin-top: 0;
    }
  }
</style>
