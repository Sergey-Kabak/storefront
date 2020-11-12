<template>
  <div class="brand-categories">
    <div class="brand-categories-left">
      <h4 class="brand-categories-title">Аксессуары</h4>
      <div class="categories">
        <category-item v-for="(category, index) in categories" :category="category" :key="index"/>
      </div>
    </div>
    <div class="brand-categories-right" v-if="brand.banner_promo">
      <router-link :to="brand.promo_banner_link" :disabled="!brand.promo_banner_link">
        <img :src="promoBanner" class="brand-categories-banner" alt="promo">
      </router-link>
    </div>
  </div>
</template>

<script>
import CategoryItem from 'theme/components/core/blocks/BrandPortal/CategoryItem.vue';
import { mapState } from 'vuex';

export default {
  components: {
    CategoryItem
  },
  props: {
    categories: {
      type: Array,
      required: true,
      default: () => []
    }
  }, 
  computed: {
    ...mapState({
      brand: state => state.brand.brand
    }),
    promoBanner() {
      return this.getThumbnail(this.brand.banner_promo, 428, 321, 'brand')
    }
  }
}
</script>

<style lang="scss" scoped>
.brand-categories-left {
  max-width: 764px;
  width: 100%;
  margin-right: 20px;
}

.categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
}

.brand-categories-title {
  margin: 0 0 14px 0;
  font-family: DIN Pro;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
}

.brand-categories-banner {
  display: block;
  max-width: 428px;
  border-radius: 4px;
}

</style>
