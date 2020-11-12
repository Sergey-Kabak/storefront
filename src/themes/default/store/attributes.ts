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
      resp.items.forEach((el, index) => {
        Object.assign(state.filter, {
          [attributes[index]]: el.options.map(it => {
            it['id'] = it['value'];
            return it;
          })
        })
      })
    }
  },
  getters: {
    getFilter: state => state.filter
  }
}
