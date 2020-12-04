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
        res.result.map(bank => {
          const sorted = bank.groups[Object.keys(bank.groups)[0]].sort((a, b) => +b.terms - +a.terms)
          return sorted.map((el, index) => {
            if (sorted.filter(it2 => {
              return it2.terms === el.terms
            }).length > 1) {
              delete sorted[index]
            }
            return sorted
          })
        })
        commit(types.CREDIT_SET_BANKS, { banks: res.result })
      })
      .catch(error => commit(types.CREDIT_SET_BANKS, { banks: [] }))
  },
  fetchBanksCheckout ({ state, commit, dispatch }, cartId) {
    CreditService.getCreditsCheckout(cartId)
      .then(async res => {
        let queryAccessory = {
          query: {
            bool: {
              should: res.result[0].accessory.map(it => {
                return { 'term': { 'sku': it } }
              })
            }
          }
        }
        let queryService = {
          query: {
            bool: {
              should: res.result[0].service.map(it => {
                return { 'term': { 'sku': it } }
              })
            }
          }
        }
        const accessories = await quickSearchByQuery({ entityType: 'product', query: queryAccessory })
        const services = await quickSearchByQuery({ entityType: 'product', query: queryService })
        res.result[0].bank.map(bank => {
          const sorted = bank.groups[Object.keys(bank.groups)[0]].sort((a, b) => +b.terms - +a.terms)
          return sorted.map((el, index) => {
            if (sorted.filter(it2 => {
              return it2.terms === el.terms
            }).length > 1) {
              delete sorted[index]
            }
            return sorted
          })
        })
        commit(types.CREDIT_SET_ACCESSORIES, { accessories: accessories.items })
        commit(types.CREDIT_SET_SERVICES, { services: services.items })
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
      commit(types.CREDIT_SET_SELECTED_CREDIT, { credit: payload.groups[Object.keys(payload.groups)[0]].find(el => !!el) })
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
  }
}

export default actions
