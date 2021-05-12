import { SearchQuery } from 'storefront-query-builder'

export function unmask(maskedValue, mask){
  if (!maskedValue) return
  let defaultTokens = ['#', 'X', 'S', 'A', 'a', '!']
  let unmaskedValue = ''
  let isToken
  for (let i = 0; i < maskedValue.length; i++){
    isToken = false;
    for (let j = 0; j < defaultTokens.length; j++){
      if (mask[i] == defaultTokens[j]){
        isToken = true
      }
    }
    if (isToken){
      unmaskedValue += maskedValue[i]
    }
  }

  return unmaskedValue;
}

export function price(product, priceType = null) {
  const bundlePrice = () => {
    if (product.bundle_options) {
      const price = product.bundle_options.reduce((acc, it) => acc += it.product_links.reduce((acc, it) => acc += it.price, 0), 0);
      if (priceType) {
        return product[priceType] ? product[priceType] + price : 0
      } else {
        return (product.special_price && product.special_price + price) || (product.original_price + price)
      }
    }
  }

  const productPrice = () => {
    return priceType ? product[priceType] : product.special_price || product.original_price
  }

  const productTypes = {
    bundle: bundlePrice()
  };

  return Number.isInteger(productTypes[product.type_id]) ? productTypes[product.type_id] : productPrice();
}

export function ProductStock (product) {
  const isBackOrderEnabled = product.stock.is_in_stock && product.stock.backorders;
  const isBackOrderDisabled = typeof product.stock.backorders === 'undefined' || product.stock.backorders === 0 || !product.stock.is_in_stock
  const isOptions = product.preorder && product.coming_soon
  const status = {
    ComingSoon: (() => product.coming_soon)(),
    OutOfProduction: (() => product.discontinued)(),
    PendingDelivery: (() => product.preorder)(),
    InStock: (() => (product.stock.is_in_stock && product.msi_salable_quantity > 0) || isBackOrderEnabled)(),
    NotAvailable: (() => (!product.stock.is_in_stock || product.msi_salable_quantity <= 0) && !isOptions && isBackOrderDisabled)()
  }
  return Object.keys(status).find(s => !!status[s])
}

export function baseFilterPromoQuery (filters = []) {
  let searchProductQuery = new SearchQuery()

  for (let attrToFilter of filters) {
    searchProductQuery = searchProductQuery.addAvailableFilter({ field: attrToFilter, scope: 'catalog' })
  }
  searchProductQuery = searchProductQuery.applyFilter({ key: 'active', value: { 'eq': true } })
  return searchProductQuery
}

export function buildFilterPromoQuery (filters, chosenFilters = {}) {
  let filterQr = baseFilterPromoQuery(filters)

  // add choosen filters
  for (let code of Object.keys(chosenFilters)) {
    const filter = chosenFilters[code]
    const attributeCode = Array.isArray(filter) ? filter[0].attribute_code : filter.attribute_code

    if (Array.isArray(filter)) {
      const values = filter.map(filter => filter.id)
      filterQr = filterQr.applyFilter({ key: attributeCode, value: { 'in': values }, scope: 'catalog' })
    } else  {
      filterQr = filterQr.applyFilter({ key: attributeCode, value: { 'eq': filter.id }, scope: 'catalog' })
    }
  }
  return filterQr
}

