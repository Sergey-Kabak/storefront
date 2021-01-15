<template>
  <div class="shops-actions">
    <div class="switch-visibility">
      <img src="/assets/shipping/list.svg" alt="list" class="switch-item" :class="{'active': activeTab === 'list'}" @click="changeActiveTab('list')">
      <img src="/assets/shipping/map.svg" alt="map" class="switch-item" :class="{'active': activeTab === 'map'}" @click="changeActiveTab('map')">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeTab: {
      type: String,
      required: true
    }
  },
  methods: {
    changeActiveTab(activeTab) {
      this.$emit('onActiveTabChange', activeTab)
    }
  }
}
</script>

<style lang="scss" scoped>
.shops-actions {
  display: flex;
  padding: 16px 32px 12px 32px;
  box-shadow: 0px 4px 5px #f7f7f7;
}

.switch-visibility {
  display: flex;
  align-items: center;
  margin-left: auto;
  background-color: #F2F2F2;
  border-radius: 4px;
}

.switch-item {
  cursor: pointer;
  padding: 4px;
  border: 1px solid transparent;

  &.active {
    background-color: #fff;
    border: 1px solid #23BE20;
    border-radius: 4px;
  }
}
</style>