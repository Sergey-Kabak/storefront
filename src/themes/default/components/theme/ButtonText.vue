<template>
  <div class="button-text">
    <span>
      <slot>Button</slot>
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.button-text {
  span {
    cursor: pointer;
    user-select: none;
    font-family: DIN Pro;
    font-style: normal;
    font-size: 13px;
    line-height: 16px;
    color: #1a1919;
    border-bottom: 1px dashed #1a1919;
    padding-bottom: 4px;
    transition: 0.1s ease-in-out;

    &:hover {
      border-bottom: transparent;
    }
  }
}
</style>
