<template>
  <div class="shop-title">
    <svg class="shop-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" fill="#1A1919"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4308 5.5C10.4084 5.5 9.44373 5.85479 8.66961 6.50721V5.99891H7V14.5H8.66684V14.4963H8.66961V9.91834C8.72536 8.28321 9.89325 7.06492 11.4308 7.06492C11.7163 7.06492 11.9895 7.10697 12.2449 7.18658C12.2496 7.18781 12.2595 7.19107 12.2595 7.19107L13 5.796C12.507 5.60207 11.9772 5.5 11.4308 5.5Z" fill="#23BE20"/>
    </svg>
    <span class="shop-name">{{ street }}</span>
  </div>
</template>

<script>
export default {
  props: {
    street: {
      type: String,
      required: true,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-title {
  display: flex;
  align-items: flex-start;
}

.shop-icon {
  margin-right: 12px;
  min-width: 16px;
}

.shop-name {
  color: #1A1919;
  padding-right: 20px;
  font-family: DIN Pro;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #1A1919;
}
</style>