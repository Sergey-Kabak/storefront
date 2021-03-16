import getConfigurationMatchLevel from './getConfigurationMatchLevel'
import config from 'config'
import orderBy from 'lodash-es/orderBy'

/**
 * This function responsiblity is to find best matching variant for configurable product based on configuration object or stock availability.
 */
export default function

  findConfigurableVariant ({ product, configuration = null, selectDefaultChildren = false, availabilityCheck = true }) {
  const sortedConfigurableChildren = orderBy(product.configurable_children, [it => it.stock && it.stock.is_in_stock, it => it.priority, it => it.price], ['desc', 'asc', 'asc'])
  let _sortedConfigurableChildren = null
  if (configuration && configuration.color && configuration.color.length && sortedConfigurableChildren.filter(it => configuration.color.find(color => +color.id === it.color)).length) {
    _sortedConfigurableChildren = sortedConfigurableChildren.filter(it => configuration.color.find(color => +color.id === it.color));
  }
  const variants = _sortedConfigurableChildren || sortedConfigurableChildren
  const selectedVariant = variants.reduce((prevVariant, nextVariant) => {
      if (availabilityCheck) {
        if (nextVariant.stock && !config.products.listOutOfStockProducts) {
          if (!nextVariant.stock.is_in_stock) {
            return prevVariant
          }
        }
      }
      if (nextVariant.status >= 2/** disabled product */) {
        return prevVariant
      }
      if (selectDefaultChildren) {
        return prevVariant || nextVariant // return first
      }
      if (
        (configuration && configuration.sku) &&
        (nextVariant.sku === configuration.sku)
      ) { // by sku or first one
        return nextVariant
      } else {
        // get match level for each variant
        const prevVariantMatch = getConfigurationMatchLevel(configuration, prevVariant)
        const nextVariantMatch = getConfigurationMatchLevel(configuration, nextVariant)

        // if we have draw between prev variant and current variant then return one that has lowest price
        if (prevVariantMatch === nextVariantMatch) {
          return variants[0]
        }

        // return variant with best matching level
        return nextVariantMatch > prevVariantMatch ? nextVariant : prevVariant
      }
    }, undefined)

    return selectedVariant
}
