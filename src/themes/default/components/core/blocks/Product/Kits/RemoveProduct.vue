<template>
  <button type="button" @click="removeFromKit" class="remove-kit">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z" fill="#BDBDBD"></path>
    </svg>
  </button>
</template>

<script>
import KitMixin from '../Kits/KitMixin';
export default {
  mixins: [KitMixin],
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.remove-kit{
  padding: 4px;
  margin: 0;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  &:hover{
    background: #F9F9F9;
  }
}
</style>
