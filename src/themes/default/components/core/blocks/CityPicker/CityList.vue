<template>
  <div class="city-list">
    <city-item v-for="(city, index) in cities" :city="city" :key="index" @onSelectCity="selectCity($event)" :selectedCity="selectedCity"/>
  </div>
</template>

<script>
import CityItem from 'theme/components/core/blocks/CityPicker/CityItem'

export default {
  components: {
    CityItem
  },
  props: {
    cities: {
      type: Array,
      required: true,
      default: () => []
    },
    selectedCity: {
      type: String,
      required: false,
      default: null
    }
  },
  methods: {
    selectCity(city) {
      this.$emit('onSelectCity', city)
    }
  }
}
</script>

<style lang="scss" scoped>
.city-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 24px 24px 12px 24px;
  margin-bottom: 16px;
}
</style>
