<template>
  <div class="input-wrap">
    <input
      v-model.trim="innerValue"
      ref="input"
      v-bind="$attrs"
      v-on="$listeners"
    >
    <div class="placeholder" v-if="!innerValue">
      {{ label }}
      <span v-if="amount" class="placeholder-price" @click="focusInput()">
        {{ amount }}
      </span>
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
    amount: {
      type: [String, Number],
      default: () => []
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
  },
  methods: {
    focusInput () {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.input-wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 148px;
  margin-right: 20px;
  &:last-child {
    margin-right: 0px;
  }
}
input {
  border: 1px solid #e0e0e0;
  margin-right: 20px;
  width: 100%;
  padding-left: 15px;
  box-sizing: border-box;
  border-radius: 4px;

  &:last-child {
    margin-right: 0;
  }

  &:focus {
    outline: none;
    border-color: #23be20;
  }
}

.placeholder {
  font-family: DIN Pro;
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
  font-style: normal;
  color: rgba(95, 94, 94, 0.6);
  font-size: 13px;
  line-height: 16px;
}

.placeholder-price {
  color: #5f5e5e;
  cursor: text;
}
</style>
