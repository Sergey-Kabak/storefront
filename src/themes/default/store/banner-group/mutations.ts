import * as types from './mutation-types'
import { MutationTree } from 'vuex';
import BannerGroupState from './types/BannerGroupState'

const mutations: MutationTree<BannerGroupState> = {
  [types.SET_BANNER_GROUP] (state,  bannerGroup) {
    state.bannerGroup = bannerGroup
  }
}

export default mutations
