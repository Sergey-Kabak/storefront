<template>
  <div class="shop-listing">
    <shop v-for="(shop, index) in shops" :key="shop.id" :shop="shop" :index="index" :class="{'active' : selectedShop && selectedShop.source_code === shop.source_code}" class="shop"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Shop from 'theme/components/core/blocks/Shop/Shop.vue'

export default {
  components: {
    Shop
  },
  computed: {
    ...mapState({
      shops: (state) => state.shop.shops,
      selectedShop: (state) => state.shop.selectedShop
    })
  }
}
</script>

<style lang="scss" scoped>
.shop-listing {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  height: auto;
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #bfbfbf;
}

.shop.shop-items {
  display: grid;
  grid-template-columns: 1fr;
  border-bottom: 1px solid #E0E0E0;

  &:last-child {
    border-bottom: none;
  }

  &.active {
    background-color: #F9F9F9;
  }
}
</style>
