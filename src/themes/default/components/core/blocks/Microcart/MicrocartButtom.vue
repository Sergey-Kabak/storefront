<template>
    <div class="microcart-buttom-wrapper px40 w-100">
      <div class="microcart-buttom-top-row">
        <span>{{ $t('Total') }}:</span>
        <span>4151.23</span>
      </div>
      <div class="row microcart-buttom-body-row">
        <div class="col-sm-6 microcart-buttom-body-row-left">
          <button class="btn w-100" :aria-label="$t('Continue shopping')">{{ $t('Continue shopping') }}</button>
        </div>
        <div class="col-sm-6 microcart-buttom-body-row-right">
          <button class="btn w-100" :aria-label="$t('Go to checkout')">{{ $t('Go to checkout') }}</button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "MicrocartButtom"
    }
</script>

<style lang="scss" scoped>
  .microcart-buttom {
    &-wrapper {
      position: absolute;
      background-color: white;
      bottom: 0;
      box-sizing: border-box;
      padding-bottom: 20px;
    }
    &-top-row {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 30px;
      margin-bottom: 10px;

      display: flex;
      justify-content: space-between;
    }
    &-body-row {
      &-left {
        button {
          margin-bottom: 10px;
          padding: 10px 20px;
          height: 45px;

          background: #FFFFFF;
          border: 1px solid #23BE20;
          box-sizing: border-box;
          border-radius: 4px;

          font-family: DIN Pro;
          font-style: normal;
          font-weight: bold;
          font-size: 15px;
          line-height: 16px;
          align-items: center;
          text-align: center;
        }
      }
      &-right {
        button {
          padding: 11px 20px;
          height: 45px;

          border: none;
          box-sizing: border-box;
          background: #23BE20;
          border-radius: 4px;
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 16px;
          align-items: center;
          text-align: center;
        }
      }
    }
  }
</style>
