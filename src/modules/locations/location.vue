<template>
  <div class="location">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col-sm p-0">
          <div class="d-flex">
            <div class="svg-logo" v-if="location.number">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M32.0519 11.8426C32.1728 11.804 32.332 11.8811 32.4911 12.0932C32.4911 12.0932 32.4911 12.0932 39.6852 19.2C40.1054 19.6241 40.1054 20.2667 39.6852 20.5815C39.6852 20.5815 39.6852 20.5815 32.4911 27.7976C32.332 28.0096 32.1728 28.061 32.0519 27.9968C31.9309 27.9325 31.8545 27.7462 31.8545 27.4763V12.3052C31.8545 12.0418 31.9309 11.8811 32.0519 11.8426Z" fill="#EC1B23"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7448 0H20.2541L20.7443 0.205623C20.7443 0.205623 20.7443 0.205623 28.1485 7.63374C28.4668 8.05783 28.3586 8.37912 27.8302 8.37912C27.8302 8.37912 27.8302 8.37912 24.7615 8.37912C24.2331 8.37912 23.8129 8.80321 23.8129 9.33655C23.8129 9.33655 23.8129 9.33655 23.8129 14.8498C23.8129 15.3831 23.3864 15.8072 22.7497 15.8072C22.7497 15.8072 22.7497 15.8072 17.3573 15.8072C16.8289 15.8072 16.4024 15.3831 16.4024 14.8498C16.4024 14.8498 16.4024 14.8498 16.4024 9.33655C16.4024 8.80321 15.9822 8.37912 15.4474 8.37912H12.1687C11.6403 8.37912 11.5321 8.05783 11.8504 7.63374C11.8504 7.63374 11.8504 7.63374 19.2609 0.205623L19.7448 0Z" fill="#EC1B23"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.14587 11.6819C8.27956 11.7461 8.36233 11.9325 8.36233 12.2024V27.6883C8.36233 27.9582 8.27956 28.1188 8.14587 28.1702C8.01854 28.2216 7.83391 28.1702 7.61745 28.0096C7.61745 28.0096 7.61745 28.0096 0.315139 20.5815C-0.105046 20.2666 -0.105046 19.6241 0.315139 19.2C0.315139 19.2 0.31514 19.2 7.61745 11.8811C7.83391 11.669 8.01854 11.6176 8.14587 11.6819Z" fill="#EC1B23"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3575 23.8715C17.3575 23.8715 17.3575 23.8715 22.7499 23.8715C23.3865 23.8715 23.8131 24.2956 23.8131 24.8289C23.8131 24.8289 23.8131 24.8289 23.8131 30.6634C23.8131 31.2996 24.2333 31.7237 24.7617 31.7237H27.6202C28.1486 31.7237 28.3587 32.0385 27.9385 32.3598C27.9385 32.3598 27.9385 32.3598 20.7445 39.6787C20.528 39.8907 20.267 40 19.9996 40C19.7386 40 19.4712 39.8907 19.2611 39.6787C19.2611 39.6787 19.2611 39.6787 12.067 32.3598C11.6404 32.0385 11.8505 31.7237 12.379 31.7237C12.379 31.7237 12.3789 31.7237 15.4476 31.7237C15.9824 31.7237 16.4025 31.2996 16.4025 30.6634C16.4025 30.6634 16.4025 30.6634 16.4025 24.8289C16.4025 24.2956 16.8291 23.8715 17.3575 23.8715Z" fill="#EC1B23"/>
              </svg>
            </div>
            <div class="logo" v-else>
              <img src="/assets/custom/Ringo_logo_green.svg" alt="logo">
            </div>
            <div class="d-flex flex-column">
              <div class="name">{{ location.name }}</div>
              <div class="phone">{{ location.phone || '044 234 44 54' }}</div>
              <!--<div class="time">{{ $t('Pick up tomorrow from 15:00') }}</div>-->
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="d-flex flex-column">
            <div class="address">
<!--              {{ $t('street') }}. -->
              {{ location.streetname }} {{ location.streetname2 }}</div>
            <div class="working-time">{{ location.time || $t('Пн-Пт: 8:00-20:00; Сб: 10:00-18:00; Вс: 11:00-17:00') }}</div>
          </div>
        </div>
        <div class="col-sm ml-auto p-0">
          <div class="d-flex flex-column align-right">
            <div class="status">{{ location.status || $t('All products are in stock') }}</div>
            <div class="action">
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
  props: ['location'],
}
</script>

<style lang="scss" scoped>
  @import '~bootstrap';

</style>

<style lang="sass">
.location
  border-bottom: 1px solid #e0e0e0
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
  .svg-logo
    width: 40px
    height: 40px
    min-width: 40px
    margin-right: 15px
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
    color: #5F5E5E
    font-weight: 600
  .working-time
    margin-top: 16px
    font-family: 'DIN Pro'
    font-size: 13px
    line-height: 16px
    color: #5F5E5E
  .phone
    font-family: 'DIN Pro'
    font-size: 13px
    line-height: 16px
    color: #5F5E5E
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
