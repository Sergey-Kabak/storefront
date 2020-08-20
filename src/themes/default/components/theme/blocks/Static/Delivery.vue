<template>
  <div class="delivery">
    <h2>{{ $t('justin') }}</h2>
    <img src="/assets/static/justin_poshta.jpg" alt="justin_poshta">
    <p>{{ $t('justin company') }}</p>
    <h2>{{ $t('why justin') }}</h2>
    <ul>
      <li>{{ $t('justin chain') }}</li>
      <li>{{ $t('justin location') }}</li>
      <li>{{ $t('justin delivery') }}</li>
      <li>{{ $t('justin schedule') }}</li>
    </ul>
    <a href="https://justin.ua/">{{ $t('justin site') }}</a>
    <p>{{ $t('delivery warning') }}</p>
    <h2>{{ $t('nova poshta') }}</h2>
    <img src="/assets/static/novaya_poshta.jpg" alt="novaya_poshta">
    <p>{{ $t('nova poshta descrtiption') }}</p>
    <h4>{{ $t('cost order') }}</h4>
    <ul>
      <li>{{ $t('nova poshta free order') }}</li>
      <li>{{ $t('nova poshta price order') }}</li>
    </ul>
    <h4>{{ $t('nova poshta postpay') }}</h4>
    <p>{{ $t('free') }}</p>
    <h4>{{ $t('delivery time') }}</h4>
    <ul>
      <li>{{ $t('nova poshta delivery time description') }}</li>
    </ul>
    <p>{{ $t('delivery warning') }}</p>
    <h2>{{ $t('ukr poshta') }}</h2>
    <img src="/assets/static/ukr_poshta.jpg" alt="ukr_poshta">
    <p>{{ $t('ukr poshta description') }}</p>
    <p>{{ $t('ukr poshta department') }}</p>
    <p>{{ $t('delivery warning') }}</p>
  </div>
</template>

<script>

export default {}
</script>

<style lang="scss" scoped>
  .delivery {
    text-align: justify;
  }

  h2 {
    font-family: sans-serif;
    &:first-child {
      margin-top: 0;
    }
  }

  img {
    max-width: 200px;
    width: 100%;
  }
</style>