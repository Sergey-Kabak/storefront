<template>
  <div class="promo-block">
    <picture>
      <source :srcset="baseUrl('xxl')" media="(min-width: 1921px)">
      <source :srcset="baseUrl('xl')" media="(min-width: 1441px) and (max-width: 1920px)">
      <source :srcset="baseUrl('lg')" media="(min-width: 1281px) and (max-width: 1440px)">
      <source :srcset="baseUrl('md')" media="(min-width: 1025px) and (max-width: 1280px)">
      <source :srcset="baseUrl('sm')" media="(min-width: 769px) and (max-width: 1024px)">
      <source :srcset="baseUrl('xs')" media="(min-width: 576px) and (max-width: 768px)">
      <img :src="baseUrl('mob')" alt="promo" class="promo-image">
    </picture>
  </div>
</template>

<script>
export default {
  methods: {
    baseUrl (resolution) {
      return `/assets/promo/march-8-${resolution}.jpg`
    }
  }
}
</script>

<style lang="scss" scoped>
.promo{
  &-block{
    margin-top: -28px;
  }
  &-image{
    max-width: 100%;
  }
}
</style>
