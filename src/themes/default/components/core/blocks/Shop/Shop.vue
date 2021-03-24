<template>
  <div class="shop-items" v-if="shop.street">
    <div class="shop-info">
      <slot name="title">
        <shop-title @click.native="activateShopOnMap()" :street="shop.street" class="shop-item title"/>
        {{shop.source_code}}
      </slot>
      <slot name="phone">
        <shop-phone :phone="shop.phone" class="shop-item phone"/>
      </slot>
      <slot name="schedule">
        <shop-schedule :schedule="shop.opening_hours" class="shop-item reset-offset"/>
      </slot>
    </div>
    <slot name="shop-actions" />
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
  },
  methods: {
    activateShopOnMap() {
      this.$store.commit('shop/SET_SELECTED_SHOP', this.shop)
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-items {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 12px 16px 16px;
}

.title {
  display: flex;
  align-items: flex-start;
}

.shop-item {
  margin-bottom: 16px;

  &.title,
  &.phone {
    cursor: pointer;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.reset-offset {
    margin-bottom: 0;
  }
}
</style>
