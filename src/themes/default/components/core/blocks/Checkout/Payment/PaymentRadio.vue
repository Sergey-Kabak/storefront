<template>
  <div class="payment radio">
    <div class="radio-button" :class="{ 'active': active }" />
    <span class="payment-name">{{ $t(payment.code) }}</span>
  </div>
</template>

<script>
export default {
  props: {
    payment: {
      type: Object,
      required: true,
      default: () => {}
    },
    active: {
      type: Boolean,
      required: true,
      default: false
    }
  },
};
</script>

<style lang="scss" scoped>
.payment {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;
  cursor: pointer;
}

.payment-name {
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 16px;
  color: #1A1919;
}
</style>