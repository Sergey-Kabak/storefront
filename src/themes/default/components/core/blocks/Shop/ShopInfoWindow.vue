<template>
  <div class="shop-info-window">
    <shop :shop="marker" />
    <div class="close-icon" @click="closeInfoWindow()">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#BDBDBD">
        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
      </svg>
    </div>
  </div>
</template>

<script>
import Shop from 'theme/components/core/blocks/Shop/Shop.vue'
export default {
  props: {
    marker: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  components: {
    Shop
  },
  methods: {
    closeInfoWindow() {
      this.$store.commit('shop/SET_SELECTED_SHOP', null)
      this.$emit('close-popup')
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-info-window {
  max-width: 280px;

  ::v-deep {
    .shop-title {
      pointer-events: none;
    }
  }
}

.close-icon {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  svg {
    transition: .2s ease-in-out;

    &:hover {
      fill: #3d3d3d;
    }
  }
}
</style>