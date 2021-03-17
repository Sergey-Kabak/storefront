import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import PromotionalState from './types/PromotionalState'

export const module: Module<PromotionalState, any> = {
  namespaced: true,
  state: {
    promotionals: [],
    filters: [],
    attributes: null,
    promotional: null,
    filtersMap: [],
    promotionalStat: null
  },
  actions,
  mutations,
  getters
}
