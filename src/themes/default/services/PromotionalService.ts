import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { getOptimizedFields } from '@vue-storefront/core/modules/catalog/helpers/search';
import Attribute from 'theme/store/promotional/types/Attribute'

const getPromotionals = async ({
  start = 0,
  size = 50,
  sort = '',
  excludeFields = null,
  includeFields = null,
  query
}: {query?: any, start?: number, size?: number, sort?: string, excludeFields?: [], includeFields?: [] }): Promise<any> => {
  const { excluded, included } = getOptimizedFields({ excludeFields, includeFields })
  let {
    items: promotionals = [],
    aggregations,
    total,
    perPage
  } = await quickSearchByQuery({
    query,
    start,
    size,
    sort,
    entityType: 'promo',
    excludeFields: excluded,
    includeFields: included
  })

  return { items: promotionals, perPage, start, total, aggregations }
}

const loadPromotionalAttributes = async (): Promise<Attribute[]>  => {
  let {
    items: attributes = [],
  } = await quickSearchByQuery({
    entityType: 'promo_filter'
  })

  return attributes
}

export const PromotionalService = {
  getPromotionals,
  loadPromotionalAttributes
}
