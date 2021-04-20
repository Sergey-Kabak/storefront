import * as types from './mutation-types'
import { quickSearchByQuery } from "@vue-storefront/core/lib/search";
import logger from "vuex/dist/logger";

const actions = {
  async getBannerGroups (context) {
    try {
      const bannerGroup = await quickSearchByQuery({ entityType: 'banner' })
      context.commit(types.SET_BANNER_GROUP, bannerGroup.items)
    } catch (e) {
      logger(e);
    }
  }
}

export default actions
