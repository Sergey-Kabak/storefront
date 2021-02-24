<template>
  <div class="active-filter" @click="$emit('remove', filter)">
    <span class="active-filter__title">
      {{ $t(filter.label) }}
    </span>
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="#BDBDBD">
      <path d="M9.08366 1.73916L8.26116 0.916656L5.00033 4.17749L1.73949 0.916656L0.916992 1.73916L4.17783 4.99999L0.916992 8.26082L1.73949 9.08332L5.00033 5.82249L8.26116 9.08332L9.08366 8.26082L5.82283 4.99999L9.08366 1.73916Z"/>
    </svg>
  </div>
</template>

<script>

export default {
  props: {
    filter: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.active-filter {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  margin-right: 8px;
  margin-bottom: 8px;
  border: 1px solid #FFCA41;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  transition : ease-in 0.2s;
  &:hover{
    background: rgba(255, 202, 65, 0.08);
  }
  &:focus{
    background: rgba(255, 202, 65, 0.12);
  }
  &:active{
    background: rgba(255, 202, 65, 0.16);
  }

  &__title {
    display: block;
    margin-right: 9px;
    color: #1A1919;
    text-transform: uppercase;
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
  }
}
</style>
