import Promotional from './Promotional'
import Attribute from './Attribute'

export default interface PromotionalState {
  promotionals: Promotional[],
  attributes: Attribute[],
  filters: any[],
  promotional: Promotional,
  filtersMap: any[],
  promotionalStat: any
}
