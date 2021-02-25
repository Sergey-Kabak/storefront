<template>
  <div>
    <button class="action-button add" v-if="!isInKit" @click="addToKit">{{ $t('Add to kit') }}</button>
    <button class="action-button remove" v-else @click="removeFromKit">{{ $t('Remove from kit') }}</button>
  </div>
</template>

<script>
import KitMixin from './KitMixin';

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

<style scoped lang="scss">
.action-button{
  outline: none;
  background: transparent;
  border: none;
  padding: 0 0 3px 0;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 14px;
  line-height: 16px;
  &.add{
    font-weight: 700;
    color: #23BE20;
    border-bottom: 1px dashed #23BE20;
  }
  &.remove{
    color: #1A1919;
    border-bottom: 1px dashed #1A1919;
  }
}
</style>
