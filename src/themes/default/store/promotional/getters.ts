import cloneDeep from 'lodash-es/cloneDeep';
import FilterVariant from "@vue-storefront/core/modules/catalog-next/types/FilterVariant";
import { optionLabel } from "@vue-storefront/core/modules/catalog/helpers";
import { getFiltersFromQuery } from "@vue-storefront/core/modules/catalog-next/helpers/filterHelpers";
import trim from "lodash-es/trim";
import { compareByLabel } from "@vue-storefront/core/modules/catalog-next/helpers/categoryHelpers";

const getters = {
  getAvailableFiltersFrom: (state, getters, rootState) => (
    aggregations,
    defaultFilters
  ) => {
    const filters = {};
    const attributes = cloneDeep(state.attributes)
    if (aggregations) {
      // populate filter aggregates
      for (let attrToFilter of defaultFilters) {
        // fill out the filter options
        let filterOptions: FilterVariant[] = [];

        let uniqueFilterValues = {};
        if (aggregations["agg_terms_" + attrToFilter]) {
          let buckets = aggregations["agg_terms_" + attrToFilter].buckets;
          if (aggregations["agg_terms_" + attrToFilter + "_options"]) {
            buckets = buckets.concat(
              aggregations["agg_terms_" + attrToFilter + "_options"].buckets
            );
          }
          for (let option of buckets) {
            uniqueFilterValues[option.key] = option.doc_count;
          }
        }
        for (let key in uniqueFilterValues) {
          const label = optionLabel(attributes, {
            attributeKey: attrToFilter,
            optionId: key
          });
          const attribute = attributes.list_by_code[attrToFilter];
          if (trim(label) !== "") {
            // is there any situation when label could be empty and we should still support it?
            filterOptions.push({
              id: key,
              count: uniqueFilterValues[key],
              label: label,
              type: attrToFilter,
              name: attribute.frontend_label
            });
          }
        }
        if (filterOptions && filterOptions.length) {
          filters[attrToFilter] = filterOptions.sort(compareByLabel);
        }
      }
    }
    return filters;
  },
  getCurrentFiltersFrom: (state, getters, rootState) => (filters, defaultFilters) => {
    const currentQuery = filters || rootState.route.query
    const availableFilters = defaultFilters || state.filtersMap
    return getFiltersFromQuery({ availableFilters, filtersQuery: currentQuery })
  },
  getAvailableFilters: (state) => {
    return state.filtersMap
  },
  getCurrentSearchQuery: (state, getters, rootState) => getters.getCurrentFiltersFrom(rootState.route.query),
  getCurrentFilters: (state, getters) => getters.getCurrentSearchQuery.filters,
  hasActiveFilters: (state, getters) => !!Object.keys(getters.getCurrentFilters).length,
  getPromotionalSearchStats: state => state.promotionalStat || {},
  getPromotionalsTotal: (state, getters) => {
    const { total } = getters.getPromotionalSearchStats
    const totalValue = typeof total === 'object' ? total.value : total

    return totalValue || 0
  },
};

export default getters;
