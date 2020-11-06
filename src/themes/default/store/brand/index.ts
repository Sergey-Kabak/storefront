import actions from './actions'
import mutations from './mutations'

export const brandStore = {
  namespaced: true,
  state: {
    brands: [],
    brand: null,
    activeCategory: null
  },
  actions,
  mutations
}
