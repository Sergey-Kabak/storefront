import { Shop } from 'theme/types/Shop';
import { ShopService } from 'theme/services'
import { CheckoutService } from 'theme/services'

const actions = {
  async getShops ({ commit }, { city, size, sort, includeFields, excludeFields }): Promise<Shop[]> {
    const { shops, total } = await ShopService.getShops({ city, size, sort, includeFields, excludeFields })
    commit('SET_SHOPS', shops)
    commit('SET_TOTAL_SHOPS', total)

    return shops
  },

  async getCities ({ commit }, { city }) {
    const cities = await CheckoutService.getCities({ city })
    return cities
  },

  async getNewPostDepartments ({ commit }, { department, city, size, sort }) {
    const newPostDepartments = await CheckoutService.getNewPostDepartments({ department, city, size, sort })
    commit('SET_NEW_POST_DEPARTMENTS', newPostDepartments)
    return newPostDepartments
  },

  async getJustinDepartments ({ commit }, { city, department, size, sort }) {
    const justinDepartments = await CheckoutService.getJustinDepartments({ department, city, size, sort })
    commit('SET_JUSTIN_DEPARTMENTS', justinDepartments)
    return justinDepartments
  },

  async getOrderByCartId ({ commit }, cartId) {
    const { result: order } = await CheckoutService.getOrderByCartId(cartId)
    commit('SET_ORDER', order)

    return order
  },

  async getStreetsByCity ({ commit }, { city, street, size, sort }) {
    const streets = await CheckoutService.getStreets({ city, street, size, sort })
    commit('SET_STREETS', streets)
    return streets
  },

  async getLiqpayUrl({ commit }, params) {
    const res = await CheckoutService.getLiqpayUrl(params)
    if (res.result && res.result.url) {
      return res.result.url
    }
  },

  async getLiqpayStatus({ commit }, params) {
    const res = await CheckoutService.getLiqpayOrderStatus(params)
    return res.result && res.result.status
  },

  async init ({ dispatch, commit, rootState }) {
    const city = rootState.ui.city
    const [shop, newPost, justin] = await Promise.all([
      dispatch('getShops', { city, size: 1 }),
      dispatch('getNewPostDepartments', { city, size: 1 }),
      dispatch('getJustinDepartments', { city, size: 1 })
    ])
    commit('SET_SELECTED_SHOP', shop[0])
    commit('SET_SELECTED_NEW_POST_SHIPPING', newPost[0])
    commit('SET_SELECTED_JUSTIN', justin[0])
  } 
}

export default actions
