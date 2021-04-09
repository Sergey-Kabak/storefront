import Task from '@vue-storefront/core/lib/sync/types/Task'

export declare namespace DataResolver {
  interface EsputnikService {
    subscribe: (data: any) => Promise<Task>,
    triggerEvent: (data: any) => Promise<Task>,
    triggerAbandonProducts: (data: any) => void,
    triggerAbandonCart: (data: any) => void,
    triggerPasswordChanged: (data: any) => Promise<Task>,
    triggerOrderSuccess: (data: any) => Promise<Task>,
    triggerComebackEvent: (data: any) => Promise<Task>,
    triggerCartUpdated: (data: any) => Promise<Task>,
    triggerProductViewed: (data: any) => Promise<Task>
  }
}
