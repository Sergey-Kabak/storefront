<template>
  <div class="shop-schedule-wrapper" v-if="schedule">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="shop-icon">
        <path d="M9.99163 1.66602C5.39163 1.66602 1.66663 5.39935 1.66663 9.99935C1.66663 14.5993 5.39163 18.3327 9.99163 18.3327C14.6 18.3327 18.3333 14.5993 18.3333 9.99935C18.3333 5.39935 14.6 1.66602 9.99163 1.66602ZM9.99996 16.666C6.31663 16.666 3.33329 13.6827 3.33329 9.99935C3.33329 6.31602 6.31663 3.33268 9.99996 3.33268C13.6833 3.33268 16.6666 6.31602 16.6666 9.99935C16.6666 13.6827 13.6833 16.666 9.99996 16.666ZM10.4166 5.83268H9.16663V10.8327L13.5416 13.4577L14.1666 12.4327L10.4166 10.2077V5.83268Z" fill="#BDBDBD"/>
      </svg>
      <span class="shop-schedule">{{ schedule }}</span>
  </div>
</template>

<script>
export default {
  props: {
    schedule: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-schedule-wrapper {
  display: flex;
  align-items: flex-start;
}

.shop-icon {
  margin-right: 8px;
  min-width: 20px;
}

.shop-schedule {
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 13px;
  line-height: 20px;
  color: #5F5E5E;
}
</style>