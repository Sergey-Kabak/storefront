<template>
  <div class="using-a-promo-code">
    <p>{{ $t('promocode use') }}</p>
    <ol>
      <li>{{ $t('promocode add to cart') }}</li>
      <li>{{ $t('promocode apply') }}</li>
    </ol>
    <p>{{ $t('promocode several') }}</p>
    <ol>
      <li>{{ $t('promotional offers') }};</li>
      <li>{{ $t('settings and advice') }};</li>
      <li>{{ $t('gift certificates') }};</li>
      <li>{{ $t('services') }};</li>
      <li>{{ $t('scratch cards') }};</li>
      <li>{{ $t('starter packs') }};</li>
      <li>{{ $t('bundle') }}</li>
    </ol>
  </div>
</template>

<script>

export default {};
</script>

<style lang="scss" scoped>
  p {
    &:first-child {
      margin-top: 0;
    }
  }
</style>
