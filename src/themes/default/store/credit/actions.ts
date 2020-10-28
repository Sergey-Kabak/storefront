import * as types from './mutation-types'
import { CreditService } from '@vue-storefront/core/data-resolver/CreditService';

const actions = {
  creditSetBanks ({ commit }, { banks }) {
    commit(types.CREDIT_SET_BANKS, { banks })
  },
  creditSetSelectedBank ({ commit }, { bank }) {
    console.log(bank);
    commit(types.CREDIT_SET_SELECTED_BANK, { bank })
  },
  creditSetSelectedCredit ({ commit }, { credit }) {
    console.log(credit);
    commit(types.CREDIT_SET_SELECTED_CREDIT, { credit })
  },
  creditSetFields ({ commit }, { fields }) {
    commit(types.CREDIT_SET_FIELDS, { fields })
  },
  fetchBanks ({ commit }, sku) {
    CreditService.getCredits(sku)
      .then(res => commit(types.CREDIT_SET_BANKS, { banks: res.result }))
      .catch(error => commit(types.CREDIT_SET_BANKS, { banks: [] }))
  },
  fetchBanksCheckout ({ commit }, cartId) {
    CreditService.getCreditsCheckout(cartId)
      .then(res => {
        console.log(res.result);
        commit(types.CREDIT_SET_BANKS, { banks: res.result })
        commit(types.CREDIT_SET_SELECTED_BANK, { bank: res.result[0] })
      })
      .catch(error => commit(types.CREDIT_SET_BANKS, { banks: [] }))
  }
}

export default actions
