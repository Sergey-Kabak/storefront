<template>
  <div>
    <compare-variant-buttons @difference="eventEmitter" class="mobile" />
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
import CompareVariantButtons from './CompareVariantButtons';

export default {
  components: {
    CompareGroup,
    CompareVariantButtons
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    products: {
      type: Array
    }
  },
  methods: {
    eventEmitter (val) {
      this.$emit('difference', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile{
  @media (min-width: 769px) {
    display: none;
  }
}
::v-deep .compare-nav__buttons{
  padding-bottom: 16px;
  width: calc(100vw - 48px);
  position: sticky;
  left: 0;
}
</style>
