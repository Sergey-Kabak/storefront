<template>
  <div class="brand-products">
    <div class="brand-items">
      <category-select
        v-if="isShowGroupSelect"
        :groups="brand.groups"
        v-model="category"
      />
      <brand-item
        v-for="(brand, index) in brand.groups"
        @onCategoryChange="changeActiveGroup($event)"
        :key="index"
        :brand="brand"
        :class="{ active: category && category.id === brand.id }"
      />
    </div>
    <div class="products" v-if="isShowProducts">
      <no-ssr v-if="isMobile">
        <product-carousel :products="category.sub_groups"/>
      </no-ssr>
      <template v-else> 
        <product
          v-for="(product, index) in category.sub_groups"
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
  computed: {
    ...mapState({
      brand: state => state.brand.brand
    }),
    isShowGroupSelect() {
      return this.isTablet || this.isMobile
    },
    category: {
      get() {
        return this.$store.state.brand.activeGroup
      },
      set(category) {
        this.$store.commit('brand/SET_ACTIVE_GROUP', category)
      }
    },
    isShowProducts() {
      return this.category && this.category.sub_groups
    }
  },
  methods: {
    changeActiveGroup(group) {
      this.$store.commit('brand/SET_ACTIVE_GROUP', group)
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
  grid-auto-rows: 1fr
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
