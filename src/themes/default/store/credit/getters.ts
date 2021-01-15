import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CreditState from './types/CreditState'

const getters: GetterTree<CreditState, RootState> = {
  getBanks (state) {
    return state.banks;
  },
  getSelectedBank (state) {
    return state.selectedBank;
  },
  getSelectedCredit (state) {
    return state.selectedCredit;
  },
  creditMethod (state) {
    return state.creditMethod
  },
  getPaypartsBanks: state => state.paypartsBanks,
  getCreditBanks: state => state.creditBanks,
  getPartPaymentData (state) {
    return state.PartPaymentData
  }
}

export default getters
