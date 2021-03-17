<template>
  <div class="recently-viewed" v-if="products && products.length">
    <h3 class="recently-viewed-title">
      {{ $t('My Recently viewed products') }}
    </h3>
    <product-listing columns="4" :products="products" />
  </div>
</template>

<script>
import RecentlyViewed from '@vue-storefront/core/modules/recently-viewed/components/RecentlyViewed';
import ProductListing from 'theme/components/core/ProductListing.vue';

export default {
  props: {
    maxLength: {
      type: Number,
      default: null
    }
  },
  mixins: [RecentlyViewed],
  components: {
    ProductListing
  },
  computed: {
    products() {
      return this.maxLength ? this.items && this.items.slice(0, this.maxLength) : this.items
    }
  }
}
</script>

<style scoped lang="scss">
.recently-viewed {
  margin-bottom: 68px;
}

.recently-viewed-title {
  font-family: DIN Pro;
  font-weight: 400;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
  margin-bottom: 32px;
  margin: 0 0 32px 0;
}
</style>