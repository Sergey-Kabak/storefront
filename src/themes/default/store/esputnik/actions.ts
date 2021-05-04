import { EsputnikService } from 'theme/services/EsputnikService';
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import * as types from './mutation-types'

const checkoutStorage = StorageManager.get('checkout')

const formatItems = items => items.map(el => ({
  name: el.name,
  value: {
    name: el.name,
    price: el.price,
    img: getThumbnailPath(el.thumbnail, 200, 200),
    url: `http://ringoo.ua/${el.url_path}`
  }
}))

const actions = {
  triggerAbandonCart ({ rootGetters }) {
    const items = rootGetters['cart/getCartItems'];
    if (!items.length) return
    const preparedItems = formatItems(items)
    return EsputnikService.triggerAbandonCart({ items: preparedItems })
  },
  triggerAbandonProducts ({ rootGetters }) {
    const items = rootGetters['user/abandonProducts'];
    if (!items.length) return
    const preparedItems = formatItems(items)
    return EsputnikService.triggerAbandonProducts({ items: preparedItems })
  },
  triggerPasswordChanged () {
    return EsputnikService.triggerPasswordChanged({})
  },
  triggerComeback () {
    return EsputnikService.triggerComebackEvent({});
  },
  triggerOrderSuccess ({}, payload) {
    return EsputnikService.triggerOrderSuccess(payload);
  },
  triggerCartUpdated ({}, payload) {
    return EsputnikService.triggerCartUpdated(payload);
  },
  async triggerProductViewed ({ rootGetters }, { product }) {
    let email = rootGetters['user/getUserEmail']
    let phone = rootGetters['user/getUserPhone']
    if (!email) {
        try {
          const details = await checkoutStorage.getItem('personal-details')
          if (details) {
            email = details.emailAddress;
            phone = details.telephone;
          }
          fn();
        } catch(err) {
          throw err;
        }
    } else {
      fn();
    }
    function fn () {
      const payload = [
        {
          name: 'email',
          value: email
        },
        {
          name: 'phone',
          value: phone
        },
        {
          name: 'product',
          value: JSON.stringify({
            productId: product.sku,
            price: product.price,
            currency: 'UAH',
            isInStock: product.stock?.is_in_stock
          })
        },
        {
          "name": "currencyCode",
          "value": "UAH"
        }
      ]
      return EsputnikService.triggerProductViewed(payload);
    }

  },
  setSubscribed ({ commit }) {
    commit(types.SET_ESPUTNIK_SUBSCRIBED, true)
  },
  setRequestSent ({ commit }) {
    commit(types.SET_ESPUTNIK_SENT, true)
  }
}

export default actions
