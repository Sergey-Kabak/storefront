import * as types from './mutation-types'
import { MutationTree } from 'vuex'
import CreditState from './types/CreditState'

const mutations: MutationTree<CreditState> = {
  [types.CREDIT_SET_BANKS] (state, { banks }) {
    state.banks = banks.map(bank => {
      bank.visible = true
      return bank;
    });
  },
  [types.CREDIT_SET_SELECTED_BANK] (state, { bank }) {
    state.selectedBank = bank;
  },
  [types.CREDIT_SET_SELECTED_CREDIT] (state, { credit }) {
    state.selectedCredit = credit;
  },
  [types.CREDIT_SET_METHOD] (state, { creditMethod }) {
    state.creditMethod = creditMethod;
  },
  SET_PART_PAYMENT (state, payload) {
    state.PartPaymentData = payload
  }
}

export default mutations