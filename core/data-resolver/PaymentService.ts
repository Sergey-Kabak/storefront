import config from 'config';
import { DataResolver } from './types/DataResolver';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl';

const cancelPayment = (orderId: number): Promise<Task> => {
  return TaskQueue.execute({
		url: `${getApiEndpointUrl(config.payments, 'endpoint')}/cancel`,
		payload: {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			mode: 'cors',
			body: JSON.stringify({ orderId })
		}
	})
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

export const PaymentService: DataResolver.PaymentService = {
	cancelPayment,
  getOrderByCartId
}
