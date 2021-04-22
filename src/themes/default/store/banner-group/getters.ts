import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import BannerGroupState from './types/BannerGroupState'

const getters: GetterTree<BannerGroupState, RootState> = {
  getHomePageBanners (state) {
    return state.bannerGroup && state.bannerGroup.find(it => it.group_code === 'slider')
  },

  getHeaderPromoBanner (state) {
    return state.bannerGroup && state.bannerGroup.find(it => it.group_code === 'header')
  },

  getDeliveryBanner (state) {
    return state.bannerGroup && state.bannerGroup.find(it => it.group_code === 'delivery')
  }
}

export default getters
