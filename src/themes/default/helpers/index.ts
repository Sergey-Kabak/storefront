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
  const status = {
    InStock: (() => (product.stock.is_in_stock && !product.preorder && product.msi_salable_quantity > 0) || product.stock.backorders !== 0)(),
    PendingDelivery: (() => {
      const isBackOrder = product.type_id !== 'bundle' && product.preorder && product.stock.backorders && product.stock.backorders !== 0
      const isPreOrder = product.stock.is_in_stock && product.preorder && product.msi_salable_quantity > 0
      return isBackOrder || isPreOrder
    })(),
    ComingSoon: (() => !product.stock.is_in_stock && !!product.coming_soon)(),
    NotAvailable: (() => (!product.stock.is_in_stock || product.msi_salable_quantity <= 0) && !product.coming_soon && product.stock.backorders === 0)()
  }
  return Object.keys(status).find(s => !!status[s])
}
