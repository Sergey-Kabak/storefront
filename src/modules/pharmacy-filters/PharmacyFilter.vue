<template>
  <div class="col-sm-12 pharmacy-filter">
    <div class="pharmacy-filter__wrapper">
      <div class="label">
        {{ $t('Show pharmacies: ') }}
      </div>
      <div class="flex-container">
        <div v-for="filter in filters" :key="filter.id" class="flex-item">
          <base-checkbox :id="filter.id" :value="filter.value" @change="onChange(filter)">
            {{ filter.label }}
          </base-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
export default {
  components: {BaseCheckbox},
  data () {
    return {
      filters: [
        {id: 'all_available', value: false, label: this.$t('Only pharmacies where everything is available')},
        {id: 'favorite', value: false, label: this.$t('Favorite pharmacies')},
        {id: 'round_the_clock', value: false, label: this.$t('Around the clock')}
      ]
    }
  },
  methods: {
    onChange (filter) {
      const updatedFilter = {...filter, value: !filter.value}
      this.filters = this.filters.map(f => {
        if (f.id === updatedFilter.id) f = updatedFilter
        return f
      })
      this.$bus.$emit('on-filter-changed', updatedFilter)
    }
  }
}
</script>

<style lang="scss">
  .pharmacy-filter {
    .pharmacy-filter__wrapper {
      background: #f7f7f9;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      padding: 10px;
      box-sizing: border-box;
    }
    label {
      padding-left: 25px;
      font-size: 12px;
      font-weight: 600;
      color: #00612B;
    }
    input:not(.empty) ~ label {
      color: #00612B;
    }

    .label {
      font-size: 14px;
      line-height: 21px;
      color: #19223D;
      font-weight: 700;
      padding-bottom: 5px;
    }

    .flex-container {
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-align-content: stretch;
      -ms-flex-line-pack: stretch;
      align-content: stretch;
      -webkit-align-items: stretch;
      -ms-flex-align: stretch;
      align-items: stretch;

      .flex-item {
        -webkit-order: 0;
        -ms-flex-order: 0;
        order: 0;
        -webkit-flex: 0 1 auto;
        -ms-flex: 0 1 auto;
        flex: 0 1 auto;
        -webkit-align-self: auto;
        -ms-flex-item-align: auto;
        align-self: auto;

        &:not(:first-child) {
          padding-left: 10px;
        }
      }
    }
  }

  @media all and (max-width: 767px) {
    .pharmacy-filter {
      padding: 15px 8px;
      margin: 0;

      .flex-container {
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        .flex-item {
          padding-left: 0 !important;
        }
      }
    }
  }
</style>
