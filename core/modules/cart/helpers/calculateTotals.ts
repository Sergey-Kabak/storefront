import i18n from '@vue-storefront/i18n'
import sumBy from 'lodash-es/sumBy'
import ShippingMethod from '@vue-storefront/core/modules/cart/types/ShippingMethod'
import PaymentMethod from '@vue-storefront/core/modules/cart/types/PaymentMethod'
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import { price } from 'theme/helpers'


const calculateTotals = (shippingMethod: ShippingMethod, paymentMethod: PaymentMethod, cartItems: CartItem[]) => {
  const totalsArray = [
    {
      code: 'grand_total',
      title: i18n.t('Grand total'),
      value: sumBy(cartItems, (p) => p.qty * price(p))
    },
    {
      code: 'subtotal_original',
      title: i18n.t('Subtotal'),
      value: sumBy(cartItems, (p) => p.qty * price(p, 'original_price'))
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
