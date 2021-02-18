<template>
  <button
    class="button-selector"
    ref="buttonOption"
    :class="{ 'active': isActive, 'disabled': isDisabled }"
    @click="$emit('change', variant)"
    :disabled="isDisabled"
  >
    {{ variant.label }}
  </button>
</template>

<script>
import filterMixin from 'theme/mixins/filterMixin.ts';

export default {
  mixins: [filterMixin],
  props: {
    activeFilters: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isDisabled () {
      return !!this.activeFilters.length && !this.activeFilters.includes(+this.variant.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .disabled{
  position: relative;
  cursor: no-drop;
  &:before{
    position: absolute;
    left: 33px;
    top: -16px;
    content: '';
    width: 1px;
    height: 65px;
    background: #E0E0E0;
    transform: rotate(-56deg);
    z-index: 1;
  }
}
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
