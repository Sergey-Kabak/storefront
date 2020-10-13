<template>
  <div class="credit-product-wrapper">
    <div class="credit-product">
      <div>
        Стандарт
      </div>

      <div>
        Изменить
      </div>
    </div>
    <div class="credit-info">
      <span>Первый взнос 0 ₴, 24 платежа</span> <b>по</b> <strong>1 050 ₴</strong> <b>/ мес</b>
    </div>
<!--    {{banks}}-->
<!--    {{ Math.abs(totalPrice) | price(storeView) }}-->
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
export default {
  props: ['banks', 'totalPrice'],
  computed: {
    storeView () {
      return currentStoreView()
    }
  }
}
</script>

<style lang="scss" scoped>
  .credit-product{
    &-wrapper{
      background: #E4F9E4;
      border-radius: 4px;
      padding: 18x 16px;
    }
  }
</style>
