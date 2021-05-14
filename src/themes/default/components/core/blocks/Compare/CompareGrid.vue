<template>
  <div>
    <div v-if="Object.keys(data).length">
      <template v-for="(group, key) in data">
        <compare-group :group="group" :key="key" :name="key" :products="products"/>
      </template>
    </div>
    <div v-else>
      {{ $t('No differences') }} ¯\_(ツ)_/¯
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
    }
  }
}
</script>
