import actions from './actions'
import mutations from './mutations'

export const cmsStore = {
  namespaced: true,
  state: {
    menu: [],
    activeMenu: null
  },
  actions,
  mutations
}
