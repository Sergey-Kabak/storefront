<template>
  <button
    :class="{'active': isActive}"
    class="bg-cl-primary brdr-1 brdr-cl-primary brdr-square h5 cl-tertiary generic-selector"
    @click="$emit('change', variant)"
    :aria-label="$t('Select ' + variant.label)"
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
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-active: color(secondary);
  $color-disabled: color(secondary, $colors-border);

  .generic-selector {
    padding: 8px 10px;
    background: #F2F2F2;
    border-radius: 4px;
    font-family: 'DIN Pro';
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #1A1919;
    border: 2px solid transparent;
    box-sizing: border-box;

    &:hover,
    &:focus {
      border-width: 2px;
    }

    &.active {
      border-color: #23BE20;
      border-width: 2px;
      color: $color-active;
      background-color: transparent;
    }

    &:disabled {
      border-color: $color-disabled;
      color: $color-disabled;
      cursor: not-allowed;

      &:hover,
      &:after {
        border-width: 1px;
      }
    }
  }
</style>
