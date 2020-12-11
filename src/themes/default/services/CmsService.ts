import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { CmsMenu } from 'theme/types/Cms'

const getCmsMenu = async (): Promise<CmsMenu[]> => {
  const { items: menu = [] } = await quickSearchByQuery({
    entityType: 'cms_page',
    includeFields: ['title', 'identifier']
  })

  return menu
}


export const CmsService = {
  getCmsMenu
}
