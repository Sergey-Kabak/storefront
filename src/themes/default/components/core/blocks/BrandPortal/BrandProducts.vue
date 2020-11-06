<template>
  <div class="brand-products">
    <div class="brand-items">
      <category-select
        v-if="isShowCategorySelect"
        :categories="brand.categories"
        v-model="category"
      />
      <brand-item
        v-else
        v-for="(brand, index) in brand.categories"
        @onCategoryChange="changeActiveCategory($event)"
        :key="index"
        :brand="brand"
        :class="{ active: category.id === brand.id }"
      />
    </div>
    <div class="products" v-if="isShowProducts">
      <no-ssr v-if="isMobile">
        <product-carousel :products="category.products"/>
      </no-ssr>
      <template v-else> 
        <product
          v-for="(product, index) in category.products"
          :key="index"
          :product="product"
        />
        <product-more />
      </template>
    </div>
  </div>
</template>

<script>
import BrandItem from 'theme/components/core/blocks/BrandPortal/BrandItem.vue'
import ProductCarousel from 'theme/components/core/blocks/BrandPortal/ProductCarousel.vue';
import Product from 'theme/components/core/blocks/BrandPortal/Product.vue'
import ProductMore from 'theme/components/core/blocks/BrandPortal/ProductMore.vue'
import mobileResolution from 'theme/mixins/mobileResolution'
import CategorySelect from 'theme/components/core/blocks/BrandPortal/CategorySelect.vue'
import { mapState } from 'vuex';
import NoSSR from 'vue-no-ssr';

export default {
  mixins: [mobileResolution],
  components: {
    Product,
    BrandItem,
    CategorySelect,
    ProductCarousel,
    ProductMore,
    'no-ssr': NoSSR
  },
  props: {
    brandItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    ...mapState({
      brand: state => state.brand.brand
    }),
    isShowCategorySelect() {
      return this.isTablet || this.isMobile
    },
    category: {
      get() {
        return this.$store.state.brand.activeCategory
      },
      set(category) {
        this.$store.commit('brand/SET_ACTIVE_CATEGORY', category)
      }
    },
    isShowProducts() {
      return this.category && this.category.products
    }
  },
  methods: {
    changeActiveCategory(category) {
      this.$store.commit('brand/SET_ACTIVE_CATEGORY', category)
    }
  }
};
</script>

<style lang="scss" scoped>
.brand-items {
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px
}

.products {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(204px, 1fr));
}

.product-more {
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  flex-direction: column;
  justify-content: center;

  ::v-deep {
    .product-more-count {
      margin-bottom: 16px;
    }
  } 
}


@media (max-width: 768px) {
  .brand-items {
    .brand-item {
      display: none;
    }
  }
}

@media (max-width: 576px) {
  .products {
    display: block;
  }

  .brand-items {
    margin-bottom: 16px;
  }
}
</style>
