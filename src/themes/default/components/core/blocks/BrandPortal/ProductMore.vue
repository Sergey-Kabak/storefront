<template>
  <div class="product-more" v-if="activeGroup">
    <div class="product-more-count" v-if="activeGroup.products_count">
      <span>{{ $tc(`{count} more items`, activeGroup.products_count) }}</span>
    </div>
    <router-link :to="localizedRoute(activeGroup.url)">
      <button-text class="product-more-button more">{{ $t('View all') }}</button-text>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonText from 'theme/components/theme/ButtonText'

export default {
  components: {
    ButtonText
  },
  computed: {
    ...mapState({
      activeGroup: (state) => state.brand.activeGroup
    })
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

</style>