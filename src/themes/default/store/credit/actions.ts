import * as types from './mutation-types'
import { CreditService } from '../../services/index';
import { quickSearchByQuery } from '@vue-storefront/core/lib/search';

const actions = {
  creditSetSelectedBank ({ commit }, { bank }) {
    commit(types.CREDIT_SET_SELECTED_BANK, { bank })
  },
  creditSetSelectedCredit ({ commit }, { credit }) {
    commit(types.CREDIT_SET_SELECTED_CREDIT, { credit })
  },
  fetchBanks ({ commit }, sku) {
    CreditService.getCredits(sku)
      .then(res => {
        commit(types.CREDIT_SET_BANKS, { banks: res.result })
      })
      .catch(error => commit(types.CREDIT_SET_BANKS, { banks: [] }))
  },
  fetchBanksCheckout ({ state, commit, dispatch }, cartId) {
    CreditService.getCreditsCheckout(cartId)
      .then(async res => {
        commit(types.CREDIT_SET_BANKS, { banks: res.result[0].bank })
        dispatch('defineSelectedCredit', res.result[0].bank[0])
        dispatch('defineSelectedBank', res.result[0].bank[0])
        dispatch('findExtraCreditAttributes')
        state.productSku = res.result[0].sku
      })
      .catch(error => commit(types.CREDIT_SET_BANKS, { banks: [] }))
  },
  defineSelectedCredit ({ commit }, payload) {
    const productsInCart = this.getters['cart/getCartItems']
    if (productsInCart.length === 1 && productsInCart[0].credit) {
      commit(types.CREDIT_SET_SELECTED_CREDIT, { credit: productsInCart[0].credit })
    } else {
      commit(types.CREDIT_SET_SELECTED_CREDIT, { credit: payload.credits[0] })
    }
  },
  defineSelectedBank ({ commit }, payload) {
    const productsInCart = this.getters['cart/getCartItems']
    if (productsInCart.length === 1 && productsInCart[0].bank) {
      commit(types.CREDIT_SET_SELECTED_BANK, { bank: productsInCart[0].bank })
    } else {
      commit(types.CREDIT_SET_SELECTED_BANK, { bank: payload })
    }
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
