<template>
  <div class="input-wrap">
    <input
      v-model.trim="innerValue"
      ref="input"
      v-bind="$attrs"
      v-on="$listeners"
      :placeholder="placeholder"
    >
    <div v-if="label" class="label">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    innerValue: null
  }),
  props: {
    value: {
      type: null,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder : {
      type: String,
      default: ''
    }
  },
  watch: {
    innerValue (newVal) {
      this.$emit('input', newVal);
    },
    value (newVal) {
      this.innerValue = newVal;
    }
  },
  created: function () {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>

<style lang="scss" scoped>
.input-wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-right: 20px;

  &:last-child {
    margin-right: 0px;
  }
}
input {
  font-family: DIN Pro;
  font-style: normal;
  font-size: 13px;
  line-height: 16px;
  border: 1px solid #e0e0e0;
  margin-right: 20px;
  width: 100%;
  padding-left: 15px;
  padding-left: 20px;
  box-sizing: border-box;
  padding-left: 34px;
  border-radius: 4px;

  &:last-child {
    margin-right: 0;
  }

  &:focus {
    outline: none;
    border-color: #23be20;
  }
}

.label {
  font-family: DIN Pro;
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
  font-style: normal;
  color: rgba(95, 94, 94, 0.6);
  font-size: 13px;
  line-height: 16px;
}
</style>
