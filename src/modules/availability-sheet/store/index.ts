import * as types from './mutation-types'

export const module = {
  namespaced: true,
  state: {
    availability: []
  },
  mutations: {
    [types.SET_AVAILABILITY_SHEET] (state, payload) {
      state.availability = payload
    }
  },
  actions: {
    get ({ commit, dispatch }, data) {
      dispatch('stock/checkStockDataById', data, {root: true})
        .then(res => {
          commit(types.SET_AVAILABILITY_SHEET, res.result.source_selection_items)
        }).catch(err => {
          console.log(err)
        });
    }
  },
  getters: {
    availability: state => state.availability
  }
}
