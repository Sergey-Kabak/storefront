import config from 'config';
import { DataResolver } from './types/DataResolver';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl';

const getCredits = (): Promise<Task> => {
  return TaskQueue.execute({
    url: `${getApiEndpointUrl({endpoint: "/api/ext/credits"}, 'endpoint')}/`,
    payload: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
    }
  })
}

export const CreditService: DataResolver.CreditService = {
  getCredits
}
