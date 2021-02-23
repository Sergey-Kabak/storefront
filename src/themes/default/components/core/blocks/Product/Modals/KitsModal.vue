<template>
  <modal name="modal-kits" class="modal-kits" :width="900">
    <h3 slot="header" class="modal-kits_header align-center">
      Собрать свой комплект
    </h3>
    <div slot="content" class="modal-kits_content">
      <div class="kits-container flex">
        <div class="kit-categories">
          <ul v-if="Categories">
            <li v-for="(category, index) in Categories" :key="index"
                :class="{'active': currentCategory === Object.keys(category)[0]}"
                @click="changeCategory(category)">
              <span>{{Object.keys(category)[0]}}</span>
              <small>({{Object.values(category)[0].length}})</small>
            </li>
          </ul>
        </div>
        <div class="kit-products">
          <ul v-if="currentCategory">
            <li v-for="(product, index) in Categories.find(el => Object.keys(el)[0] === currentCategory)[currentCategory]" :key="index">
              <kit-product v-if="product" :product="product"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '../../../Modal';
import KitProduct from './KitProduct';
import { mapGetters, mapState } from 'vuex';
export default {
  components: {
    Modal,
    KitProduct
  },
  data () {
    return {
      currentCategory: null
    }
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    ...mapState({
      kitProducts: (state) => state.kits.products
    }),
    selectedKitProducts () {
      return this.selectedProducts
    },
    Categories () {
      const kitsCategories = [...this.getCurrentProduct.product_kits[0].categories].map(c => c.name)
      const Categories = kitsCategories.map(c => {
        return {
          [c]: this.kitProducts.filter(it => it.category.find(k => k.name === c))
        }
      })
      this.currentCategory = Object.keys(Categories[0])[0]
      return Categories
    }
  },
  methods: {
    changeCategory (category) {
      this.currentCategory = Object.keys(category)[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-kits_content{
  padding: 24px;
}
.kits-container{
  display: flex;
  grid-gap: 16px;
}
.kit-products{
  flex: 1;
  ul{
    margin: 0;
    padding: 0;
    list-style-type: none;
    li{
      border: 1px solid #E0E0E0;
      &:first-child{
        border-radius: 4px 4px 0 0;
      }
      &:last-child{
        border-radius: 0 0 4px 4px;
      }
      &:not(:first-child){
        border-top: none;
      }
    }
  }
}
.kit-categories{
  ul{
    margin: 0;
    padding: 0;
    list-style-type: none;
    min-width: 316px;
    li{
      padding: 8px 16px;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 0;
      font-size: 14px;
      line-height: 24px;
      cursor: pointer;
      border-radius: 4px;
      &.active{
        background: #E5F7E4;
        font-weight: 700;
        span{
          color: #23BE20;
        }
        small{
          color: #5f5e5e;
          font-size: 14px;
        }
      }
      span{
        color: #1A1919;
        margin-right: 3px;
      }
      small{
        color: #5F5E5E;
        opacity: 0.6;
      }
    }
  }
}
</style>
