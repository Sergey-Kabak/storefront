import { BrandService } from 'theme/services'
import { Brand } from 'theme/types/Brand'

const actions = {
  async getBrand ({ commit, state }, brandName): Promise<Brand> {
    const brand = await BrandService.getBrand({ brandName })
    commit('SET_BRAND', brand) 
    if (!(state.brand && state.brand.activeCategory)) {
      commit('SET_ACTIVE_CATEGORY', brand && brand.categories && brand.categories[0])
    }
    return brand
  },

  async getBrands ({ commit }): Promise<Brand[]> {
    const brands = await BrandService.getBrands()
    commit('SET_BRANDS', brands)
    return brands
  }
}

export default actions
