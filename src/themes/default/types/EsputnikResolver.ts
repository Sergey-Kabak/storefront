import Task from '@vue-storefront/core/lib/sync/types/Task'

export declare namespace DataResolver {
  interface EsputnikService {
    subscribe: (data: any) => Promise<Task>
  }
}
