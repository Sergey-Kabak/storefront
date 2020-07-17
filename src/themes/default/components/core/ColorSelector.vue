<template>
  <button
    :class="['mr10 mb5 bg-cl-transparent brdr-1 brdr-circle brdr-cl-transparent :brdr-cl-bg-primary relative inline-flex pointer color', isActive ? 'active' : '']"
    @click="$emit('change', variant)"
    :aria-label="$t('Select color ') + variant.label"
  >
    <span
      class="absolute brdr-circle brdr-1 brdr-cl-secondary block color-inside"
      :style="colorFrom(variant.label)"
    />
  </button>
</template>

<script>
import config from 'config'
import filterMixin from 'theme/mixins/filterMixin.ts'

export default {
  mixins: [filterMixin],
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

  .color {
    width: 34px;
    height: 34px;

    &.active {
      border-color: #23BE20;
    }
  }

  .color-inside {
    width: 24px;
    height: 24px;
    left: 50%;
    top: 50%;
    border: 1px solid #ebebeb;
    transform: translate(-50%,-50%)
  }
</style>
