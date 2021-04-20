import config from 'config';
import { DataResolver } from '../types/EsputnikResolver';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import store from '@vue-storefront/core/store'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

const checkoutStorage = StorageManager.get('checkout')
const events = {
  ABANDONED_CART: "abandoned_cart",
  ABANDONED_PRODUCTS: "abandoned_products",
  FAVORITES: "favorites",
  PASSWORD_CHANGED: "password_changed",
  ORDER_SUCCESS: "order_success",
  COMEBACK: "comeback",
  CART_UPDATED: "cartUpdated",
  PRODUCT_VIEWED: "productViewed",
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
  const sendEvent = () => TaskQueue.execute({
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
  let email = store.getters['user/getUserEmail']
  if (!email) {
    try {
      const details = await checkoutStorage.getItem('personal-details')
      if (!details) return;
      email = details.emailAddress;
      if (!email) return;
      return sendEvent()
    } catch (err) {
      throw err;
    }
  } else {
    return sendEvent()
  }
}

const triggerEventInBackground = async ({ eventName, params}) => {
  function sendBeacon() {
    let body = {
      eventTypeKey: eventName,
      keyValue: email,
      params
    }
    const headers = {
      type: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${config.esputnik.apiKey}`
    }
    let blob = new Blob([JSON.stringify(body)], headers);
    navigator.sendBeacon(`${url}/event`, blob);
  }
  let email = store.getters['user/getUserEmail']
  if (!email) {
    try {
      const details = await checkoutStorage.getItem('personal-details')
      if (!details) return;
      email = details.emailAddress;
      sendBeacon()
    } catch (err) {
      throw err;
    }
  } else {
    sendBeacon()
  }
  const details = await checkoutStorage.getItem('personal-details')
  if (!details) return;
  email = details.emailAddress;
  let body = {
    eventTypeKey: eventName,
    keyValue: email,
    params
  }
  const headers = {
    type: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Basic ${config.esputnik.apiKey}`
  }
  let blob = new Blob([JSON.stringify(body)], headers);
  navigator.sendBeacon(`${url}/event`, blob);
}

const triggerPasswordChanged = async ({ params }): Promise<Task> => {
  return triggerEvent({
    eventName: events.PASSWORD_CHANGED,
    params
  })
}

const triggerAbandonCart = async ({ items }) => {
  return triggerEventInBackground({
    eventName: events.ABANDONED_CART,
    params: items
  })
}
const triggerAbandonProducts = async ({ items }) => {
  return triggerEventInBackground({
    eventName: events.ABANDONED_PRODUCTS,
    params: items
  })
}
const triggerCartUpdated = async (payload): Promise<Task> => {
  return triggerEvent({
    eventName: events.CART_UPDATED,
    params: payload
  })
}

const triggerProductViewed = async (payload): Promise<Task> => {
  return triggerEvent({
    eventName: events.PRODUCT_VIEWED,
    params: payload
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
  triggerComebackEvent,
  triggerCartUpdated,
  triggerProductViewed
}
