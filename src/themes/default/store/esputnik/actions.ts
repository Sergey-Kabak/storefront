import { EsputnikService } from 'theme/services/EsputnikService';
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import * as types from './mutation-types'

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
  setSubscribed ({ commit }) {
    commit(types.SET_ESPUTNIK_SUBSCRIBED, true)
  },
  setRequestSent ({ commit }) {
    commit(types.SET_ESPUTNIK_SENT, true)
  }
}

export default actions
