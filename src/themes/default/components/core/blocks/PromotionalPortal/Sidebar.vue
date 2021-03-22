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
    <h3 class="sidebar__header relative flex center-md" :class="{'mt20' : hasActiveFilters , 'mt45' : !hasActiveFilters}">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z" fill="#23BE20"/>
      </svg>
      <span class="filter-title">
        {{ $t('Filters') }}
      </span>
    </h3>
    <category-filter :label="filter[0].name" v-for="(filter, index) in filters" :key="index" class="filter">
      <checkbox-selector
        :code="index"
        v-for="(item, index) in filter"
        :key="index"
        :variant="item"
        :selected-filters="getCurrentFilters"
        @change="$emit('changeFilter', $event)"
      />
    </category-filter>
  </div>
</template>

<script>
import CategoryFilter from 'theme/components/core/blocks/Category/CategoryFilter';
import CheckboxSelector from 'theme/components/core/CheckboxSelector';
import { mapState } from 'vuex';
import pickBy from 'lodash-es/pickBy';
import ActiveFilter from 'theme/components/core/blocks/Category/ActiveFilter';

export default {
  components: {
    CategoryFilter,
    CheckboxSelector,
    ActiveFilter
  },
  computed: {
    ...mapState({
      availableFilters: (state) => state.promotional.filtersMap
    }),
    hasActiveFilters () {
      return this.$store.getters['promotional/hasActiveFilters']
    },
    getCurrentFilters () {
      return this.$store.getters['promotional/getCurrentFilters']
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

      return res.flat(2)
    },
    filters () {
      return pickBy(this.availableFilters, (filter, filterType) => { return (filter.length && !this.$store.getters['category-next/getSystemFilterNames'].includes(filterType)) })
    }
  },
  methods: {
    resetAllFilters () {
      this.$store.dispatch('promotional/resetSearchFilters')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  flex: 1 0 316px;
  max-width: 316px;
}

.filter:not(:last-child) {
  border-bottom: 1px solid #E0E0E0;
}

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
  width: 32px;
  height: 32px;
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