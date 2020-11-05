import * as types from './mutation-types'
import { quickSearchByQuery } from "@vue-storefront/core/lib/search";
import logger from "vuex/dist/logger";

const actions = {
  async getHomeCarousel (context) {
    try {
      let query = {
        query: {
          'match': {
            'name': 'Home'
          }
        }
      }
      const slider = await quickSearchByQuery({ entityType: 'slider', query })
      context.commit(types.SET_SLIDERS, { slider: slider.items[0] })
    } catch (e) {
      logger(e);
    }
  }
}

export default actions
