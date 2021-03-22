const mutations = {
  SET_PROMOTIONALS (state, promotionals) {
    state.promotionals = promotionals
  },
  ADD_PROMOTIONALS (state, promotionals = []) {
    state.promotionals = [...state.promotionals, ...promotionals]
  },
  SET_PROMOTIONAL_ATTRIBUTES (state, attributes) {
    state.attributes = attributes
  },
  SET_PROMOTIONAL_FILTERS (state, filters) {
    state.filters = filters
  },
  SET_PROMOTIONAL (state, promotional) {
    state.promotional = promotional
  },
  SET_FILTERS_MAP (state, filtersMap) {
    state.filtersMap = filtersMap
  },
  SET_PROMOTIONAL_STATS (state, promotionalStat) {
    state.promotionalStat = promotionalStat
  }
}

export default mutations
