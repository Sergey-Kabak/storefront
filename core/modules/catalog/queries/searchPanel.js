export function prepareQuickSearchQuery (queryText) {
  return {
    query: {
      bool: {
        filter: {
          bool: {
            must: [
              { terms: { visibility: [3, 4] } },
              { terms: { status: [0, 1] } },
              { script: { script: 'doc["category_ids"].size() > 0' } }
            ]
          }
        },
        must: {
          function_score: {
            functions: [
              {
                filter: { match: { attribute_code: 'attribute_value' } },
                weight: 1
              }
            ],
            score_mode: 'multiply',
            boost_mode: 'multiply',
            max_boost: 100,
            min_score: 1,
            query: {
              bool: {
                should: [
                  {
                    multi_match: {
                      fields: [
                        'name^6',
                        'category.name^2',
                        'description^2'
                      ],
                      query: queryText,
                      operator: 'or',
                      max_expansions: 10,
                      prefix_length: 2,
                      tie_breaker: '1',
                      type: 'most_fields'
                    }
                  },
                  {
                    bool: {
                      should: [
                        { term: { sku: { value: queryText, boost: 10 } } }
                      ]
                    }
                  },
                  {
                    bool: {
                      should: [
                        { terms: { 'configurable_children.sku': [queryText] } },
                        {
                          match_phrase: {
                            sku: { query: queryText, boost: 1 }
                          }
                        },
                        {
                          match_phrase: {
                            'configurable_children.sku': {
                              query: queryText,
                              boost: 1
                            }
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          }
        }
      }
    },
    sort: [
      { 'stock.is_in_stock': 'desc' },
      { '_score': 'desc' }
    ],
    size: 20,
    min_score: 0.02
  };
}
