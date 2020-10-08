export function prepareQuickSearchQuery (queryText) {
  return {
    query: {
      bool: {
        filter: {
          bool: {
            must: [
              { terms: { visibility: [3, 4] } },
              { terms: { status: [0, 1] } }
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
                    match: {
                      name: {
                        query: queryText,
                        fuzziness: 2,
                        boost: 4,
                        cutoff_frequency: 0.01,
                        max_expansions: 3,
                        prefix_length: 2,
                        minimum_should_match: '75%25'
                      }
                    }
                  },
                  {
                    match: {
                      sku: {
                        query: queryText,
                        fuzziness: 0,
                        boost: 2,
                        cutoff_frequency: 0.01,
                        max_expansions: 3,
                        prefix_length: 2
                      }
                    }
                  },
                  {
                    match: {
                      'category.name': {
                        query: queryText,
                        fuzziness: 2,
                        boost: 1,
                        cutoff_frequency: 0.01,
                        max_expansions: 2,
                        prefix_length: 2
                      }
                    }
                  },
                  {
                    bool: {
                      should: [
                        { terms: { 'configurable_children.sku': [queryText] } },
                        { match_phrase: { sku: { query: queryText, boost: 1 } } },
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
