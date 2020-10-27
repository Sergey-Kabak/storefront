import * as types from './mutation-types'
import { MutationTree } from 'vuex'
import CreditState from './types/CreditState'

const mutations: MutationTree<CreditState> = {
  [types.CREDIT_SET_BANKS] (state, { banks }) {
    state.banks = banks;
  },
  [types.CREDIT_SET_SELECTED_BANK] (state, { bank_index }) {
    state.selectedBank = bank_index;
  },
  [types.CREDIT_SET_SELECTED_CREDIT] (state, { credit }) {
    state.selectedCredit = credit;
  },
  [types.CREDIT_SET_FIELDS] (state, { fields }) {
    state.fields = fields;
  }
}

export default mutations
