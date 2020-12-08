import actions from './actions'
import mutations from './mutations'

export const shopStore = {
  namespaced: true,
  state: {
    shops: [],
    cities: null,
    selectedShop: null,
    shopSwitch: 'list'
  },
  actions,
  mutations
}
