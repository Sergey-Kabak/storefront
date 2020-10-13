import config from 'config';
import { DataResolver } from './types/DataResolver';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl';

const headers = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
}

const getCredits = async (sku: any): Promise<Task> => {
  return TaskQueue.execute({
    url: `${getApiEndpointUrl({endpoint: "/api/ext/credits?sku=" + sku}, 'endpoint')}`,
    payload: {
      method: 'GET',
      headers,
      mode: 'cors',
    }
  })
}

const getCreditsCheckout = async (cart_id: any): Promise<Task> => {
  return TaskQueue.execute({
    url: `${getApiEndpointUrl({endpoint: "/api/ext/credits/" + cart_id}, 'endpoint')}`,
    payload: {
      method: 'GET',
      headers,
      mode: 'cors',
    }
  })
}

export const CreditService: DataResolver.CreditService = {
  getCredits,
  getCreditsCheckout
}
