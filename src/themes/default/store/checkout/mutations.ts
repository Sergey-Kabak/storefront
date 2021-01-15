import { getDefaultState } from './index';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { Logger } from '@vue-storefront/core/lib/logger'

const mutations = {
  SET_ACTIVE_SECTION (state, activeSection) {
    state.activeSection = activeSection
  },
  SET_PERSONAL_DETAILS_STATUS (state, personalDetailsStatus) {
    state.personalDetailsStatus = personalDetailsStatus
  },

  SET_SHIPPING_STATUS (state, shippingStatus) {
    state.shippingStatus = shippingStatus
  },

  SET_PAYMENT_STATUS (state, paymentStatus) {
    state.paymentStatus = paymentStatus
  },

  SET_SELECTED_SHIPPING (state, selectedShipping) {
    state.selectedShipping = selectedShipping
  },

  SET_SELECTED_PAYMENT (state, selectedPayment) {
    state.selectedPayment = selectedPayment
  },

  SET_SELECTED_SHOP (state, selectedShop) {
    state.shopShipping = selectedShop
  },

  SET_COURIER_SHIPPING (state, courierShipping) {
    StorageManager.get('checkout').setItem('courier-shipping', courierShipping).catch((reason) => {
      Logger.error(reason)()
    })
    state.courierShipping = courierShipping
  },

  SET_SHOPS (state, shops) {
    state.shops = shops
  },

  SET_SELECTED_NEW_POST_SHIPPING (state, newPostShipping) {
    state.newPostShipping = newPostShipping
  },
  
  SET_NEW_POST_DEPARTMENTS (state, newPostDepartments) {
    state.newPostDepartments = newPostDepartments
  },

  SET_SELECTED_JUSTIN (state, justinShipping) {
    state.justinShipping = justinShipping
  },
  
  SET_JUSTIN_DEPARTMENTS (state, justinDepartments) {
    state.justinDepartments = justinDepartments
  },

  SET_TOTAL_SHOPS (state, total) {
    state.totalShops = total
  },

  SET_ORDER (state, order) {
    state.order = order
  },

  SET_STREETS (state, streets) {
    state.streets = streets
  },

  RESET_CHECKOUT (state) {
    Object.assign(state, { ...getDefaultState(), order: state.order } )
  }
}

export default mutations
  