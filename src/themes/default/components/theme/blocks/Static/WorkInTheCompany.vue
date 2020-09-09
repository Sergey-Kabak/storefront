<template>
  <div class="work-in-the-company">
    <p class="title">{{ $t('vacancies description') }}</p>
    <p><strong>{{ $t('benefits ringoo') }}</strong></p>
    <ul>
      <li>{{ $t('benefits appreciate') }}</li>
      <li>{{ $t('benefits pay') }}</li>
      <li>{{ $t('benefits reward') }}</li>
      <li>{{ $t('benefits progress') }}</li>
      <li>{{ $t('benefits loyalty') }}</li>
      <li>{{ $t('benefits employment') }}</li>
    </ul>
    <p>{{ $t('vacancies more information') }}<a target="__blank" rel="nofollow" href="https://info.ringoo.ua/ua/jobs.html"> {{ $t('here') }}</a></p>
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
