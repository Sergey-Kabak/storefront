<template>
  <label class="checkbox-selector">
    <input type="checkbox" @change="onChange()">
    <span class="checkbox" :class="{ 'active': isActive }" />
    <span class="checkbox-title"> {{ variant.label }} </span>
    <span class="checkbox-amount" v-if="variant.count"> ({{ variant.count }})</span>
  </label>
</template>

<script>
import filterMixin from 'theme/mixins/filterMixin.ts'

export default {
  mixins: [filterMixin],
  methods: {
    onChange () {
      this.$emit('change', this.variant)
    }
  }
}
</script>

<style lang="scss" scoped>
  .checkbox-selector {
    &:hover{
      .checkbox-amount{
        opacity: 1;
      }
      span.checkbox{
        border-color : #5F5E5E;
      }
    }
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  input[type="checkbox"] {
    display: none;
  }

  .checkbox-title,
  .checkbox-amount {
    font-family: DIN Pro;
    font-style: normal;
    font-size: 15px;
    line-height: 24px;
    transition: color ease-in 0.1s;
  }

  .checkbox-title {
    color: #5F5E5E;
    margin-right: 5px;
  }

  .checkbox-amount {
    color: #5F5E5E;;
    opacity: 0.6;
  }

  .checkbox {
    transition: ease-in 0.1s;
    display: flex;
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    border: 2px solid #E0E0E0;
    box-sizing: border-box;
    margin-right: 12px;
    border-radius: 3px;

    &.active {
      background: #23BE20;
      border: none;

      &:after {
        content: url('/assets/custom/Correct.svg');
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 15px;
      }
    }
  }
</style>
