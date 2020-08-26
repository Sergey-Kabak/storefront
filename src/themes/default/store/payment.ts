import { PaymentService } from '@vue-storefront/core/data-resolver'

export const paymentStore = {
  namespaced: true,
  actions: {
    async cancelPayment ({ commit, dispatch }, orderId) {
      return await PaymentService.cancelPayment(orderId)
    }
  }
}
