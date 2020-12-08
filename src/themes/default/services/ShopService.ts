import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import bodybuilder from 'bodybuilder'
import config from 'config'
import { Shop } from 'theme/types/Shop'

const getShops = async ({
    city = null,
    size = 1000,
    sort = '',
    includeFields = config.entities.optimize ? config.entities.shop.includeFields : null,
    excludeFields = config.entities.optimize ? config.entities.shop.excludeFields : null
} = {}): Promise<Shop[]> => {
  let searchQuery = bodybuilder();
  if (city) {
    searchQuery = searchQuery.query('match', 'city', city)
  }
  const { items: shops = [] } = await quickSearchByQuery({
    entityType: 'inventory_source',
    query: searchQuery.build(),
    size,
    sort,
    excludeFields,
    includeFields
  })

  return shops
}

const getCities = async ({
  city = null,
  size = 1000,
  sort = '',
  includeFields = config.entities.optimize ? config.entities.shop.includeFields : null,
  excludeFields = config.entities.optimize ? config.entities.shop.excludeFields : null
} = {}): Promise<Shop[]> => {
  let searchQuery = bodybuilder();

  searchQuery.aggregation('terms', 'city')

  if (city) {
    searchQuery = searchQuery.query('query_string', 
    {
      "query": `*${city}*`, 
      "fields": ["city"]
    })
  }

  const resp = await quickSearchByQuery({
    entityType: 'inventory_source',
    query: searchQuery.build(),
    size,
    sort,
    excludeFields,
    includeFields
  })

  return resp.aggregations && resp.aggregations.agg_terms_city && resp.aggregations.agg_terms_city.buckets.map(it => it.key.charAt(0).toUpperCase() + it.key.slice(1))
}

export const ShopService = {
  getShops,
  getCities
}
