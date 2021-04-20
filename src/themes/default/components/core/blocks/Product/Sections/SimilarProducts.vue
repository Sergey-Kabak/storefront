<template>
  <div class="v-container similar-products">
    <div class="row">
      <div class="col-12">
        <lazy-hydrate when-idle>
          <related-products type="upsell" :heading="$t('We found other products you might like')" />
        </lazy-hydrate>
        <div class="banner flex">
          <picture class="w-100">
            <source srcset="/assets/promo/delivery_mobile.jpg" media="(max-width: 400px)">
            <source srcset="/assets/promo/delivery_tablet.jpg" media="(max-width: 991px) and (min-width: 401)">
            <source srcset="/assets/promo/delivery_desktop.jpg">
            <img src="/assets/promo/delivery_desktop.jpg" class="promo-image w-100">
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

.banner {
  margin: 68px 0
}


@media (max-width: 768px) {
  .banner {
    margin: 48px 0;
  }

  .similar-products {
    margin-bottom: 48px;
  }
}
</style>
