import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search';

export const searchStore = {
  namespaced: true,
  state: {
    recommend: {
      products: [],
      isFilled: true
    }
  },
  actions: {
    async getRecommends ({ commit, dispatch }, start) {
      const recommend =  await dispatch('product/findProducts', {
        query: prepareQuery({filters: [
          {
            key: 'category_ids',
            value: { eq: [46] }
          }
        ]}),
        start,
        size: 10,
        sort: 'created_at:desc'
      },{ root: true })
      commit('SET_RECOMMENDS', recommend.items)
    },
    async getProductsBySKU ({ state }, payload) {
      let query = {
        query: {
          bool: {
            should: payload.map(it => {
              return { 'term': { 'sku': it } }
            })
          }
        }
      }
      const products = await quickSearchByQuery({ entityType: 'product', query })
      return products.items;
    }
  },
  mutations: {
    SET_RECOMMENDS(state, products) {
      if (products.length < 10) {
        state.recommend.isFilled = false
      }
      state.recommend.products = [...state.recommend.products, ...products]
    }
  }
}
