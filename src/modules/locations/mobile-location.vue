<template>
  <div class="location">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col-sm p-0">
          <div class="d-flex item-center">
            <div class="logo">
              <img src="/assets/custom/Ringo_logo_green.svg" alt="logo">
            </div>
            <div class="d-flex flex-column">
              <div class="name">{{ location.name }}</div>
              <div class="phone">{{ location.phone }}</div>
            </div>
            <div class="d-flex ml-auto">
              <!--<div class="time">{{ $t('Pick up tomorrow from 15:00') }}</div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <div class="d-flex flex-column">

            <div class="address">{{ location.streetname }} {{ location.streetname2 }}</div>
            <div class="working-time">{{ location.time || $t('Пн-Пт: 8:00-20:00; Сб: 10:00-18:00; Вс: 11:00-17:00') }}</div>
          </div>
        </div>
      </div>
      <div class="row mt10 mb10">
        <div class="col-sm">
          <div class="d-flex item-center justify-content-between">
            <div class="status">{{ location.status || $t('All products are in stock') }}</div>
            <div class="action ml-auto">
              <button @click="$bus.$emit('checked-location', location)" type="button" class="btn btn-success">{{ $t('Pick up here') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['location']
}
</script>

<style lang="scss" scoped>
  @import '~bootstrap';

</style>

<style lang="sass" scoped>
  .location
    border-bottom: 1px solid #e0e0e0
    .item-center
      align-items: center
    .logo
      width: 40px
      min-width: 40px
      height: 40px
      background: #1A1919
      border-radius: 100%
      padding: 10px 6px
      box-sizing: border-box
      margin-right: 15px
      img
        width: 100%
    .name
      font-family: 'DIN Pro'
      font-size: 14px
      line-height: 16px
      color: #19223D
      font-weight: 600
    .address
      font-family: 'DIN Pro'
      font-size: 13px
      line-height: 16px
      color: #595858
      font-weight: 600
    .working-time
      font-family: 'DIN Pro'
      font-size: 13px
      line-height: 16px
      color: #595858
    .phone
      font-family: 'DIN Pro'
      font-size: 13px
      line-height: 16px
      color: #595858
    .time
      font-family: 'DIN Pro'
      font-size: 13px
      line-height: 16px
      color: #1A1919
      margin-top: 10px
    .status
      font-family: 'DIN Pro'
      font-size: 13px
      line-height: 16px
      color: #23BE20
      margin-bottom: 16px
</style>
