<template>
  <div class="landlords">
    <p class="title">{{ $t('landlords description') }}</p>
    <p>
      <a href="tel:+380503407293">+38 (050) 340 72 93</a>
    </p>
    <p>
      <a href="mailto:o.tatsii@ringoo.ua">o.tatsii@ringoo.ua</a>
    </p>
    <p>{{ $t('alexandr tatsiy') }}.</p>
    <p>{{ $t('landlords guarantee') }}</p>
    <p><strong>{{ $t('placing') }}</strong></p>
    <ul>
      <li>{{ $t('shopping centers') }}</li>
      <li>{{ $t('supermarkets') }}</li>
      <li>{{ $t('markets') }}</li>
      <li>{{ $t('stations') }}</li>
      <li>{{ $t('transport interchanges') }}</li>
      <li>{{ $t('central streets') }}</li>
    </ul>
    <p><strong>{{ $t('location') }}</strong></p>
    <ul>
      <li>{{ $t('location high traffic') }}</li>
      <li>{{ $t('location checkout areas') }}</li>
      <li>{{ $t('location retail space') }}</li>
      <li>{{ $t('location pavilions') }}</li>
      <li>{{ $t('location accumulation') }}</li>
      <li>{{ $t('location first floor') }}</li>
    </ul>
    <p><strong>{{ $t('priorities') }}</strong></p>
    <ul>
      <li>{{ $t('priorities hight traffic') }}</li>
      <li>{{ $t('priorities red line') }}</li>
    </ul>
    <p><strong>{{ $t('requirements') }}</strong></p>
    <ul>
      <li>{{ $t('requirements repair') }}</li>
      <li>{{ $t('requirements large windows') }}</li>
      <li>{{ $t('requirements uninterrupted power') }}</li>
      <li>{{ $t('requirements internet') }}</li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .title {
    margin-top: 0;
  }
</style>
