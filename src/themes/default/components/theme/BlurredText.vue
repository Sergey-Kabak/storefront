<template>
  <div class="blurred-text-wrapper" @click="$emit('onClick', $event)">
    <span :style="{'color': color}" class="blurred-text">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.blurred-text {
  position: relative;
  display: inline-block;
  font-family: DIN Pro;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 8px;
    bottom: -3px;
    left: -4px;
    opacity: 0.12;
    background-color: currentColor;
  }
}
</style>
