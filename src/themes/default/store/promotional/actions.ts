import { PromotionalService } from 'theme/services'
import { buildFilterPromoQuery } from 'theme/helpers'
import { SearchQuery } from 'storefront-query-builder';
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { router } from '@vue-storefront/core/app'
import { changeFilterQuery } from '@vue-storefront/core/modules/catalog-next/helpers/filterHelpers'

const actions = {
  async loadPromotionalList ({ commit, state, getters, dispatch },
    route,
    pageSize = 12,
    sort = '',
    excludeFields = null,
    includeFields = null
  ) {
    const defaultFilters = Object.keys(state.attributes.list_by_code)
    const areFiltersInQuery = !!Object.keys(route.query).length
    if (!Object.keys(state.filtersMap).length && areFiltersInQuery) { // loading all filters only when some filters are currently chosen and category has no available filters yet
      await dispatch('loadPromotionalFilters', defaultFilters)
    }
    const searchQuery = getters.getCurrentFiltersFrom(route.query, state.filtersMap)
    let filterQr = buildFilterPromoQuery(defaultFilters, searchQuery.filters)
    const { items, aggregations, perPage, start, total } = await PromotionalService.getPromotionals({
      query: filterQr,
      size: pageSize,
      sort,
      excludeFields,
      includeFields
    })
    commit('SET_PROMOTIONALS', items)

    const filters = getters.getAvailableFiltersFrom(aggregations, defaultFilters)
    commit('SET_PROMOTIONAL_FILTERS', filters)

    await dispatch('loadAvailableFiltersFrom', {
      aggregations,
      defaultFilters,
      filters: searchQuery.filters
    })

    commit('SET_PROMOTIONAL_STATS', { perPage, start, total })

    return { items, aggregations, perPage, start, total }
  },

  async loadMorePromotionals ({ commit, state, getters, dispatch }) {
    const { perPage, start, total } = getters.getPromotionalSearchStats
    const totalValue = typeof total === 'object' ? total.value : total
    if (start >= totalValue || totalValue < perPage) return

    const searchQuery = getters.getCurrentSearchQuery
    const defaultFilters = Object.keys(state.attributes.list_by_code)
  
    let filterQr = buildFilterPromoQuery(defaultFilters, searchQuery.filters)

    const searchResult = await PromotionalService.getPromotionals({
      query: filterQr,
      start: start + perPage,
      size: perPage
    })
    commit('SET_PROMOTIONAL_STATS', { 
      perPage: searchResult.perPage,
      start: searchResult.start,
      total: searchResult.total
    })

    commit('ADD_PROMOTIONALS', searchResult.items)

    return searchResult.items
  },

  async loadPromotionalFilters ({ dispatch, getters }, defaultFilters) {
    let filterQr = buildFilterPromoQuery(defaultFilters)
    const { aggregations } = await quickSearchByQuery({
      query: filterQr,
      entityType: 'promo',
      size: 999,
      excludeFields: ['*']
    })
    await dispatch('loadAvailableFiltersFrom', { aggregations, defaultFilters })
  },

  async loadAvailableFiltersFrom ({ commit, getters }, { aggregations, defaultFilters }) {
    const aggregationFilters = getters.getAvailableFiltersFrom(aggregations, defaultFilters)
    commit('SET_FILTERS_MAP', aggregationFilters)
  },

  async loadPromotional ({ commit, state, dispatch }, link) {
    let searchQuery = new SearchQuery()
    if (link) {
      searchQuery = searchQuery.applyFilter({ key: 'url', value: { 'eq': link } })
    }

    const { items: [promotional] } = await PromotionalService.getPromotionals({
      query: searchQuery,
      size: 1
    })

    commit('SET_PROMOTIONAL', promotional)

    return promotional
  },

  async loadPromotionalAttributes ({ commit }) {
    const attributes = await PromotionalService.loadPromotionalAttributes()
    const list_by_code = {}

    attributes.forEach((it) => {
      list_by_code[it.attribute_code] = it
    })
    
    commit('SET_PROMOTIONAL_ATTRIBUTES', {
      list_by_code
    })
  },

  async switchSearchFilters ({ dispatch }, filterVariants: any[] = []) {
    let currentQuery = router.currentRoute.query
    filterVariants.forEach(filterVariant => {
      currentQuery = changeFilterQuery({ currentQuery, filterVariant })
    })
    await dispatch('changeRouterFilterParameters', currentQuery)
  },
  async resetSearchFilters ({ dispatch }) {
    await dispatch('changeRouterFilterParameters', {})
  },
  async changeRouterFilterParameters (context, query) {
    router.push({ query })
  }
}

export default actions
