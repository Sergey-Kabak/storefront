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
import filterMixin from 'theme/mixins/filterMixin.ts'

export default {
  mixins: [filterMixin]
}
</script>

<style lang="scss" scoped>
  .button-selector {
    background-color: #F2F2F2;
    color: #1A1919;
    text-transform: uppercase;
    border-radius: 4px;
    padding: 8px 10px;
    border: 1px solid #F2F2F2;
    font-family: DIN Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    transition: ease-in 0.1s;
    &:disabled{
      color: rgba(26, 25, 25, 0.38);
    }
    &:not(.active):hover{
      border: 1px solid #BDBDBD;
    }
    &:not(.active):focus{
      border: 1px solid #BDBDBD;
    }
    &.active {
      background-color: #FFF;
      border: 1px solid #23BE20;
    }
  }
</style>
