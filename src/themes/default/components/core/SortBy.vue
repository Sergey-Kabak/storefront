<template>
  <div class="sort-by">
    <base-select @change="onChange" :options="sortingVariants" :value="sortby && sortby.label" :resultValue="(it) => it.label"> </base-select>
  </div>
</template>

<script>
import SortBy from '@vue-storefront/core/compatibility/components/SortBy';
import { products } from 'config';
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect.vue';
export default {
  mixins: [SortBy],
  components: {
    BaseSelect
  },
  props: {
    hasLabel: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      sortby: products.defaultSortBy
    }
  },
  methods: {
    onChange(id) {
      this.sortby = this.sortingVariants.find(it => it.label === id)
      this.sort()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
