import * as types from './mutation-types';

const mutations = {
  [types.SET_ESPUTNIK_SUBSCRIBED](state, payload) {
    state.subscribed = payload
  },
  [types.SET_ESPUTNIK_SENT](state, payload) {
    state.sent = payload
  }
}

export default mutations
