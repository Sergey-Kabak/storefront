<template>
  <div>
    <div v-for="(group, key) in data[active]" :key="key">
      {{key}}
      <hr>
      <compare-group :group="group" :product="products[key]"/>
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
