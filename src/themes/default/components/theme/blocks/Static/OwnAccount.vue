<template>
  <div class="own-account">
    <img src="/assets/static/own_account.jpg" alt="own_account">
    <h2>{{ $t('own account benefits') }}</h2>
    <p>{{ $t('own account members') }}</p>
    <h3>{{ $t('own account buy online') }}</h3>
    <p><strong>{{ $t('own account get points') }}</strong></p>
    <p>{{ $t('own account get points description') }}</p>
    <h3>{{ $t('own account buy in stores') }}</h3>
    <p><strong>{{ $t('own account how to get points') }}</strong></p>
    <p>{{ $t('own account hot to get points description') }}</p>
    <h3>{{ $t('own account use') }}</h3>
    <p>{{ $t('own account use description') }}</p>
    <h3>{{ $t('own account get bonus') }}</h3>
    <p>{{ $t('own account get bonus description') }}</p>
    <h3>{{ $t('own account become member') }}</h3>
    <ul>
      <li>{{ $t('own account download app') }}</li>
    </ul>
    <i>{{ $t('own account cart in the application') }}</i>
    <ul>
      <li>{{ $t('own account fill online') }}</li>
      <li>{{ $t('own account fill offline') }}</li>
    </ul>
    <p>
      {{ $t('own account questions') }}
      <a href="mailto:program@silpo.com.ua">program@silpo.com.ua</a>
    </p>
    <p>
      {{ $t('own account more information') }} 
      <a href="https://silpo.ua" target="__blanck">https://silpo.ua</a>
      {{ $t('own account hotline') }}
    </p>
    <p>
      {{ $t('own account rules') }}
      <a href="https://silpo.ua/about/personal-account/rules" target="__blank">silpo.ua/about/personal-account/rules</a>
    </p>
    <a href="https://silpo.ua/uploads/2020/02/12/5e43c6f71ac03.pdf" target="__blank">{{ $t('official rules') }}</a>
    <p>{{ $t('go to personal page') }} <a href="https://my.silpo.ua/login" target="__blank">my.silpo.ua</a></p>
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

  h2,h3 {
    font-family: sans-serif;
  }
</style>