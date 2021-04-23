<template>
  <div class="source-status" :class="status">
    {{ $t(status) }}
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.source-status{
  white-space: nowrap;
  position: absolute;
  right: 16px;
  top: 16px;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 13px;
  line-height: 16px;
  max-width: 118px;
  width: 100%;
  &:before{
    content: '\25CF';
    position: absolute;
    top: 0;
    left: -14px;
    width: 6px;
    height: 6px;
    color: inherit;
  }
}
.productsNotAvailable{
  color: #EE2C39;
}
.productsPartialAvailability{
  color: #F2994A;
}
.productsAvailable{
  color: #23BE20;
}
</style>
