import { ShopService } from 'theme/services'
import { Shop } from 'theme/types/Shop'

const actions = {
  async getShops ({ commit }, { city, isAllowPickupLocation }): Promise<Shop[]> {
    const { shops } = await ShopService.getShops({ city, isAllowPickupLocation })
    commit('SET_SHOPS', shops) 

    return shops
  },
  async getCities ({ commit }, { city }): Promise<Shop[]> {
    const cities = await ShopService.getCities({ city, includeFields: ['city'] })
    commit('SET_CITIES', cities)
    return cities
  }
}

export default actions
