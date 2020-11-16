<template>
  <div class="product-list relative">
    <div ref="productList" class="products-row flex relative">
      <product v-for="product in productsInCart" :key="product.id" :product="product" />
    </div>
    <div v-if="leftarrow" class="keyboard_arrow left" ref="leftArrow" @click="scrollTo('left')">
      <span class="material-icons">keyboard_arrow_left</span>
    </div>
    <div v-if="rightarrow" class="keyboard_arrow right" ref="rightArrow" @click="scrollTo('right')">
      <span class="material-icons">keyboard_arrow_right</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Product from './Product'
export default {
  data () {
    return {
      leftarrow: false,
      rightarrow: false
    }
  },
  components: {
    Product
  },
  computed: {
    ...mapState({
      productsInCart: state => state.cart.cartItems
    })
  },
  methods: {
    scrollTo (side) {
      const step = 200;
      this.$refs.productList.scroll({
        top: 0,
        left: side === 'right' ? +this.$refs.productList.clientWidth : -this.$refs.productList.clientWidth,
        behavior: 'smooth'
      });
    },
    scrollHandler () {
      this.$refs.productList.scrollLeft > 0 ? this.leftarrow = true : this.leftarrow = false;
      this.$refs.productList.scrollLeft * 2 === this.$refs.productList.scrollWidth ? this.rightarrow = false : this.rightarrow = true
    }
  },
  mounted () {
    this.$refs.productList.scrollWidth > this.$refs.productList.clientWidth && (this.rightarrow = true)
    this.$refs.productList.addEventListener('scroll', this.scrollHandler)
  },
  beforeDestroy () {
    this.$refs.productList.removeEventListener('scroll', this.scrollHandler)
  }
}
</script>

<style lang="scss" scoped>
.keyboard_arrow{
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
  &.left{
    left: 0;
  }
  &.right{
    right: 0;
  }
}
.products-row{
  padding: 24px 0;
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
  margin-bottom: 32px;
  width: 100%;
  overflow: auto;
}
::-webkit-scrollbar {
  display: none;
}
::v-deep .product-wrapper{
  &:not(:last-child) {
    border-right: 1px solid #E0E0E0;
  }
}
</style>
