<template>
  <div class="more" @click="toggleContent()" v-click-outside="closeContent">
    <div class="more-point"></div>
    <div class="more-point"></div>
    <div class="more-point"></div>
    <div class="content" v-if="isActive">
      <slot />
    </div>
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
  padding: 12px 16px;
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
  color: #5F5E5E;
}
</style>
