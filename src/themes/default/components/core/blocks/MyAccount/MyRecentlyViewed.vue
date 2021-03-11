<template>
  <div class="recently-viewed">
    <div class="recently-viewed-header">
      <h2 class="account-page-title">{{ $t($route.name) }}</h2>
      <span class="recently-viewed-count" v-if="items && items.length">{{ $tc('{count} items', items.length) }}</span>
      <button-text
        class="remove-products"
        @click.native="removeItems()"
        v-if="items && items.length"
      >
        {{ $t('Remove all') }}
      </button-text>
    </div>
    <product-listing columns="3" :products="items" v-if="items && items.length"/>
    <div class="empty" v-else>
      <div class="empty-title">{{ $t('no viewed products yet') }}:(</div>
      <span class="empty-description">{{ $t('no viewed products description') }}</span>
      <div class="emojis">
        <span>&#128241;</span>
        <span>&#128247;</span>
        <span>&#128187;</span>
        <span>&#127911;</span>
        <span>&#128421;</span>
      </div>
      <router-link class="empty-link" to="/">
        <button-full>{{ $t('find product') }}</button-full>
      </router-link>
    </div>
  </div>
</template>

<script>
import RecentlyViewed from '@vue-storefront/core/modules/recently-viewed/components/RecentlyViewed';
import ProductListing from 'theme/components/core/ProductListing.vue';
import ButtonText from 'theme/components/theme/ButtonText';
import ButtonFull from 'theme/components/theme/ButtonFull';

export default {
  mixins: [RecentlyViewed],
  components: {
    ProductListing,
    ButtonText,
    ButtonFull
  },
  methods: {
    removeItems() {
      this.$store.dispatch('notification/spawnNotification', {
      type: 'warning',
      message: this.$t('Do you really want to delete recently viewed products?'),
      action1: { label: this.$t('OK'),
        action: () => this.$store.dispatch('recently-viewed/removeItems')
      },
      action2: { label: this.$t('Cancel'), action: 'close' },
      hasNoTimeout: true
    })
    }
  }
}
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-title {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 16px;
  line-height: 24px;
  color: #1A1919;
}

.empty-description {
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 24px;
  margin-bottom: 16px;
  color: #5F5E5E;
}

.emojis {
  margin-bottom: 32px;

  span {
    font-size: 20px;
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.recently-viewed-header {
  display: flex;
  align-items: baseline;
  margin-bottom: 22px;
}

.account-page-title {
  margin: 0 12px 0 0;
}

.recently-viewed-count {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
}

.remove-products {
  margin-left: auto;
}

.empty-link {
  display: block;
  width: 100%;
  max-width: 131px;
}

.button-full {
  margin: auto
}
</style>