import Task from '@vue-storefront/core/lib/sync/types/Task'

export declare namespace DataResolver {
  interface CreditService {
    getCredits: (sku: string) => Promise<Task>,
    getCreditsCheckout: (cart_id: string) => Promise<Task>
  }
}
