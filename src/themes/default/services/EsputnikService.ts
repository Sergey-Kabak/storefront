import config from 'config';
import { DataResolver } from '../types/EsputnikResolver';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import store from '@vue-storefront/core/store'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

const checkoutStorage = StorageManager.get('checkout')
let email = null
const events = {
  ABANDONED_CART: "abandoned_cart",
  ABANDONED_PRODUCTS: "abandoned_products",
  FAVORITES: "favorites",
  PASSWORD_CHANGED: "password_changed",
  ORDER_SUCCESS: "order_success",
  COMEBACK: "comeback"
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${config.esputnik.apiKey}`
}

const url = 'https://esputnik.com/api/v1'

const subscribe = async ({ email }): Promise<Task> => {
  return TaskQueue.execute({
    url: `${url}/contact/subscribe`,
    payload: {
      method: 'POST',
      headers,
      body: JSON.stringify({
        "contact": {
          "channels": [
            {
              "type": "email",
              "value": email
            }
          ]
        }
      })
    }
  })
}
const triggerEvent = async ({ eventName, params}): Promise<Task> => {
  email = store.getters['user/getUserEmail']
  if (!email) {
    try {
      const details = await checkoutStorage.getItem('personal-details')
      email = details.emailAddress;
      if (!email) return;
      return TaskQueue.execute({
        url: `${url}/event`,
        payload: {
          method: 'POST',
          headers,
          body: JSON.stringify({
            eventTypeKey: eventName,
            keyValue: email,
            params
          })
        }
      })
    } catch (err) {
      throw err;
    }

  }
  if (!email) return;
}

const triggerAbandonCart = async ({ items }): Promise<Task> => {
  return triggerEvent({
    eventName: events.ABANDONED_CART,
    params: items
  })
}
const triggerPasswordChanged = async ({ params }): Promise<Task> => {
  return triggerEvent({
    eventName: events.PASSWORD_CHANGED,
    params
  })
}

const triggerAbandonProducts = async ({ items }): Promise<Task> => {
  return triggerEvent({
    eventName: events.ABANDONED_PRODUCTS,
    params: items
  })
}

const triggerOrderSuccess = async (payload): Promise<Task> => {
  return await TaskQueue.execute({
    url: `${url}/orders`,
    payload: {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    }
  })
}
const triggerComebackEvent = async ({ items }): Promise<Task> => {
  return triggerEvent({
    eventName: events.COMEBACK,
    params: items
  })
}

export const EsputnikService: DataResolver.EsputnikService = {
  subscribe,
  triggerEvent,
  triggerAbandonCart,
  triggerAbandonProducts,
  triggerPasswordChanged,
  triggerOrderSuccess,
  triggerComebackEvent
}
