<template>
  <div class="bundle-options">
    <div v-for="(option, index) in product.bundle_options" :key="('bundleOption_' + option.option_id)" class="bundle-option">
      <microcart-product-bundle-option :option="option" :index="index" />
    </div>
  </div>
</template>

<script>
import MicrocartProductBundleOption from './MicrocartProductBundleOption'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: {
    MicrocartProductBundleOption
  }
}
</script>

<style lang="scss" scoped>
.bundle-options {
  position: relative;
}

.control {
  position: absolute;
  display: flex;
  align-items: center;
  padding: 4px;
  max-width: 89px;
  background: #F9F9F9;
  border-radius: 4px;
}

.control-info {
  display: flex;
  align-items: center;
}

.arrow-right,
.arrow-left {
  display: flex;
  cursor: pointer;

  &:hover {
    svg {
      fill: #1A1919;
    }
  }
}

.arrow-left {
  margin-right: 4px;
}

.arrow-right {
  margin-left: 4px;
}

.current-index {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #000000;
}

.max-index {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #5F5E5E;
}
</style>
