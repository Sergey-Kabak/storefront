<template>
  <div>
    <div v-for="(group, key) in data" :key="key">
      <compare-group :group="group" :name="key" :products="products"/>
    </div>
  </div>
</template>

<script>
import CompareGroup from './CompareGroup';
export default {
  components: {
    CompareGroup
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    products: {
      type: Array
    },
    active: {
      type: String,
      default: () => ''
    }
  }
}
</script>
