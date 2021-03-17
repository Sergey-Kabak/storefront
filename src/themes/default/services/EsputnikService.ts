import config from 'config';
import { DataResolver } from '../types/EsputnikResolver';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import store from '@vue-storefront/core/store'

const events = {
  ABANDONED_CART: "abandoned_cart",
  ABANDONED_PRODUCTS: "abandoned_products",
  FAVORITES: "favorites",
  PASSWORD_CHANGED: "password_changed"
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic YW55dmFsdWU6RTdFNzhCRTQyODBFNUYxRkM1RDlBNEZCOEFFNUU1RDc='
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
  // const email = store.getters['user/getUserEmail']
  const email = 'ihavenonameTaras@gmail.com'
  if (!email) return;
  const res = await TaskQueue.execute({
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
  return res;
}

const triggerEventInBackground = async ({ eventName, params}) => {
  const email = store.getters['user/getUserEmail']
  if (!email) return;

  let body = {
    eventTypeKey: eventName,
    keyValue: email,
    params
  }
  const headers = {
    type: 'application/json',
    'Authorization': 'Basic YW55dmFsdWU6RTdFNzhCRTQyODBFNUYxRkM1RDlBNEZCOEFFNUU1RDc='
  }
  let blob = new Blob([JSON.stringify(body)], headers);

  navigator.sendBeacon(`${url}/event`, blob);
}

const triggerAbandonCart = async ({ items }) => {
  return triggerEvent({
    eventName: events.ABANDONED_CART,
    params: items
  })
}
const triggerPasswordChanged = async (params): Promise<Task> => {
  return triggerEvent({
    eventName: events.PASSWORD_CHANGED,
    params
  })
}

const triggerAbandonProducts = async ({ items }) => {
  return triggerEvent({
    eventName: events.ABANDONED_PRODUCTS,
    params: items
  })
}

export const EsputnikService: DataResolver.EsputnikService = {
  subscribe,
  triggerEvent,
  triggerAbandonCart,
  triggerAbandonProducts,
  triggerPasswordChanged
}
