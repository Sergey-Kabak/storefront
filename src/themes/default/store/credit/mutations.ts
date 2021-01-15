import * as types from './mutation-types'
import { MutationTree } from 'vuex'
import CreditState from './types/CreditState'

const mutations: MutationTree<CreditState> = {
  [types.CREDIT_SET_BANKS] (state, { banks }) {
    if (state.selectedBank) {
      // @ts-ignore
      const bankCondition = banks.find(bank => bank.id === state.selectedBank.id)
      if (bankCondition) {
        state.selectedBank = bankCondition;
        const credits = bankCondition.credits
        if (credits && state.selectedCredit) {
          // @ts-ignore
          const creditCondition = credits.find(credit => credit.credit_id === state.selectedCredit.credit_id)
          state.selectedCredit = creditCondition || credits[0];
        }
      } else {
        state.selectedBank = banks[0];
        state.selectedCredit = banks[0].credits[0];
      }
    } else if (banks.length) {
      state.selectedBank = banks[0];
      state.selectedCredit = banks[0].credits[0];
    }
    state.banks = banks.map(bank => {
      bank.visible = true
      return bank;
    });
  },
  [types.CREDIT_SET_CREDIT_BANKS] (state, { banks }) {
    state.creditBanks = banks;
  },
  [types.CREDIT_SET_PAYPARTS_BANKS] (state, { banks }) {
    state.paypartsBanks = banks;
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
