import config from 'config';
import { DataResolver } from '../types/EsputnikResolver';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'

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

export const EsputnikService: DataResolver.EsputnikService = {
  subscribe
}
