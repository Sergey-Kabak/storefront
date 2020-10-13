<template>
  <div class="credit-product-wrapper">
    <div class="credit-product">
      <div class="credit-product-name">
        Стандарт
      </div>

      <div @click="showCreditPopup()" class="align-right underline cursor">
        Изменить
      </div>
    </div>
    <div class="credit-info">
      <span>Первый взнос 0 ₴, 24 платежа</span> <b>по</b> <strong>1 050 ₴</strong> <b>/ мес</b>
    </div>
    {{banks}}
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
  },
  methods: {
    showCreditPopup () {
      this.$bus.$emit('modal-show', 'modal-credits')
    }
  }
}
</script>

<style lang="scss" scoped>
  .credit-product{
    &-wrapper{
      background: #E4F9E4;
      border-radius: 4px;
      padding: 18px 16px;
      margin-bottom: 32px;
      width: 100%;
      user-select: text;
    }
    &-name{
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 0;
      font-size: 15px;
      line-height: 24px;
      color: #1A1919;
    }
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    .align-right{
      margin-left: auto;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 0;
      font-size: 13px;
      line-height: 16px;
      color: #1A1919;
      padding-bottom: 4px;
      border-bottom: 1px dashed #1A1919;
    }
    .cursor{
      cursor: pointer;
    }
  }
  .credit-info{
    text-align: left;
    span{
      font-family: DIN Pro;
      font-weight: 700;
      font-size: 13px;
      line-height: 16px;
      color: #5F5E5E;
    }
    b{
      font-family: DIN Pro;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      color: #1A1919;
    }
    strong{
      font-family: DIN Pro;
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
      color: #1A1919;
    }
  }
</style>
