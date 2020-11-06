import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import bodybuilder from 'bodybuilder'
import config from 'config'
import { Brand } from 'theme/types/Brand'

const getBrands = async ({
    brandName = null,
    size = 10,
    sort = '',
    includeFields = config.entities.optimize ? config.entities.brand.includeFields : null,
    excludeFields = config.entities.optimize ? config.entities.brand.excludeFields : null
} = {}): Promise<Brand[]> => {
  let searchQuery = bodybuilder();
  if (brandName) {
    searchQuery = searchQuery.query('match', 'brand_name', brandName)
  }

  const { items: brands = [] } = await quickSearchByQuery({
    entityType: 'brand',
    query: searchQuery.build(),
    size,
    sort,
    excludeFields,
    includeFields
  })

  return brands
}

const getBrand = async ({
  brandName = null
} = {}): Promise<Brand> => {
  const brands = await getBrands({ brandName })
  return brands[0] || null
}

export const BrandService = {
  getBrands,
  getBrand
}
