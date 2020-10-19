<template>
  <div
    class="tag"
    :class="{ 'danger': colorType === 'danger', 'warning': colorType === 'warning' }"
  >
    <span class="product-chip">

      <slot/>

      {{ text }}

    </span>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        test: true
      }
    },
    props: {
      text: {
        type: [String, Number],
        required: true
      },
      colorType: {
        type: String,
        required: false,
        default: 'danger'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tag {
    background: #FFF9E8;
    border-radius: 4px;
    padding: 3px 8px;
    /*position: absolute;*/
    z-index: 3;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    color: #1A1919;
    margin-right: 4px;

    &.danger {
      background-color: #FDE6E7;
    }

    &.warning {
      background-color: #FFF9E8;
    }

    span.product-chip {
      text-align: center;
      display: flex;
      align-items: center;
      svg {
        position: relative;
        top: -1px;
        margin-right: 8px;
      }
    }

  }
</style>
