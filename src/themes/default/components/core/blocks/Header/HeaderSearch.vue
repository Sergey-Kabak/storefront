<template>
	<div class="header-search">
		<div class="search-input-group">
			<label for="search">
				<i class="material-icons search-icon">search</i>
			</label>
			<input
				ref="search"
				id="search"
				v-model="search"
				@input="makeSearch"
				@focus="setOverlay()"
				@blur="$v.search.$touch()"
				class="search-panel-input"
				:placeholder="$t('Найти продукт или бренд')"
			>
			<svg v-if="search" @click="closeSearchPanel()" class="reset-icon icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M14 1.40998L12.59 -1.52588e-05L7 5.58999L1.41 -1.52588e-05L0 1.40998L5.59 6.99999L0 12.59L1.41 14L7 8.40999L12.59 14L14 12.59L8.41 6.99999L14 1.40998Z" fill="#BDBDBD"/>
			</svg>
		</div>
		<div v-if="visibleProducts.length && categories.length > 1" class="categories">
			<category-panel :categories="categories" v-model="selectedCategoryIds" />
		</div>
		<div class="product-listing">
			<product-tile
				v-for="(product, index) in visibleProducts"
				:key="index"
				:product="product"
				@click.native="closeSearchPanel()"
			/>
			<transition name="fade">
				<div
					v-if="getNoResultsMessage"
					class="no-results relative center-xs h4 col-md-12"
				>
					{{ $t(getNoResultsMessage) }}
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel';
import ProductTile from 'theme/components/core/ProductTile';
import VueOfflineMixin from 'vue-offline/mixin';
import CategoryPanel from 'theme/components/core/blocks/Category/CategoryPanel';

export default {
	components: {
    ProductTile,
    CategoryPanel
  },
  mixins: [SearchPanel, VueOfflineMixin],
  validations: {
    search: {
      minLength: function() {
				return this.search < 3
			}
    }
	},
	data () {
    return {
      selectedCategoryIds: []
    }
  },
	computed: {
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
      const categories = this.products
        .filter(p => p.category)
        .map(p => p.category)
        .flat()

      const discinctCategories = Array.from(
        new Set(categories.map(c => c.category_id))
      ).map(catId => categories.find(c => c.category_id === catId))

      return discinctCategories
    },
    getNoResultsMessage () {
      let msg = ''
      if (this.emptyResults) {
        msg = 'No results were found.'
      }
      return msg
    }
	},
	watch: {
    categories () {
      this.selectedCategoryIds = []
    }
  },
	methods: {
		setOverlay() {
			this.$store.commit('ui/setMobileSearch', true)
			document.documentElement.style.overflow = 'hidden'
			this.$store.commit('ui/setOverlay', true)
			this.$store.commit('ui/setHeaderIndex', 4)
		},
		closeSearchPanel() {
			this.$store.commit('ui/setMobileSearch', false)
			this.search = ''
			this.makeSearch(this.search)
			this.$store.commit('ui/setOverlay', false)
			document.documentElement.style.overflow = 'auto'
		}
	}
}
</script>

<style lang="scss" scoped>
	.search-input-group {
		position: relative;
		height: 100%;
		height: 48px;
	}

	.search-panel-input {
		box-sizing: border-box;
		width: 100%;
		border: none;
		padding-left: 40px;
		font-family: DIN Pro;
		font-style: normal;
		font-size: 15px;
		line-height: 24px;
		color: #9f9e9e;

		&:active,
		&:focus {
			outline: none;
		}
	}

	.search-icon {
		color: #23BE20;
		position: absolute;
		left: 0;
		width: 24px;
		top: 50%;
		transform: translateY(-50%);
	}

	.reset-icon {
		cursor: pointer;
		position: absolute;
		right: 17px;
		top: 50%;
		transform: translateY(-50%);
		padding: 10px;
	}

	.no-results {
		padding: 20px;
	}

	@media (max-width: 767px) {
		.search-icon {
			left: 18px;
		}

		.search-panel-input {
			padding: 0 20px 0 56px;
		}

		.categories {
			padding: 0 15px;
		}
	}
</style>
