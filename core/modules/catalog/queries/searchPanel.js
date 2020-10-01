import config from 'config'
import bodybuilder from 'bodybuilder'

export function prepareQuickSearchQuery (queryText) {
  let searchQuery = bodybuilder()
    .query('query_string', { 'default_field': 'name', 'query': `*${queryText.trim()}*`, default_operator: 'AND' })
    .filter('terms', 'visibility', [4])
    .filter('terms', 'status', [1, 2])

  if (config.products.listOutOfStockProducts === false) {
    searchQuery.filter('terms', 'stock.is_in_stock', { 'eq': true })
  }

  return searchQuery.build()
}
