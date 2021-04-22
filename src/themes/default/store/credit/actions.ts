import * as types from './mutation-types'
import { CreditService } from '../../services/index';
import { quickSearchByQuery } from '@vue-storefront/core/lib/search';

const actions = {
  async fetchBanks ({ commit, dispatch }, sku) {
    await CreditService.getCredits(sku)
      .then(res => {
        commit(types.CREDIT_SET_BANKS, { banks: res.result })
      })
      .catch(error => commit(types.CREDIT_SET_BANKS, { banks: [] }))
  },
  fetchBanksCheckout ({ state, commit, dispatch }, cartId) {
    CreditService.getCreditsCheckout(cartId)
      .then(async res => {
        if (res.result.length) {
          await dispatch('findExtraCreditAttributes')
          commit(types.CREDIT_SET_BANKS, { banks: res.result[0].bank })
          state.productSku = res.result[0].sku
          commit(types.CREDIT_SET_CREDIT_BANKS, { banks: [...res.result[0].bank].map(bank => {
            if (bank.credits.find(credit => !!+credit.partial_payment === false)) {
              return bank;
            }
          }).filter(it => !!it) });
          commit(types.CREDIT_SET_PAYPARTS_BANKS, { banks: [...res.result[0].bank].map(bank => {
            if (bank.credits.find(credit => !!+credit.partial_payment === true)) {
              return bank;
            }
          }).filter(it => !!it) });
        }
      })
      .catch(error => commit(types.CREDIT_SET_BANKS, { banks: [] }))
  },
  async findExtraCreditAttributes ({ state }) {
    const creditProducts = this.getters['cart/getCartItems'].filter(it => !!it.credit_extra_tag)
    if (creditProducts.length) {
      const query = {
        query: {
          bool: {
            should: ['credit_extra_tag'].map(it => {
              return { 'term': { 'attribute_code': it } }
            })
          }
        }
      };
      const resp = await quickSearchByQuery({ entityType: 'attribute', query });
      state.creditExtraAttributes = resp.items[0].options
    }
  },
  async sendPartPayment ({ state }, payload) {
    state.PartPaymentData.orderId = payload.orderNumber
    const res = await CreditService.PartPayment(JSON.stringify(state.PartPaymentData))
    return res.result
  },
  async partPaymentStatus ({ state }, payload) {
    const res = await CreditService.PartPaymentStatus(payload)
    return res.result
  }
}

export default actions
