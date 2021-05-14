import Vue from 'vue'
import {MutationTree} from 'vuex'
import * as types from './mutation-types'
import UserState from '../types/UserState'
import {Logger} from '@vue-storefront/core/lib/logger'

const mutations: MutationTree<UserState> = {
  [types.USER_TOKEN_CHANGED] (state, payload) {
    state.token = payload.newToken
    if (payload.meta && payload.meta.refreshToken) {
      state.refreshToken = payload.meta.refreshToken // store the refresh token
      Logger.log('Refresh token is set to' + state.refreshToken, 'user')()
    }
  },
  [types.USER_START_SESSION] (state) {
    state.session_started = new Date()
  },
  [types.USER_GROUP_TOKEN_CHANGED] (state, token) {
    state.groupToken = token
  },
  [types.USER_ADD_TO_PRODUCT_HISTORY] (state, product) {
    state.visited_products_history.push(product)
  },
  [types.USER_GROUP_CHANGED] (state, groupId) {
    state.groupId = groupId
  },
  [types.USER_INFO_LOADED] (state, currentUser) {
    state.current = currentUser
  },
  [types.USER_ORDERS_HISTORY_LOADED] (state, ordersHistory) {
    state.orders_history = ordersHistory
  },
  [types.USER_END_SESSION] (state) {
    state.token = ''
    state.current = null
    state.session_started = null
  },
  [types.USER_LOCAL_DATA_LOADED] (state, readed = false) {
    state.local_data_loaded = readed
  },
  [types.USER_ORDER_STATUS_CHANGED] (state, { orderId, status }) {
    const orderIndex = state.orders_history.items.findIndex(it => it.entity_id === orderId)
    if (orderIndex !== -1) {
      Vue.set(state.orders_history.items, orderIndex, {
        ...state.orders_history.items[orderIndex],
        status
      })
    }
  },
  [types.USER_LOGIN] (state, { key, value }) {
    state.login[key] = value
  },
  [types.USER_RESET_LOGIN] (state) {
    state.login = {
      email: null,
      password: null,
      remember: false
    }
  },
  [types.USER_REGISTER] (state, { key, value }) {
    state.register[key] = value
  },
  [types.USER_RESET_REGISTER] (state) {
    state.register = {
      firstName: null,
      lastName: null,
      email: null,
      telephone: null,
      password: null,
      rPassword: null
    }
  },
}

export default mutations
