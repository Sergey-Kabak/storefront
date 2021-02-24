<template>
  <div>
    <button @click="addToKit">Добавить в комплект</button>
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
      return this.getCurrentProduct
    }
  },
  methods: {
    addToKit () {
      console.log(this.isInKit);
    }
  }
}
</script>
