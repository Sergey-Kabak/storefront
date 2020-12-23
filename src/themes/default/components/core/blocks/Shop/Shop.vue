<template>
  <div class="shop-items" v-if="shop.street">
    <shop-title :shop="shop" class="shop-item"/>
    <shop-phone :phone="shop.phone" class="shop-item"/>
    <shop-schedule :schedule="shop.opening_hours" class="shop-item reset-offset"/>
    <slot />
  </div>
</template>

<script>
import ShopTitle from 'theme/components/core/blocks/Shop/ShopTitle.vue'
import ShopPhone from 'theme/components/core/blocks/Shop/ShopPhone.vue'
import ShopSchedule from 'theme/components/core/blocks/Shop/ShopSchedule.vue'

export default {
  components: {
    ShopTitle,
    ShopPhone,
    ShopSchedule
  },
  props: {
    shop: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-items {
  padding: 16px;
}


.shop-item {
  cursor: pointer;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  &.reset-offset {
    margin-bottom: 0;
  }
}
</style>