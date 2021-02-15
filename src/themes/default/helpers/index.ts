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
  console.log({ product })
  const status = {
    InStock: (() => product.stock.is_in_stock && !product.preorder)(),
    PendingDelivery: (() => product.stock.is_in_stock && !!product.preorder)(),
    ComingSoon: (() => !product.stock.is_in_stock && !!product.coming_soon)(),
    NotAvailable: (() => !product.stock.is_in_stock && !product.coming_soon)()
  }
  return Object.keys(status).find(s => !!status[s])
}
