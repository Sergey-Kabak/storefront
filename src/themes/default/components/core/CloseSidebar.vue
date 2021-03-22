<template>
  <div class="close-sidebar">
    <div class="close-icon" @click="onClose()">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.close-sidebar {
  display: flex;
  justify-content: flex-end;
}

.close-icon {
  cursor: pointer;
  width: 50px;
  height: 50px;
  padding: 13px;
  background-color: #F9F9F9;

  &:hover {
    svg {
      fill: #aeaeae;
    }
  }

  &:active {
    svg: {
      fill: #9f9f9f;
    }
  }
}
</style>
