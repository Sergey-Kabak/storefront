<template>
  <button
    class="button-selector"
    :class="{ 'active': isActive }"
    @click="$emit('change', variant)"
  >
    {{ variant.label }}
  </button>
</template>

<script>
import filterMixin from 'theme/mixins/filterMixin.ts';

export default {
  mixins: [filterMixin]
}
</script>

<style lang="scss" scoped>
  .button-selector {
    border-radius: 4px;
    padding: 8px 10px;
    border: none;
    font-family: DIN Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    transition: ease-in 0.1s;
    &:not(.active):hover{
      background: #e4e4e4;
    }
    &.active {
      border: 1px solid #23BE20;
    }
  }
</style>
