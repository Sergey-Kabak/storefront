import actions from './actions'
import mutations from './mutations'

export const esputnikStore = {
  namespaced: true,
  state: {
    subscribed: false,
    sent: false
  },
  mutations,
  actions
}
