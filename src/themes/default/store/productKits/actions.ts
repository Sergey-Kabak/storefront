import { quickSearchByQuery } from '@vue-storefront/core/lib/search'

const actions = {
  async fetchKitProducts ({ state }, { products }) {
    if (products.length) {
      const query = {
        query: {
          bool: {
            should: products.map(it => {
              return { 'term': { 'sku': it } }
            })
          }
        }
      };
      const res = await quickSearchByQuery({
        entityType: 'product',
        query,
        includeFields: [
          'sku',
          'final_price',
          'price',
          'special_price',
          'image',
          'name',
          'url_path',
          'preorder',
          'coming_soon',
          'stock.is_in_stock'
        ]
      });
      state.products = res.items;
    }
  }
}

export default actions
