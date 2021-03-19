import Task from '@vue-storefront/core/lib/sync/types/Task'

export declare namespace DataResolver {
  interface EsputnikService {
    subscribe: (data: any) => Promise<Task>,
    triggerEvent: (data: any) => Promise<Task>,
    triggerAbandonProducts: (data: any) => Promise<Task>,
    triggerAbandonCart: (data: any) => Promise<Task>,
    triggerPasswordChanged: (data: any) => Promise<Task>,
    triggerOrderSuccess: (data: any) => Promise<Task>,
    triggerComebackEvent: (data: any) => Promise<Task>,
  }
}
