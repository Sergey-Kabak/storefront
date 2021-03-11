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
  display: flex;

  span {
    display: block;
    user-select: none;
    border-bottom: 1px dashed #1a1919;
    transition: 0.1s ease-in-out;
    font-family: DIN Pro;
    font-style: normal;
    font-size: 13px;
    line-height: 16px;
    color: #1a1919;
    padding-bottom: 4px;
    cursor: pointer;

    &:hover {
      border-color: transparent;
    }
  }
}
</style>
