<template>
  <div class="content">
    <h3 class="tab-title">{{ $t('ReviewsTab') }}</h3>
    <reviews
      :product-name="getOriginalProduct.name"
      :product-id="getOriginalProduct.id" />
  </div>
</template>

<script>
import Reviews from 'theme/components/core/blocks/Reviews/Reviews.vue';
import { mapGetters } from 'vuex'

export default {
  components: {
    Reviews
  },
  computed: {
    ...mapGetters({
      getOriginalProduct: 'product/getOriginalProduct'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/pages/Product/Tabs";
</style>
