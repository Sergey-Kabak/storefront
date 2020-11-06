import i18n from '@vue-storefront/i18n'
import sumBy from 'lodash-es/sumBy'
import ShippingMethod from '@vue-storefront/core/modules/cart/types/ShippingMethod'
import PaymentMethod from '@vue-storefront/core/modules/cart/types/PaymentMethod'
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import {Logger} from "core/lib/logger";



const calculateTotals = (shippingMethod: ShippingMethod, paymentMethod: PaymentMethod, cartItems: CartItem[]) => {
  const shippingTax = shippingMethod ? shippingMethod.price_incl_tax : 0
  const getProductPrice = (product) => {
    const productTypes = {
      bundle: function () {
        let bundlePrice = product.bundle_options.reduce((acc, it) => {
          return acc += it.product_links.reduce((acc2, it2) => acc2 += it2.price, 0)
        }, 0) + product.original_price_incl_tax;
        if (!!product.special_price){
          let baseDiscount = 100 - product.special_price,
            onePercent = bundlePrice / 100;
          return bundlePrice - (onePercent * baseDiscount)
        }
        return bundlePrice
      }
    }
    return (productTypes[product.type_id] && productTypes[product.type_id]()) || product.price_incl_tax
  }


  const totalsArray = [
    {
      code: 'subtotal_incl_tax',
      title: i18n.t('Subtotal incl. tax'),
      value: sumBy(cartItems, (p) => p.qty * getProductPrice(p))
    },
    {
      code: 'grand_total',
      title: i18n.t('Grand total'),
      value: sumBy(cartItems, (p) => p.qty * getProductPrice(p) + shippingTax)
    }
  ]

  if (paymentMethod) {
    totalsArray.push({
      code: 'payment',
      title: i18n.t(paymentMethod.title),
      value: paymentMethod.cost_incl_tax
    })
  }
  if (shippingMethod) {
    totalsArray.push({
      code: 'shipping',
      title: i18n.t(shippingMethod.method_title),
      value: shippingMethod.price_incl_tax
    })
  }

  return totalsArray
}

export default calculateTotals
