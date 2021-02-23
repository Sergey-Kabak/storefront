<template>
  <div>
    <button>Добавить в комплект</button>
    <button>Удалить из комплекта</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    isInKit () {
      console.log(this.getCurrentProduct);
      return this.getCurrentProduct
    }
  }
}
</script>
