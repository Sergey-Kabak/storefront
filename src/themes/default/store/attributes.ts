import { quickSearchByQuery } from '@vue-storefront/core/lib/search';

export const attributeStore = {
  namespaced: true,
  state: {
    filter: null
  },
  actions: {
    async getCustomAttribute ({ state, commit, dispatch }, attributes) {
      const query = {
        query: {
          bool: {
            should: attributes.map(it => {
              return { 'term': { 'attribute_code': it } }
            })
          }
        }
      };
      const resp = await quickSearchByQuery({ entityType: 'attribute', query });
      state.filter = {}
      resp.items.forEach(el => {
        state.filter[el.attribute_code] = el.options
      })
      return resp
    }
  },
  getters: {
    getFilter: state => state.filter
  }
}
