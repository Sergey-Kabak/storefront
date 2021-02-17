<template>
  <div class="control">
    <div class="arrow-left" @click="prev()">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.293 17.707L7.58603 12L13.293 6.293L14.707 7.707L10.414 12L14.707 16.293L13.293 17.707Z" />
      </svg>
    </div>
    <div class="control-info">
      <span class="current-index"> {{ index  + 1 }}&nbsp;</span>
      <span class="max-index">/ {{ maxLength + 1 }}</span>
    </div>
    <div class="arrow-right" @click="next()">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.707 17.707L16.414 12L10.707 6.293L9.29297 7.707L13.586 12L9.29297 16.293L10.707 17.707Z" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxLength: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    next() {
      if (this.index !== this.maxLength) {
        this.changeIndex(this.index + 1)
      } else {
        this.changeIndex(0)
      }
    },
    prev() {
      if (this.index !== 0 ) {
        this.changeIndex(this.index - 1)
      } else {
        this.changeIndex(this.maxLength)
      }
    },
    changeIndex(index) {
      this.$emit('onIndexChange', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.control {
  position: absolute;
  display: flex;
  align-items: center;
  padding: 4px;
  width: 89px;
  background: #F9F9F9;
  border-radius: 4px;
}

.control-info {
  display: flex;
  align-items: center;
}

.arrow-right,
.arrow-left {
  display: flex;
  cursor: pointer;

  svg {
    transition: .2s ease-in-out;
  }

  &:hover {
    svg {
      fill: #1A1919;
    }
  }
}

.arrow-left {
  margin-right: 4px;
}

.arrow-right {
  margin-left: 4px;
}

.current-index {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #000000;
}

.max-index {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #5F5E5E;
}
</style>
