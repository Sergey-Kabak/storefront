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
      .then(res => commit(types.CREDIT_SET_BANKS, { banks: res.result }))
      .catch(error => commit(types.CREDIT_SET_BANKS, { banks: [] }))
  },
  fetchBanksCheckout ({ commit, dispatch }, cartId) {
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
        commit(types.CREDIT_SET_ACCESSORIES, { accessories: accessories.items })
        commit(types.CREDIT_SET_SERVICES, { services: services.items })
        commit(types.CREDIT_SET_BANKS, { banks: res.result[0].bank })
        dispatch('defineSelectedCredit', res.result[0].bank[0])
        dispatch('defineSelectedBank', res.result[0].bank[0])
      })
      .catch(error => commit(types.CREDIT_SET_BANKS, { banks: [] }))
  },
  defineSelectedCredit ({ commit }, payload) {
    const productsInCart = this.getters['cart/getCartItems']
    if (productsInCart.length === 1 && productsInCart[0].credit) {
      commit(types.CREDIT_SET_SELECTED_CREDIT, { credit: productsInCart[0].credit })
    } else {
      commit(types.CREDIT_SET_SELECTED_CREDIT, { credit: payload.groups[Object.keys(payload.groups)[0]][0] })
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
  async findExtraCreditAttributes ({ commit }) {
    const creditProducts = this.getters['cart/getCartItems'].filter(it => !!it.credit_extra_tag)
    if (creditProducts.length) {
      const result = await this.dispatch('custom-attr/getCustomAttribute', ['credit_extra_tag'])
      // const attrs = creditProducts.map(it => it.credit_extra_tag)
    }
  }
}

export default actions
