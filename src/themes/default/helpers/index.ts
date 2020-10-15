import config from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export function getPathForStaticPage (path: string) {
  const { storeCode } = currentStoreView()
  const isStoreCodeEquals = storeCode === config.defaultStoreCode

  return isStoreCodeEquals ? `/i${path}` : path
}

export function unmask(maskedValue, mask){
  if (!maskedValue) return
  let defaultTokens = ['#', 'X', 'S', 'A', 'a', '!']
  let unmaskedValue = ''
  let isToken
  for (let i = 0; i < maskedValue.length; i++){
    isToken = false;
    for (let j = 0; j < defaultTokens.length; j++){
      if (mask[i] == defaultTokens[j]){
        isToken = true
      }
    }
    if (isToken){
      unmaskedValue += maskedValue[i]
    }
  }

  return unmaskedValue;
}
