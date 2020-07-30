<template>
  <div class="sidebar">
    <div class="active-filters" v-if="hasActiveFilters">
      <active-filter
        v-for="(activeFilter, index) in getActiveFilters"
        :filter="activeFilter"
        :key="index"
        @remove="$emit('changeFilter', $event)"
      />
    </div>
    <span
      class="clear-filters"
      @click="resetAllFilters"
      v-show="hasActiveFilters"
    >
      {{ $t('Clear filters') }}
    </span>
    <h4 class="sidebar__header relative mt25 flex center-md">
      <img src="assets/custom/Filter.svg" alt="">
      <span class="filter-title">
        {{ $t('Filter') }}
      </span>
    </h4>
    <div
      v-for="(filter, filterIndex) in availableFilters"
      :key="filterIndex"
      class="filter"
    >
      <category-filter :label="filterIndex + '_filter'" v-if="isCheckboxFilter(filterIndex)">
        <checkbox-selector
          context="category"
          :code="filterIndex"
          v-for="(item, index) in sortById(filter)"
          :key="index"
          :variant="item"
          :selected-filters="getCurrentFilters"
          @change="$emit('changeFilter', $event)"
        />
      </category-filter>
      <category-filter :label="filterIndex + '_filter'" v-else-if="filterIndex === 'color'">
        <color-selector
          context="category"
          :code="filterIndex"
          v-for="(color, index) in filter"
          :key="index"
          :variant="color"
          :selected-filters="getCurrentFilters"
          @change="$emit('changeFilter', $event)"
        />
      </category-filter>
      <category-filter :label="filterIndex + '_filter'" v-else-if="isButtonFilter(filterIndex)">
        <button-selector
          context="category"
          :code="filterIndex"
          class="size-select mr10 mb10"
          v-for="(item, index) in sortById(filter)"
          :key="index"
          :variant="item"
          :selected-filters="getCurrentFilters"
          @change="$emit('changeFilter', $event)"
        />
      </category-filter>
      <category-filter :label="filterIndex + '_filter'" v-else-if="filterIndex==='price'">
        <price-selector
          context="category"
          class="price-select mb10 block"
          :code="filterIndex"
          v-for="(price, index) in filter"
          :key="index"
          :id="price.id"
          :from="price.from"
          :to="price.to"
          :content="price.label"
          :variant="price"
          :selected-filters="getCurrentFilters"
          @change="$emit('changeFilter', $event)"
        />
      </category-filter>
    </div>
  </div>
</template>

<script>
import ColorSelector from 'theme/components/core/ColorSelector'
import PriceSelector from 'theme/components/core/PriceSelector'
import ButtonSelector from 'theme/components/core/ButtonSelector'
import CheckboxSelector from 'theme/components/core/CheckboxSelector'
import CategoryFilter from 'theme/components/core/blocks/Category/CategoryFilter'
import ActiveFilter from 'theme/components/core/blocks/Category/ActiveFilter'
import pickBy from 'lodash-es/pickBy'

export default {
  components: {
    ColorSelector,
    PriceSelector,
    CategoryFilter,
    ButtonSelector,
    CheckboxSelector,
    ActiveFilter
  },
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasActiveFilters () {
      return this.$store.getters['category-next/hasActiveFilters']
    },
    getCurrentFilters () {
      return this.$store.getters['category-next/getCurrentFilters']
    },
    getActiveFilters () {
      return Object.values(this.getCurrentFilters).reduce((acc, val) => acc.concat(val), [])
    },
    availableFilters () {
      return pickBy(this.filters, (filter, filterType) => { return (filter.length && !this.$store.getters['category-next/getSystemFilterNames'].includes(filterType)) })
    }
  },
  methods: {
    resetAllFilters () {
      this.$store.dispatch('category-next/resetSearchFilters')
    },
    sortById (filters) {
      return [...filters].sort((a, b) => { return a.id - b.id })
    },
    // should be received from config
    isCheckboxFilter (filterName) {
      return ['manufacturer', 'dyagonal_ekrana', 'emkost_akkumulyatora_mach', 'sim', 'slot_dlya_karty_pamyaty', 'cores', 'material_korpusu', 'operatsyonnaya_systema'].includes(filterName)
    },
    isButtonFilter (filterName) {
      return ['obem_vstroennoj_pamyaty', 'obem_operatyvnoj_pamyaty', 'camerares', 'frontalnaya_kamera_mp'].includes(filterName)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  &__header {
    margin-bottom: 0px;
    min-height: 47px;
    justify-content: flex-start;
    flex-wrap: wrap;
    border-bottom: 1px solid #E0E0E0;
    border-top: 1px solid #E0E0E0;

    .filter-title {
      display: flex;
      align-items: center;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: #23BE20;
    }

    img {
        margin-right: 19px;
    }

    &__clear {
      align-self: center;
      font-size: .8em;
      min-width: 102px;
      @media only screen and (min-width: 768px) and (max-width: 770px) {
        margin-top: 20px;
      }
    }
  }

  &__inline-selecors {
    display: flex;
  }

  .filter:not(:last-child) {
    border-bottom: 1px solid #E0E0E0;
  }

  .active-filters {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }

  .clear-filters {
    font-family: DIN Pro;
    font-style: normal;
    font-size: 13px;
    line-height: 16px;
    padding-bottom: 4px;
    border-bottom: 1px dashed #1A1919;
    box-sizing: border-box;
    cursor: pointer;
  }
}
</style>
