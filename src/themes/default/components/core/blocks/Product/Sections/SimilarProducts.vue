<template>
  <div class="v-container similar-products">
    <div class="row">
      <div class="col-12">
        <lazy-hydrate when-idle>
          <related-products type="upsell" :heading="$t('We found other products you might like')" />
        </lazy-hydrate>
        <div class="banner flex my30">
          <picture class="w-100">
            <source srcset="/assets/promo/delivery_promo_288x260.jpg" media="(max-width: 575px)">
            <source srcset="/assets/promo/delivery_promo_1324x260.jpg">
            <img src="/assets/promo/delivery_promo_1324x260.jpg" class="promo-image w-100">
          </picture>
        </div>
        <lazy-hydrate when-idle>
          <related-products type="related" />
        </lazy-hydrate>
      </div>
    </div>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import RelatedProducts from 'theme/components/core/blocks/Product/Related.vue';

export default {
  components: {
    LazyHydrate,
    RelatedProducts
  }
}
</script>

<style scoped>
.similar-products{
  margin-bottom: 68px;
}
</style>
