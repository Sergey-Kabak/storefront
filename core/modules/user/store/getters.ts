import {GetterTree} from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import UserState from '../types/UserState'

const getters: GetterTree<UserState, RootState> = {
  isLoggedIn (state) {
    return state.current !== null
  },
  isLocalDataLoaded: state => state.local_data_loaded,
  getUserToken (state) {
    return state.token
  },
  getOrdersHistory (state) {
    return state.orders_history ? state.orders_history.items : []
  },
  getToken (state) {
    return state.token
  },
  getUserEmail (state, getters) {
    return getters.isLoggedIn ? state.current.email : null
  },
  getUserPhone (state, getters) {
    if (!getters.isLoggedIn) return null;
    const attrs = state.current.custom_attributes || [];
    const phone = attrs.find(attr => attr.attribute_code === 'telephone').value
    return phone ? phone : null
  },
  abandonProducts (state, getters, rootState, rootGetters) {
    const cartSkus = rootGetters['cart/getCartItems'].map(el => el.sku)
    return state.visited_products_history.filter(sku => !cartSkus.includes(sku))
  }
}

export default getters
