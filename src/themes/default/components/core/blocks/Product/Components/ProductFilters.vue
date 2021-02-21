<template>
  <div class="flex filter-container">
    <div
      class="error"
      v-if="getCurrentProduct.errors && Object.keys(getCurrentProduct.errors).length > 0"
    >
      {{ getCurrentProduct.errors | formatProductMessages }}
    </div>
    <div v-for="option in getProductOptions" :key="option.id" class="filter-wrapper">
      <div class="variants-label" data-testid="variantsLabel">
        {{ option.label }}:
        <span>{{ $t(getOptionLabel(option)) }}</span>
      </div>
      <div class="pt10">
        <div v-if="option.attribute_code == 'color'">
          <color-selector
            v-for="filter in getAvailableFilters[option.attribute_code]"
            :key="filter.id"
            :variant="filter"
            :selected-filters="getSelectedFilters"
            @change="changeFilter"
            :active-filters="getActiveFilters && getActiveFilters.memory || []"
          />
        </div>
        <div v-else>
          <button-selector
            context="product"
            :code="option.attribute_code"
            class="size-select mr10 mb10"
            v-for="filter in getAvailableFilters[option.attribute_code]"
            :key="filter.id"
            :variant="filter"
            :selected-filters="getSelectedFilters"
            @change="changeFilter"
            :active-filters="getActiveFilters && getActiveFilters.color || []"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ColorSelector from '../../../ColorSelector';
import ButtonSelector from '../../../ButtonSelector';
import {
  getAvailableFiltersByProduct,
  getSelectedFiltersByProduct
} from '@vue-storefront/core/modules/catalog/helpers/filters';

export default {
  components: {
    ColorSelector,
    ButtonSelector
  },
  data () {
    return {
      colorMatrix: null,
      memoryMatrix: null
    }
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct',
      getCurrentProductConfiguration: 'product/getCurrentProductConfiguration'
    }),
    getProductOptions () {
      if (
        this.getCurrentProduct.errors &&
        Object.keys(this.getCurrentProduct.errors).length &&
        Object.keys(this.getCurrentProductConfiguration).length
      ) {
        return []
      }
      return this.getCurrentProduct.configurable_options
    },
    getAvailableFilters () {
      return getAvailableFiltersByProduct(this.getCurrentProduct)
    },
    getSelectedFilters () {
      return getSelectedFiltersByProduct(this.getCurrentProduct, this.getCurrentProductConfiguration)
    },
    getOptionLabel () {
      return (option) => {
        const configName = option.attribute_code ? option.attribute_code : option.label.toLowerCase()
        return this.getCurrentProductConfiguration[configName] ? this.getCurrentProductConfiguration[configName].label : configName
      }
    },
    getActiveFilters () {
      if (!!this.colorMatrix && !!this.memoryMatrix) {
        return {
          color: this.colorMatrix[this.getSelectedFilters.color.id],
          memory: this.memoryMatrix[this.getSelectedFilters.obem_vstroennoj_pamyaty.id]
        }
      } return false
    }
  },
  created () {
    const product = this.getCurrentProduct
    const condition = product.type_id === 'configurable' && product.color_options && product.color_options.length && product.obem_vstroennoj_pamyaty_options && product.obem_vstroennoj_pamyaty_options.length;
    if (condition) {
      const children = [...product.configurable_children]
      const colors = {}
      const memory = {}
      children.forEach(it => {
        const colorVariants = children.filter(c => c.color === it.color);
        const memoryVariants = children.filter(c => c.obem_vstroennoj_pamyaty === it.obem_vstroennoj_pamyaty);
        Object.defineProperty(colors, it.color, {
          value: [...colorVariants].map(m => m.obem_vstroennoj_pamyaty),
          writable: true,
          enumerable: true
        });
        Object.defineProperty(memory, it.obem_vstroennoj_pamyaty, {
          value: [...memoryVariants].map(m => m.color),
          writable: true,
          enumerable: true
        });
      })
      this.colorMatrix = colors
      this.memoryMatrix = memory
    }
  },
  methods: {
    changeFilter (variant) {
      this.$bus.$emit('filter-on-change', variant)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter{
  &-container{
    margin-top: 16px;
    flex-wrap: wrap;
    .filter-wrapper{
      &:first-child{
        margin-right: auto;
      }
    }
  }
}
.variants-label{
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 15px;
  line-height: 24px;
  color: #5F5E5E;
  span{
    color: #000;
  }
}
</style>
