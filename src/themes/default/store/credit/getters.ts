import {GetterTree} from 'vuex'
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
  getFields (state) {
    return state.fields;
  }
}

export default getters
