<template>
  <div class="input-color-wrapper relative inline-flex">
    <button
    :class="['bg-cl-transparent brdr-1 brdr-circle brdr-cl-transparent :brdr-cl-bg-primary pointer color', isActive ? 'active' : '', {'disabled': isDisabled}]"
    @click="$emit('change', variant)"
    :aria-label="$t('Select color ') + variant.label"
    :disabled="isDisabled"
  >
    <span
      class="absolute brdr-circle brdr-1 brdr-cl-secondary block color-inside"
      :class="{'is-white' : colorFrom(variant.label).indexOf('White') > -1}"
      :style="colorFrom(variant.label)"
    />
  </button>
  <span class="tooltip absolute">{{ $t(variant.label) }}</span>
  </div>
</template>

<script>
import config from 'config';
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
  },
  methods: {
    colorFrom (label) {
      if (!label) return ''
      if (config.products.colorMappings) {
        if (typeof config.products.colorMappings[label] !== 'undefined') {
          label = config.products.colorMappings[label]
        }
      }
      if (label.indexOf('/') >= 0) label = label.replace('/', ',') // to be honest - this is a hack for colors like "ink/white"
      if (label && label.toString().indexOf(',') >= 0) {
        return 'background: linear-gradient(' + label + ')'
      } else if (label === 'Multi') {
        return 'background: linear-gradient(180deg, #40E0D0 0%, #FF8C00 50%, #FF0080 100%)';
      } else {
        return 'background-color: ' + label
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-active: color(primary);
  .disabled{
    position: relative;
    cursor: no-drop;
    &:before{
      position: absolute;
      left: 50%;
      top: 0;
      content: '';
      width: 1px;
      height: 100%;
      background: #E0E0E0;
      transform: rotate(-45deg);
      z-index: 1;
    }
  }
  .color {
    width: 38px;
    height: 38px;

    &.active {
      border-color: #23BE20;
    }
  }

  .color-inside {
    width: 32px;
    height: 32px;
    left: 50%;
    top: 50%;
    border: 1px solid #fff;
    transform: translate(-50%,-50%)
  }
  @keyframes tooltip {
    0%{
      opacity: 0;
      top: 90%;
    }
    100%{
      opacity: 1;
      top: calc(100% + 9px);
    }
  }

  .input-color-wrapper{
    margin: 0 6px 6px 0;
    .color{
      margin-right: 0;
      padding: 0;
    }
    &:hover{
      .tooltip{
        display: block;
        animation : tooltip 0.35s
      }
    }
  }
  .tooltip{
      display: none;
      top: calc(100% + 9px);
      background: #FFFFFF;
      border-radius: 2px;
      font-size: 14px;
      line-height: 16px;
      color: #1A1919;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14);
      min-width: 100%;
      text-align: center;
      padding: 4px 8px;
      z-index: 2;
  }
  .is-white{
    border: 1px solid #ebebeb;
  }
</style>
