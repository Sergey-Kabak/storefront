<template>
  <div
    class="searchpanel"
    data-testid="searchPanel"
    ref="search-panel"
  >
    <close-sidebar @close="closeSearchpanel()" v-if="!mobile"/>
    <div class="search-panel-wrapper">
      <div class="searh-header" v-if="!mobile">
        <span class="search-title">
          {{ $t('Type what you are looking for...') }}
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z" fill="#23BE20"/>
        </svg>
      </div>
      <div class="search-input">
        <input
          ref="search"
          name="search-input"
          :class="{ 'active': this.search }"
          id="search"
          v-model="search"
          @focus="setOverlay()"
          @input="makeSearch"
          class="search-panel-input"
          :placeholder="$t('find product or brand')"
          autocomplete="chrome-off"
        >
        <svg v-if="search" @click="resetSearch()" class="reset-icon" fill="#BDBDBD" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
        </svg>
        <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z" fill="#23BE20"/>
        </svg>
      </div>
      <div class="search-content" v-if="isShowSearchContent">
        <category-panel
          :categories="categories"
          v-model="selectedCategoryIds"
          class="categories"
        />
        <div class="product-listing">
          <product
            v-for="(product, index) in visibleProducts"
            :key="index"
            :isShowButtons="false"
            :product="product"
            gtm-list="Search results"
          />
        </div>
      </div>
      <div class="empty-content" v-if="isShowEmptyContent">
        <div class="empty-header">
          <span>{{ $t('at your request') }} <span class="empty-header-highlight">“{{ search }}”</span>  {{ $t('nothing found') }} :(</span>
        </div>
        <div class="best-sellers" v-if="recommend.products.length">
          <div class="best-sellers-title">{{ $t('may suit you') }}</div>
          <div class="product-listing">
            <product
              v-for="(product, index) in recommend.products"
              :key="index"
              isShowButtons
              :product="product"
              gtm-list="search results"
            />
          </div>
          <button-outline
            v-if="recommend.isFilled"
            @click.native="loadMoreRecommends()"
            class="load-more"
          >{{ $t('Load more') }}</button-outline>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel';
import Product from 'theme/components/core/blocks/SearchPanel/Product';
import CategoryPanel from 'theme/components/core/blocks/SearchPanel/CategoryPanel';
import CloseSidebar from 'theme/components/core/CloseSidebar';
import VueOfflineMixin from 'vue-offline/mixin';
import uniqBy from 'lodash-es/uniqBy'
import { mapState } from 'vuex';
import ButtonOutline from 'theme/components/theme/ButtonOutline';
import {
  clearAllBodyScrollLocks,
  disableBodyScroll
} from 'body-scroll-lock';

export default {
  components: {
    CategoryPanel,
    Product,
    ButtonOutline,
    CloseSidebar
  },
  props: {
    mobile: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mixins: [SearchPanel, VueOfflineMixin],
  data () {
    return {
      selectedCategoryIds: []
    }
  },
  computed: {
    ...mapState({
      overlay: (state) => state.ui.overlay,
      isSearchActive: (state) => state.ui.isSearchActive
    }),
    visibleProducts () {
      const productList = this.products || []
      if (this.selectedCategoryIds.length) {
        return productList.filter(product => product.category_ids.some(categoryId => {
          const catId = parseInt(categoryId)
          return this.selectedCategoryIds.includes(catId)
        }))
      }
      return productList
    },
    categories () {
      const categories = this.products.reduce((acc, it) => acc.concat(it.category || []), [])
      return uniqBy(categories, 'category_id');
    },
    getNoResultsMessage () {
      let msg = ''
      if (!this.$v.search.minLength) {
        msg = 'Searched term should consist of at least 3 characters.'
      } else if (this.emptyResults) {
        msg = 'No results were found.'
      }
      return msg
    },
    isShowEmptyContent() {
      return this.emptyResults && this.search && (this.isSearchActive || !this.mobile)
    },
    isShowSearchContent() {
      return this.categories.length >= 1 && (this.isSearchActive || !this.mobile)
    }
  },
  watch: {
    categories () {
      this.selectedCategoryIds = []
    },
    overlay(val) {
      if (!val) {
        this.cancelSearch()
      }
    }
  },
  methods: {
    loadMoreRecommends() {
      this.loadRecommends(this.recommend.products.length)
    },
    setOverlay() {
      if (this.mobile) {
        disableBodyScroll(this.$refs.searchPanel)
        this.$store.commit('ui/setSearch', true)
      }
    },
    resetSearch() {
      this.search = ''
      this.cancelSearch()
      this.makeSearch()
    },
    cancelSearch() {
      if (this.mobile) {
        this.$store.commit('ui/setSearch', false)
        clearAllBodyScrollLocks()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/helpers/mixins';

* {
  box-sizing: border-box;
}
::v-deep .icon-wishlist {
  margin-right: 0;
}
.searchpanel {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}

.search-panel-wrapper {
  padding: 0 32px 32px;
  height: 100%;
}

.searh-header {
  display: flex;
  align-items: center;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
  margin-bottom: 32px;

  .search-title {
    margin-right: 18px;
  }
}

.search-input {
  position: relative;

  .reset-icon {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);

    &:hover {
      fill: #aeaeae;
    }

    &:active {
      fill: #9f9f9f;
    }
  }

  ::-webkit-input-placeholder {
    color: #a1a0a0;
  }
  ::-moz-placeholder {
    color: #a1a0a0;
  }
  :-ms-input-placeholder {
    color: #a1a0a0;
  }
  :-moz-placeholder {
    color: #a1a0a0;
  }

}

.search-panel-input {
  border-radius: 4px;
  border: 1px solid #E0E0E0;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border-radius: 4px;
  outline: 0;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 16px;
  color: #1A1919;


  &.active,
  &:focus {
    border-color: #23BE20;
  }
}

.search-content {
  height: 83%;
  overflow-y: auto;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  margin-top: 3px;
  
  @include scrollBar;

}

.categories {
  padding: 20px 15px 0 15px;
  margin-bottom: 24px;
}

//TODO rewrite product listing styles

.product-listing {


  .product {
    border-radius: 0;
    padding: 16px 15px;
    border: none;
    border: 1px solid #E0E0E0;
    margin-bottom: 20px;
  }
}

.empty-header {
  margin-top: 3px;
  padding: 20px 16px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 16px;
  color: #1A1919;

  &-highlight {
    font-weight: 600;
    word-break: break-all;
  }
}

.best-sellers {
  margin-top: 68px;
}

.best-sellers-title {
  font-family: DIN Pro;
  font-weight: 600;
  // font-size: 18px;
  // line-height: 24px;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
  margin-bottom: 32px;
}

.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 233px;
  margin: 32px auto 0 auto;
  height: 40px;
}

.mobile {
  position: relative;
  overflow-y: unset;
  height: 100%;
  padding: 0;

  .best-sellers {
    padding: 0 16px 48px;
  }

  .search-content {
    border-radius: 0;
    border: none;

  }

  .empty-header {
    border: none;
  }

  .search-panel-input {
    height: 47px;
    border: none;
    border-radius: 0;
  }

  .search-panel-wrapper {
    padding: 0;
  }
}

.product ::v-deep {
  .add-to-cart {
    max-width: 131px;

    svg {
      display: none;
    }
  }
}

.search-icon {
  display: none;
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
}

@media (max-width: 768px) {
  .search-icon {
    display: block;
  }

  .search-panel-input {
    font-size: 15px;
    padding-left: 56px;
  }
}

@media (max-width: 500px) {
  .empty-content {
    .product ::v-deep {
      .product-right-data {
        display: none;

        &.mobile {
          display: flex
        }
      }

      .add-to-cart {
        max-width: 38px;

        .add-to-cart-text {
          display: none;
        }

        svg {
          display: block;
          margin-right: 0;
        }
      }
    }
  }

  .empty-header {
    margin-top: 0;
  }

  .search-content {
    margin-top: 0;
  }

  .best-sellers {
    margin-top: 48px;
  }

  .best-sellers-title {
    margin-bottom: 24px;
  }
}

</style>
