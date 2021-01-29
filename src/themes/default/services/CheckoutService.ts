import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import bodybuilder from 'bodybuilder'
import { Shop } from 'theme/types/Shop'
import { Street } from 'theme/types/Street'
import config from 'config';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl';


const getCities = async ({
  city = null,
  size = 9999,
  sort = ''
} = {}): Promise<Shop[]> => {
  let searchQuery = bodybuilder();

  searchQuery.aggregation('terms', 'CityDescription')

  if (city) {
    searchQuery = searchQuery.query('query_string', 
    {
      "query": `*${city}*`, 
      "fields": ["CityDescription"]
    })
  }

  const resp = await quickSearchByQuery({
    entityType: 'nova_poshta_warehouse',
    query: searchQuery.build(),
    size,
    sort,
    includeFields: ['CityDescription']
  })

  return resp.aggregations && resp.aggregations.agg_terms_CityDescription && resp.aggregations.agg_terms_CityDescription.buckets.map(it => it.key.charAt(0).toUpperCase() + it.key.slice(1))
}

const getStreets = async ({
  city = null,
  street = null,
  size = 100,
  sort = ''
} = {}): Promise<Street[]> => {
  let searchQuery = bodybuilder();
  searchQuery.query('match', 'CityDescription', city)
  if (street) {
    searchQuery = searchQuery.query('query_string', 
    {
      "query": `*${street}*`, 
      "fields": ["Description"]
    })
  }

  const { items: streets } = await quickSearchByQuery({
    entityType: 'nova_poshta_city_street',
    query: searchQuery.build(),
    size,
    sort
  })
  return streets
}


const getNewPostDepartments = async ({
  department = null,
  city = null,
  size = 9999,
  sort = ''
} = {}): Promise<any> => {
  let searchQuery = bodybuilder();

  searchQuery.query('match', 'CityDescription', city)

  if (department) {
    searchQuery = searchQuery.query('query_string', 
    {
      "query": `*${department}*`, 
      "fields": ["Description"]
    })
  }

  const resp = await quickSearchByQuery({
    entityType: 'nova_poshta_warehouse',
    query: searchQuery.build(),
    size,
    sort
  })

  return resp.items
}

const getJustinDepartments = async ({
  department = null,
  city = null,
  size = 9999,
  sort = ''
} = {}): Promise<any> => {
  let searchQuery = bodybuilder();
  searchQuery.query('match', 'city_descr_ua', city)

  if (department) {
    searchQuery = searchQuery.query('query_string', 
    {
      "query": `*${department}*`, 
      "fields": ["address_ua"]
    })
  }

  const resp = await quickSearchByQuery({
    entityType: 'justin_departments',
    query: searchQuery.build(),
    size,
    sort
  })

  return resp.items
}

const getOrderByCartId = (cartId: string): Promise<Task> => {
  return TaskQueue.execute({
    url: `${getApiEndpointUrl(config.payments, 'endpoint')}/order-information`,
    payload: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({ cartId })
    }
  })
}

const getLiqpayUrl = (params): Promise<Task> => {
  return TaskQueue.execute({
    url: `${getApiEndpointUrl(config.payments, 'endpoint')}/liqpay`,
    payload: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(params)
    }
  })
}

const getLiqpayOrderStatus = (params): Promise<Task> => {
  return TaskQueue.execute({
    url: `${getApiEndpointUrl(config.payments, 'endpoint')}/liqpay-status`,
    payload: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(params)
    }
  })
}

export const CheckoutService = {
  getCities,
  getNewPostDepartments,
  getJustinDepartments,
  getOrderByCartId,
  getStreets,
  getLiqpayUrl,
  getLiqpayOrderStatus
}
