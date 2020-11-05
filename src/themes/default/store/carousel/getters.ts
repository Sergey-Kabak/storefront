import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CarouselState from './types/CarouselState'

const getters: GetterTree<CarouselState, RootState> = {
  getSlider (state) {
    return state.homeSlider
  }
}

export default getters
