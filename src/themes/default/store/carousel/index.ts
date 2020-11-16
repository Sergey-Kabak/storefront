import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import CarouselState from './types/CarouselState'

export const module: Module<CarouselState, any> = {
  namespaced: true,
  state: {
    homeSlider: null
  },
  getters,
  actions,
  mutations
}
