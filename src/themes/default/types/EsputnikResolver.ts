import Task from '@vue-storefront/core/lib/sync/types/Task'

export declare namespace DataResolver {
  interface EsputnikService {
    subscribe: (data: any) => Promise<Task>,
    triggerEvent: (data: any) => Promise<Task>,
    triggerAbandonProducts: (data: any) => any,
    triggerAbandonCart: (data: any) => any,
    triggerPasswordChanged: (data: any) => Promise<Task>
  }
}
