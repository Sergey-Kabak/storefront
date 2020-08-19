<template>
  <div class="contacts">
    <h2>{{ $t('contacts online store') }} ringoo.ua</h2>
    <p>
      {{ $t('contacts online store description') }}
      <router-link to="/shops">{{ $t('contacts store map') }}...</router-link>
      {{ $t('contacts online store promo') }}
      <router-link to="/promotional-offers">тут...</router-link>
    </p>
    <h2>{{ $t('contacts questions') }}</h2>
    <ul>
      <li>
        {{ $t('call') }} <a href="tel:+380970908707">(097) 090-87-07</a> {{ $t('or') }}
        <a href="tel:+380730908707">(073) 090-87-07</a>.
        <strong>{{ $t('work time') }}</strong>: {{ $t('contacts call') }}
      </li>
      <li>
        {{ $t('contacts write') }}
        <a href="mailto:info@ringoo.ua">info@ringoo.ua</a>,
        {{ $t('contacts write answer') }}
      </li>
    </ul>
    {{ $t('contacts more about ringoo') }} <router-link to="/about-the-company">{{ $t('here') }}...</router-link>
    <h2>{{ $t('our store') }}</h2>
    <p>
      {{ $t('our store description') }}
      <router-link to="/shops">{{ $t('here') }}...</router-link>
    </p>
    
    <h2>{{ $t('contacts job') }}</h2>
    {{ $t('contacts job description') }}<router-link to="/work-in-the-company"> {{ $t('here') }}...</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  h2 {
    font-family: sans-serif;

    &:first-child {
      margin-top: 0;
    }
  }
</style>
