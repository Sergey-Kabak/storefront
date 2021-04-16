<template>
  <div class="city" @click="selectCity()" :class="{'active': selectedCity === city}">
    <span>{{ city }}</span>
  </div>
</template>

<script>
export default {
  props: {
    city: {
      type: String,
      required: true,
      default: null
    },
    selectedCity: {
      type: String,
      required: false,
      default: null
    }
  },
  methods: {
    selectCity() {
      this.$emit('onSelectCity', this.city)
    }
  }
}
</script>

<style lang="scss" scoped>
.city {
  margin: 0px 12px 12px 0px;
  cursor: pointer;
  padding: 8px 10px;
  background: #F2F2F2;
  border-radius: 4px;
  border: 1px solid transparent;

  &.active {
    background: #FFFFFF;
    border-color: #23BE20;
  }

  &:hover {
    border: 1px solid #BDBDBD;
  }

  &:active {
    border: 1px solid #ababab;
  }

  span {
    font-family: DIN Pro;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
  }
}
</style>