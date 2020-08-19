<template>
  <div class="company">
    <p class="title">{{ $t('company description') }}</p>
    <img src="/assets/static/ringoo_company.jpg" alt="ringoo_company">
    <p>{{ $t('company chain') }}</p>
    <h3>{{ $t('our achievements') }}</h3>
    <ul>
      <li>96 {{ $t('company outlets') }}</li>
      <li>19 {{ $t('company areas') }}</li>
      <li>63 {{ $t('company settlements') }}</li>
    </ul>
    <h3>{{ $t('company do you know') }}</h3>
    <p>{{ $t('company do you know description') }}</p>
    <img src="/assets/static/ringoo_apples.png" alt="ringoo_apples">
    <h3>{{ $t('our advantages') }}</h3>
    <p>
      <strong>{{ $t('team') }}</strong>{{ $t('company team description') }}
    </p>
    <ul>
      <li>{{ $t('company command consult') }}</li>
      <li>{{ $t('company command help') }}</li>
      <li>{{ $t('company command set up') }}</li>
      <li>{{ $t('company command advice') }}</li>
    </ul>
    <p>
      <strong>{{ $t('honesty') }}</strong> {{ $t('company honesty description') }}
    </p>
    <p>
      <strong>{{ $t('assortment') }}</strong> {{ $t('company assortment description') }}
    </p>
    <p>
      <strong>{{ $t('profit') }}</strong> {{ $t('company profit descipriton') }}
    </p>
    <h3>{{ $t('own brand') }}</h3>
    <p>{{ $t('company own brand description') }}</p>
    <img src="/assets/static/ringoo_brand.png" alt="ringoo_brand">
    <h3>{{ $t('official partners') }}</h3>
    <p>{{ $t('company official partners description') }}</p>
    <p>{{ $t('company contact') }}
      <router-link>{{ $t('Contact us') }}</router-link> 
    </p>
  </div>
</template>

<script>

export default {}
</script>

<style lang="scss" scoped>
  img {
    width: 100%;
    height: auto;
  }

  .title {
    margin-top: 0;
  }
</style>
