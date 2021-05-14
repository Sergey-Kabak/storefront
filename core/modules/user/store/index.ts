import {Module} from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import UserState from '../types/UserState'

export const userStore: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    login: {
      email: null,
      password: null,
      remember: false
    },
    register: {
      firstName: null,
      lastName: null,
      email: null,
      telephone: null,
      password: null,
      rPassword: null
    },
    token: '',
    refreshToken: '',
    groupToken: '',
    groupId: null,
    current: null,
    current_storecode: '',
    session_started: new Date(),
    orders_history: null,
    visited_products_history: [],
    local_data_loaded: false
  },
  getters,
  actions,
  mutations
}
