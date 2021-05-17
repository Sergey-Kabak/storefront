<template>
  <button
    @click="$emit('onRemove')"
    class="remove-icon"
    type="button"
    aria-label="remove"
    data-testid="remove"
  >
    <div class="item">
      <slot>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z"/>
        </svg>
        <span v-if="description">{{ description }}</span>
      </slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.remove-icon {
  font-family: DIN Pro;
  font-size: 12px;
  line-height: 13px;
  display: flex;
  align-items: center;
  color: #595858;
  border: none;
  background: none;
  padding: 0;
}

svg {
  box-sizing: content-box;
  border-radius: 4px;
  padding: 4px;

  &:hover {
    background-color: #F9F9F9;
  }

  &:active {
    background-color: #efefef;
  }
}

.item {
  background: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  border-radius: 4px;

  span {
    margin-left: 20px;
    font-family: DIN Pro;
    font-size: 14px;
    line-height: 24px;
    color: #595858;
    align-items: center;
    border-style: none;
    background: none;
    padding: 0;
  }
}
</style>