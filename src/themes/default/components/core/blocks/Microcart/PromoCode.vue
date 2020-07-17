<template>
  <div class="promo-code-wrapper px40">
    <div class="promo-code-top-row">
      <span>{{ $t('Enter promotional code') }}</span>
    </div>
    <div class="promo-code-body-row row">
      <div class="col-sm-7">
        <input type="text" class="form-control w-100 promo-code-body-row-input"
               aria-describedby="emailHelp"
               :placeholder="$t('PROMOCODE')">
      </div>
      <div class="col-sm-5">
        <button class="promo-code-body-row-btn">{{ $t('To apply') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PromoCode"
  }
</script>

<style lang="scss" scoped>
  .promo-code {
    &-wrapper {
      background-color: white;
      padding-bottom: 20px;
    }
    &-top-row {
      margin-bottom: 20px;
      span {
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 100;
        font-size: 13px;
        line-height: 16px;
        padding-bottom: 4px;
        border-bottom: 1px dashed #1A1919;
      }
    }
    &-body-row {
      &-input {

        margin-bottom: 10px;

        background: #FFFFFF;
        border: 1px solid #E0E0E0;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 0 10px;
        height: 45px;
      }
      &-btn {

        margin-bottom: 10px;

        border: 1px solid #23BE20;
        box-sizing: border-box;
        border-radius: 4px;
        height: 45px;
        width: 100%;
        background-color: white;

        font-family: DIN Pro;
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 16px;
      }
    }
  }
</style>
