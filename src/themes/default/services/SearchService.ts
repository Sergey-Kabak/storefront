import fetch from 'isomorphic-fetch'
import config from 'config'
import { EvinentSearchResponse } from 'theme/types/EvinentSearchResponse'

const getProducts = async ({
  SearchQuery = null,
  Take = config.evinentSearch.productQuantity,  
  LanguageId = 1,
  CitiesIds = [999999]
}): Promise<EvinentSearchResponse> => {
  return fetch(config.evinentSearch.url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      SearchQuery,
      Take,
      LanguageId,
      CitiesIds
    })
  })
    .then(resp => { return resp.json() })
    .catch(error => {
      throw new Error('FetchError in request to EvinentSearch: ' + error.toString())
    })
}

export const SearchService = {
  getProducts
}
