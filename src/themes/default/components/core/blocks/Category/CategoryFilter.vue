<template>
  <div>
    <div class="filter-header" @click="toggleFitler()">
      <slot name="label" :isActive="isActive">
        <b class="filter-header__title">
          {{ $t(label) }}
        </b>
      </slot>
      <div class="filter-button" :class="{ active: !isActive }">
        <span class="line-horizontal line" :class="{ active: !isActive }" />
        <span class="line-vertical line" />
      </div>
    </div>
    <transition name="slide">
      <div class="filter-body" v-show="isActive" :style="noscroll && 'overflow : visible'">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: this.openByDefault
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    noscroll : {
      type: String,
      required: false
    },
    openByDefault: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggleFitler () {
      this.isActive = !this.isActive;
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px 16px 0;
  cursor: pointer;

  &__title {
    margin: 0;
    font-family: DIN Pro;
    font-style: normal;
    font-size: 14px;
    line-height: 16px;
    color: #1a1919;
  }
}

.filter-body {
  box-sizing: border-box;
  max-height: 300px;
  border-bottom: 23px solid transparent;
  overflow-y: auto;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s;
  max-height: auto;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  opacity: 0;
  max-height: 0px;
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #E0E0E0;;
}

.filter-button {
  position: relative;
  width: 14px;
  height: 14px;

  .line {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #e0e0e0;
  }

  .line-horizontal {
    width: 14px;
    height: 2px;
    top: 0;
    
    &.active {
      top: 50%;
    }
  }

  .line-vertical {
    width: 2px;
    height: 14px;
    top: 0;
    opacity: 0;
    transform: rotate(90deg);
    transition: .2s all ease-in;
  }

  &.active {
    .line-vertical {
      transform: translateX(-50%) rotate(0);
      opacity: 1;
    }
    .line-horizontal,
    .line-vertical{
      background: #23BE20;
    }
  }
}
</style>
