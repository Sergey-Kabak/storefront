<template>
  <div class="active-filter" @click="$emit('remove', filter)">
    <span class="active-filter__title">
      {{ $t(filter.label) }}
    </span>
    <img src="/assets/custom/Cancel.svg" alt="cancel">
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
