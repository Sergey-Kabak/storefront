<template>
  <div class="shop-info-window">
    <shop :shop="marker" />
    <div class="close-icon" @click="closeInfoWindow()">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#BDBDBD">
        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
      </svg>
    </div>
    <div class="submit">
      <button-full @click.native="selectMarker()">{{ $t('Pick up here') }}</button-full>
    </div>
  </div>
</template>

<script>
import Shop from 'theme/components/core/blocks/Shop/Shop.vue'
import ButtonFull from 'theme/components/theme/ButtonFull'

export default {
  props: {
    marker: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  components: {
    Shop,
    ButtonFull
  },
  methods: {
    closeInfoWindow() {
      this.$emit('close-popup')
    },
    selectMarker() {
      this.$emit('select', this.marker)
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

    .shop-name {
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
      color: #5F5E5E;
    }

    .shop-icon {
      width: 16px;
      height: 16px;
      min-width: 16px;
    }

    .shop-schedule,
    .shop-phone {
      line-height: 16px;
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
      fill: #aeaeae;
    }

    &:active {
      fill: #9f9f9f;
    }
  }
}

.submit {
  margin: auto;
  width: 248px;
  margin: 0 16px 16px 16px;
}
</style>