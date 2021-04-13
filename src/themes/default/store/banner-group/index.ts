import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import BannerGroupState from './types/BannerGroupState'

export const module: Module<BannerGroupState, any> = {
  namespaced: true,
  state: {
    bannerGroup: null
  },
  getters,
  actions,
  mutations
}
