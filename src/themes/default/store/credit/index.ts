import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import CreditState from './types/CreditState'

export const module: Module<CreditState, any> = {
  namespaced: true,
  state: {
    banks: [],
    selectedBank: null,
    selectedCredit: null,
    accessories: null,
    services: null,
    productSku: null,
    creditExtraAttributes: null,
    creditMethod: 'pickup',
    creditDetails: {
      surname: '',
      name: '',
      last_name: '',
      date_of_birth: '',
      identification_code: null
    }
  },
  getters,
  actions,
  mutations
}
