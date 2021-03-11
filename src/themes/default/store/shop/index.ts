import actions from './actions'
import mutations from './mutations'

export const shopStore = {
  namespaced: true,
  state: {
    shops: [],
    cities: [],
    selectedShop: null,
    shopSwitch: 'list'
  },
  actions,
  mutations
}
