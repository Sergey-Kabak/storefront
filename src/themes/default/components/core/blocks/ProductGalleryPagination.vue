<template>
  <div>
    <template v-for="(dot, index) in dots">
      <button :key="index" :class="{'active': dot === page}"></button>
    </template>
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
      default: () => 5
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
        // this.moveRight(this.page - lastRangeVal)
        this.list.map(it => it + (this.page - lastRangeVal))
      }
      return this.list
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
      console.log(this.list, index);
      this.list.map(it => it + index)
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
button{
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
</style>
