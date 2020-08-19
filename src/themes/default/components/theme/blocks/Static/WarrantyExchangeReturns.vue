<template>
  <div class="warranty-exchange-return">
    {{ $t('warranty clarification') }}
    <h2>{{ $t('exchange') }}</h2>
    {{ $t('exchange description') }}
    <ul>
      <li>{{ $t('exchange product condition use') }}</li>
      <li>{{ $t('exchange product condition marketable') }}</li>
      <li>{{ $t('exchange product condition properties') }}</li>
      <li>{{ $t('exchange product condition doc') }}</li>
    </ul>
    <router-link to="/service-centers">{{ $t('addresses of service centers') }}</router-link>
    {{ $t('exchange info') }}
    <h2>{{ $t('exchange product proper quality') }}</h2>
    {{ $t('article 9') }}
    <ul>
      <li>{{ $t('exchange product condition use') }}</li>
      <li>{{ $t('exchange product condition marketable') }}</li>
      <li>{{ $t('exchange product condition properties') }}</li>
      <li>{{ $t('exchange product condition doc') }}</li>
    </ul>
    <h3>{{ $t('explanation') }}:</h3>
    <p>{{ $t('explanation product proper quality') }}</p>
    <h2>{{ $t('exchange product improper quality') }}</h2>
    <p>{{ $t('article 8') }}</p>
    <ul>
      <li>{{ $t('proportional price reduction') }}</li>
      <li>{{ $t('elimination defects') }}</li>
      <li>{{ $t('refund costs') }}</li>
    </ul>
    <p>{{ $t('article 8 description') }}</p>
    <a
      href="http://zakon2.rada.gov.ua/laws/show/1023-12"
      target="_blank"
      rel="noopener"
      >{{ $t('consumer protection act') }}</a
    >.
    <h2>{{ $t('warranty') }}</h2>
    <p>{{ $t('warranty description') }}</p>
    <router-link to="/service-centers">{{ $t('addresses of service centers') }}</router-link>
    <p>{{ $t('exchange info') }}</p>
    <p>{{ $t('warranty transportation') }}</p>
  </div>
</template>

<script>

export default {};
</script>

<style lang="scss" scoped>
  .warranty-exchange-return {
    text-align: justify;
  }

  h2, h3 {
    font-family: sans-serif;
  }
</style>
