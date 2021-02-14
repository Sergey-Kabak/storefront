<template>
  <div class="pagination-row">
    <button class="small-dot" v-if="subButtons.left" @click="selectSlide(list[0] - 1)"></button>
    <template v-for="(dot, index) in dots">
      <button :key="index" :class="{'active': dot === page}" @click="selectSlide(dot)"></button>
    </template>
    <button class="small-dot" v-if="subButtons.right" @click="selectSlide(list[list.length - 1] + 1)"></button>
  </div>
</template>

<script>
export default {
  props: {
    gallery: {
      type: Array,
      required: true
    },
    range: {
      type: Number,
      default: () => 9
    }
  },
  data () {
    return {
      page: 0,
      originalList: Array.from({ length: this.gallery.length }, (v, k) => k),
      list: []
    }
  },
  computed: {
    dots () {
      const lastRangeVal = this.list[this.list.length - 1]
      const firstRangeVal = this.list[0]
      if (lastRangeVal < this.page) {
        this.moveRight(this.page - lastRangeVal)
      }
      if (firstRangeVal > this.page) {
        this.moveLeft(firstRangeVal - this.page)
      }
      return this.list
    },
    subButtons () {
      return {
        left: this.list[0] > 0,
        right: this.list[this.list.length - 1] < this.originalList[this.originalList.length - 1]
      }
    }
  },
  methods: {
    initialRange () {
      if (this.page + this.range > this.originalList.length) {
        return this.originalList.slice(this.originalList.length - this.range)
      } else {
        return this.originalList.slice(this.page, this.page + this.range)
      }
    },
    moveRight (index) {
      this.list = this.list.map(it => it + index);
    },
    moveLeft (index) {
      this.list = this.list.map(it => it - index);
    },
    selectSlide (dot) {
      this.$bus.$emit('slide-index-from-vertical-bar', dot)
    }
  },
  created () {
    this.list = this.initialRange()
  },
  beforeMount () {
    this.$bus.$on('navigate-from-slider', index => this.page = index)
  }
}
</script>

<style scoped lang="scss">
.pagination-row{
  display: flex;
  justify-content: center;
  align-items: center;
}
button{
  @media (max-width: 575px) {
    width: 8px;
    height: 8px;
    padding: 4px;
  }
  width: 10px;
  height: 10px;
  box-sizing: content-box;
  border-radius: 50%;
  background-color: #E0E0E0;
  cursor: pointer;
  appearance: none;
  border: none;
  background-clip: content-box;
  outline: none;
  padding: 8px;
  &.active{
    background-color: #23BE20;
  }
}
.small-dot{
  @media (max-width: 575px) {
    width: 6px;
    height: 6px;
    padding: 2px;
  }
  background-color: #e6e6e6;
  width: 5px;
  height: 5px;
  padding: 10px 8px;
}
</style>
