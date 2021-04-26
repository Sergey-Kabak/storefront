import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import RecentlyViewedState from '../types/RecentlyViewedState'
import { cacheStorage } from '../'

const actions: ActionTree<RecentlyViewedState, RootState> = {
  load ({ commit }) {
    cacheStorage.getItem('recently-viewed', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.RECENTLY_VIEWED_LOAD, storedItems)
    })
  },
  addItem ({ commit }, product) {
    cacheStorage.getItem('recently-viewed', (err, storedItems) => {
      if (err) throw new Error(err)
      const record = storedItems.find(it => it.sku === product.sku)
      if (!record) {
        storedItems.unshift(product)
        commit(types.RECENTLY_VIEWED_LOAD, storedItems)
      }
    })
  },
  removeItems ({ commit }) {
    cacheStorage.removeItem('recently-viewed', (err) => {
      if (err) throw new Error(err)
      commit(types.RECENTLY_VIEWED_LOAD, [])
    })
  },
  removeItem ({ commit }, product) {
    cacheStorage.getItem('recently-viewed', (err, storedItems) => {
      if (err) throw new Error(err)
      const productIndex = storedItems.findIndex(it => it.sku === product.sku)
      storedItems.splice(productIndex, 1)
      commit(types.RECENTLY_VIEWED_LOAD, storedItems)
    })
  }
}

export default actions
