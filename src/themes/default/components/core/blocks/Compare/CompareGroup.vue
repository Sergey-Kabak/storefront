<template>
  <div>
    <div v-for="(attrs, key) in group" :key="key">
      <h3>{{key}}</h3>
      <div v-for="(attr, key) in attrs" :key="key">
        <compare-attribute
          v-if="attr"
          :product="product"
          :attribute="attr"
          empty-placeholder="N/A"
        />
        <div v-else>
          N/A
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompareAttribute from './CompareAttribute';

export default {
  components: {
    CompareAttribute
  },
  props: {
    group: {
      type: Object,
      default: () => {}
    },
    product: {
      type: Object,
      required: true
    }
  }
}
</script>
