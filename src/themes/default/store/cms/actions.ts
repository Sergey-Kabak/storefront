import { CmsService } from 'theme/services'
import { CmsMenu } from 'theme/types/Cms'

const actions = {
  async getCmsMenu ({ commit, state }): Promise<CmsMenu[]> {
    const menu = await CmsService.getCmsMenu()
    commit('SET_MENU', menu)
    return menu
  }
}

export default actions
