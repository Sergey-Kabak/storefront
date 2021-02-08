<template>
  <div class="banner-description">
    <div v-if="getCurrentCategory.image" :class="{full: !getCurrentCategory.description}">
      <img class="desk" :src="thumbnail" alt="banner">
    </div>
    <div class="banner-description__block" v-if="getCurrentCategory.description">
      <h3>{{ $t('Description of the action') }}</h3>
      <div class="banner-description-info">
        <div class="banner-description__text-wrapper">
          <div class="banner-description__text" v-html="getCurrentCategory.description"></div>
        </div>
      </div>
      <promo-expiry-date
        v-if="getCurrentCategory.custom_design_from && getCurrentCategory.custom_design_from"
        :to="getCurrentCategory.custom_design_to"
        :from="getCurrentCategory.custom_design_from" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PromoExpiryDate from './PromoExpiryDate';

export default {
  components: {
    PromoExpiryDate
  },
  computed: {
    ...mapGetters({
      getCurrentCategory: 'category-next/getCurrentCategory'
    }),
    thumbnail () {
      return this.getThumbnail(this.getCurrentCategory.image.replace('/media/catalog/category/', ''), 0, 0, 'category')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
