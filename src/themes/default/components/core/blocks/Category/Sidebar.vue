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
    <h1 class="sidebar__header relative flex center-md" :class="{'mt20' : hasActiveFilters , 'mt45' : !hasActiveFilters}">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z" fill="#23BE20"/>
      </svg>
      <span class="filter-title">
        {{ $t('Filters') }}
      </span>
    </h1>
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
      <category-filter :label="filterIndex + '_filter'" v-else-if="filterIndex === 'color'" noscroll="true">
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
import ColorSelector from 'theme/components/core/ColorSelector';
import PriceSelector from 'theme/components/core/PriceSelector';
import ButtonSelector from 'theme/components/core/ButtonSelector';
import CheckboxSelector from 'theme/components/core/CheckboxSelector';
import CategoryFilter from 'theme/components/core/blocks/Category/CategoryFilter';
import ActiveFilter from 'theme/components/core/blocks/Category/ActiveFilter';
import pickBy from 'lodash-es/pickBy';
import edgeFlat from 'theme/mixins/edgeFlat'

export default {
  components: {
    ColorSelector,
    PriceSelector,
    CategoryFilter,
    ButtonSelector,
    CheckboxSelector,
    ActiveFilter
  },
  mixins: [edgeFlat],
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
      let sequence = Object.keys(this.availableFilters);
      let filters  = Object.values(this.getCurrentFilters).reduce((acc, val) => acc.concat(val), []);
      let res = [];

      sequence.forEach(el => {
        let condition = filters.filter(filter => filter.type === el)
        if (condition){
          res.push(condition)
        }

      })

      return this.isEdge ? this.flattenDeep(res) : res.flat(2)
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
      let hasGB = JSON.stringify(filters).toLowerCase().indexOf('гб');
      let hasMB = JSON.stringify(filters).toLowerCase().indexOf('мб');

      if (hasGB > -1 && hasMB > -1) {
        let mbArr = [];
        let gbArr = [];
        filters.forEach(el => el.label.toLowerCase().indexOf('мб') > -1 ? mbArr.push(el) : gbArr.push(el))
        mbArr.sort((a, b) => { return parseInt(a.label) - parseInt(b.label) })
        gbArr.sort((a, b) => { return parseInt(a.label) - parseInt(b.label) })
        return [...mbArr , ...gbArr]
      }
      else {
        return [...filters].sort((a, b) => { return parseInt(a.label) - parseInt(b.label) })
      }
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
$mobile_screen : 767px;
.mt45{
  margin-top: 45px;
}
.clear-filters{
  &:hover{
    border-color: transparent !important;
  }
  @media (max-width : 767px){
    display: none !important;
  }
}
/deep/ .color {
    width: 38px;
    height: 38px;
    margin-right: 6px;
}
/deep/ .color-inside {
  width: 30px;
  height: 30px;
}
/deep/ .checkbox-selector{
  span.checkbox{
    margin-right: 16px;
    &-title{
      color: #1A1919 ;
    }
    &-amount{
      color: #595858;
    }
  }
}
.sidebar {
  @media (max-width : $mobile_screen){
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    .sidebar__header {
        padding: 0;
        min-height: 48px;
    }
    /deep/ .filter-header{
      padding: 16px 0;
    }
    /deep/ .filter-body{
      border-bottom: 13px solid transparent;
    }
  }
  &__header {
    @media (max-width : $mobile_screen){
      order: -1;
      border : none;
      min-height: 1px;
      padding-top: 9px;
      margin: 0 0 -3px;
      position: relative;
      &:before{
        position: absolute;
        content: '';
        left: -16px;
        top: 0;
        width: calc(100% + 32px);
        height: 1px;
        background-color: #E0E0E0;
      }
     }
    margin-top: 0;
    display: flex;
    align-items: center;
    margin-bottom: 0px;
    min-height: 54px;
    justify-content: flex-start;
    flex-wrap: wrap;
    border-bottom: 1px solid #E0E0E0;
    border-top: 1px solid #E0E0E0;

    svg {
      @media (max-width : $mobile_screen){
        display: none;
      }
      margin: 0 20px 0 0;
    }

    .filter-title {
      @media (max-width : $mobile_screen){
        font-size: 24px;
        line-height: 30px;
        color: #1A1919;
      }
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
    margin-bottom: 11px;
    @media (max-width : $mobile_screen){
      margin-top: 16px;
      margin-bottom: -7px;
    }
  }

  .clear-filters {
    display: inline-block;
    margin-bottom: 20px;
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
