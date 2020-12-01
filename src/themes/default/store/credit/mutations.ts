import * as types from './mutation-types'
import { MutationTree } from 'vuex'
import CreditState from './types/CreditState'

const mutations: MutationTree<CreditState> = {
  [types.CREDIT_SET_BANKS] (state, { banks }) {
    state.banks = banks;
  },
  [types.CREDIT_SET_SELECTED_BANK] (state, { bank }) {
    state.selectedBank = bank;
  },
  [types.CREDIT_SET_SELECTED_CREDIT] (state, { credit }) {
    console.log(credit);
    state.selectedCredit = credit;
  },
  [types.CREDIT_SET_ACCESSORIES] (state, { accessories }) {
    state.accessories = accessories;
  },
  [types.CREDIT_SET_SERVICES] (state, { services }) {
    state.services = services;
  },
  [types.CREDIT_SET_METHOD] (state, { creditMethod }) {
    state.creditMethod = creditMethod;
  }
}

export default mutations
