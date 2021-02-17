<template>
  <div class="bundle-options">
    <product-bundle-option @option-changed="optionChanged" v-for="(option, index) in product.bundle_options" :key="('bundleOption_' + option.option_id)" v-show="index === currentIndex" :option="option" :title="option.title" :date="date" class="bundle-option" />
    <product-bundle-option-controls v-if="product.bundle_options.length > 1" class="controls" :index="currentIndex" :maxLength="product.bundle_options.length - 1" @onIndexChange="changeIndex($event)"/>
  </div>
</template>

<script>
import { ProductBundleOptions } from '@vue-storefront/core/modules/catalog/components/ProductBundleOptions.ts'
import ProductBundleOption from './ProductBundleOption'
import ProductBundleOptionControls from './ProductBundleOptionControls'

export default {
  mixins: [ProductBundleOptions],
  components: {
    ProductBundleOption,
    ProductBundleOptionControls
  },
  data: () => ({
    currentIndex: 0
  }),
  computed: {
    option() {
      // Temp solution for update product_options
      return this.product.bundle_options[this.currentIndex]
    },
    date() {
      return {
        from: this.product.bundle_gift_date_from,
        to: this.product.bundle_gift_date_to
      }
    }
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.bundle-options {
  position: relative;
}

.controls {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
