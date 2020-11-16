import * as types from './mutation-types'
import { MutationTree } from 'vuex';
import CarouselState from './types/CarouselState'

const mutations: MutationTree<CarouselState> = {
  [types.SET_SLIDERS] (state, { slider }) {
    state.homeSlider = slider
  }
}

export default mutations
