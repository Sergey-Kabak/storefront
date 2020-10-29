<template>
  <div class="more" @click="toggleContent()" v-click-outside="closeContent">
    <div class="more-point"></div>
    <div class="more-point"></div>
    <div class="more-point"></div>
    <transition name="slide">
      <div class="content" v-if="isActive">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    isActive: false
  }),
  methods: {
    toggleContent () {
      this.isActive = !this.isActive
    },
    closeContent() {
      this.isActive = false
    }
  }
};
</script>

<style lang="scss" scoped>
.more {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  display: flex;
  position: relative;
  padding: 4px;
  flex-direction: column;

  &-point {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #dadada;
    margin-bottom: 2px;
  }
}

.content {
  box-sizing: border-box;
  min-width: 242px;
  white-space: nowrap;
  z-index: 4;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3);
  top: 100%;
  right: 0;
  position: absolute;
  font-family: DIN Pro;
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
  color: #595858;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.1s ease-in;
  transform: translateY(0);
}

.slide-enter {
  transform: translateY(-15px);
}
.slide-leave-to {
  opacity: 0;
}
</style>
