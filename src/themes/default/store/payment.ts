import { PaymentService } from '@vue-storefront/core/data-resolver'

export const paymentStore = {
  namespaced: true,
  state: {
    payment_system: 'cashondelivery',
  },
  getters: {
    getActivePaymentMethod(state) {
      return state.payment_system;
    },
  },
  mutations: {
    SET_NEW_ACTIVE_PAYMENT_METHOD(state , new_payment_method) {
      state.payment_system = new_payment_method;
    },
  },
}
