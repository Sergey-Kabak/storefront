<template>
  <div
    class="product-image"
    :class="{'product-image--height': basic, 'product-image--width': !basic}"
    :style="style"
    v-on="$listeners"
  >
    <img
      v-if="isOnline"
      v-lazy="image.loading"
      :alt="alt"
      ref="lQ"
      class="product-image__thumb"
    >
    <img
      v-if="isOnline"
      v-lazy="image.src"
      :alt="alt"
      class="product-image__thumb"
    >
  </div>
</template>

<script>
import { onlineHelper } from '@vue-storefront/core/helpers'
import config from 'config'

export default {
  props: {
    image: {
      type: Object,
      default: () => ({
        src: '',
        loading: ''
      })
    },
    alt: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      basic: true
    }
  },
  computed: {
    imageRatio () {
      return `${270 / (314 / 100)}%`
    },
    style () {
      return { paddingBottom: this.imageRatio }
    },
    isOnline (value) {
      return onlineHelper.isOnline
    }
  }
}
</script>

<style lang="scss" scoped>
.product-image{
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 0;
  mix-blend-mode: multiply;
  &__placeholder,
  &__thumb {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__placeholder {
    max-width: 50%;
  }
  &--height {
    .product-image__thumb {
      height: 100%;
    }
  }
  &--width {
    .product-image__thumb {
      width: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
