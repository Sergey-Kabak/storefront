<template>
  <div class="promotional-offers">
    <p style="text-align: center;" class="title">
      <strong>{{ $t('promotional offer title') }}</strong>
    </p>
    <p style="text-align: center;">({{ $t('all shopes ringoo') }})</p>
    <strong>{{ $t('promotional offer description') }}</strong>
    <strong>{{ $t('promotional offer condition') }}</strong>
    {{ $t('promotional offer condition description') }}
    <strong>{{ $t('promotional offer products') }}</strong>
    <ul>
      <li>{{ $t('information carriers') }}</li>
      <li>{{ $t('smart watch') }}</li>
      <li>{{ $t('fitness bracelets') }}</li>
      <li>{{ $t('apple headset') }}</li>
      <li>{{ $t('batteries') }}</li>
      <li>{{ $t('monopods') }}</li>
      <li>{{ $t('tripods') }}</li>
    </ul>
    <p> {{ $t('promocode warning') }} </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  .title {
    margin-top: 0;
  }
</style>