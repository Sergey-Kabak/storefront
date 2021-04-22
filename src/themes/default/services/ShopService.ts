import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import bodybuilder from 'bodybuilder'
import config from 'config'
import { ShopResponse, Shop } from 'theme/types/Shop'

const getShops = async ({
    city = null,
    size = 1000,
    sort = '',
    isAllowPickupLocation = true,
    includeFields = config.entities.optimize ? config.entities.shop.includeFields : null,
    excludeFields = config.entities.optimize ? config.entities.shop.excludeFields : null
} = {}): Promise<ShopResponse> => {
  let searchQuery = bodybuilder();
  if (city) {
    searchQuery = searchQuery.query('match', 'city', city)
  }

  if (isAllowPickupLocation) {
    searchQuery = searchQuery.filter('term', 'is_allowed_pickup_location', 1)
  }

  const res = await quickSearchByQuery({
    entityType: 'inventory_source',
    query: searchQuery.build(),
    size,
    sort,
    excludeFields,
    includeFields
  })

  
  return { shops: res.items, total: res.total }
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
    searchQuery = searchQuery.query('query_string', {
      "query": `*${city}*`, 
      "fields": ["city"]
    })
  }

  const res = await quickSearchByQuery({
    entityType: 'inventory_source',
    query: searchQuery.build(),
    size,
    sort,
    excludeFields,
    includeFields
  })

  return res.aggregations && res.aggregations.agg_terms_city && res.aggregations.agg_terms_city.buckets.map(it => it.key.charAt(0).toUpperCase() + it.key.slice(1))
}

export const ShopService = {
  getShops,
  getCities
}
