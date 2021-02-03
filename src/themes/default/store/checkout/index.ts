import mutations from './mutations'
import actions from './actions'

export const getDefaultState = () => {
  return {
    personalDetailsStatus: 'active',
    shippingStatus: 'disabled',
    paymentStatus: 'disabled',
    selectedShipping: {},
    selectedPayment: {},
    courierShipping: {
      address: {},
      house: null,
      apartmentNumber: null
    },
    shopShipping: null,
    newPostShipping: null,
    justinShipping: null,
    shops: [],
    justinDepartments: [],
    newPostDepartments: [],
    totalShops: null,
    order: null,
    streets: []
  }
}

export const checkoutStore = {
  namespaced: true,
  state: getDefaultState(),
  mutations,
  actions
}
