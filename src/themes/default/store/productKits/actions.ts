import { quickSearchByQuery } from '@vue-storefront/core/lib/search'

const actions = {
  async fetchKitProducts ({ state }, { products, parentProduct }) {
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
          'id',
          'qty',
          'category',
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
      const Kit = { ...parentProduct.product_kits[0] };
      const kitProductsBySku = Kit.items.map(el => {
        const fields = {
          original_price: el.price,
          final_price: el.final_price !== el.price ? el.final_price : 0,
          special_price: el.final_price !== el.price ? el.final_price : 0,
          kit_id: Kit.id,
          kit_item_id: el.id,
          sku: el.sku
        };
        return { [el.sku]: { ...fields } }
      });
      res.items.map(it => {
        [
          'original_price',
          'final_price',
          'special_price',
          'kit_id',
          'kit_item_id'
        ].forEach(v => {
          it[v] = kitProductsBySku.find(p => Object.keys(p)[0] === it.sku)[it.sku][v]
        });
        return it;
      });
      state.products = res.items;
    }
  }
}

export default actions