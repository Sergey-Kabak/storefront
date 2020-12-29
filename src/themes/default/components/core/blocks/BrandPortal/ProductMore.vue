<template>
  <div class="product-more" v-if="activeGroup.products_count">
    <div class="product-more-count">
      
      <span>{{ $tc(`{count} more items`, activeGroup.products_count) }}</span>
    </div>
    <router-link :to="activeGroup.brand_page_url || categoryLink">
      <button-text class="product-more-button more">{{ $t('View all') }}</button-text>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'
import ButtonText from 'theme/components/theme/ButtonText'

export default {
  components: {
    ButtonText
  },
  computed: {
    ...mapState({
      activeGroup: (state) => state.brand.activeGroup
    }),
    categoryLink() {
      return formatCategoryLink(this.activeGroup)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;;
}
.product-more {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #E0E0E0;
  padding: 16px;
  height: 100%;
}

.product-more-count {
  font-family: DIN Pro;
  font-style: normal;
  font-size: 13px;
  line-height: 16px;
  color: #5F5E5E;
}

.product-more-button {
  text-transform: uppercase;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 12px;
  line-height: 13px;
  border-color:#23BE20!important;

  &:hover {
    border-color: transparent!important;
  }

  ::v-deep {
    span {
      color: #23BE20!important;
    }
  }
}

@media (max-width: 576px) {
  .product-more {
    justify-content: space-between;
  }
}
</style>