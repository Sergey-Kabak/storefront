import * as types from './mutation-types'

const actions = {
  creditSetBanks ({ commit }, { banks }) {
    commit(types.CREDIT_SET_BANKS, { banks })
  },
  creditSetSelectedBank ({ commit }, { bank_index }) {
    commit(types.CREDIT_SET_SELECTED_BANK, { bank_index })
  },
  creditSetFields ({ commit }, { fields }) {
    commit(types.CREDIT_SET_FIELDS, { fields })
  },
}

export default actions
