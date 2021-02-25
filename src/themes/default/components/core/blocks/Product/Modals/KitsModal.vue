<template>
  <modal name="modal-kits" class="modal-kits" :width="900">
    <h3 slot="header" class="modal-kits_header align-center">
      {{ $t('Assemble your kit') }}
    </h3>
    <div slot="content" class="modal-kits_content">
      <div class="kits-wrapper">
        <kit-selected-products />
        <div class="kits-price-info">
          <kit-totals>
            <template v-slot:count>
              <div class="added-products mb-auto">{{ $tc('{count} products in kit',count) }}</div>
            </template>
          </kit-totals>
        </div>
      </div>
      <div class="kits-container flex">
        <div class="kit-categories">
          <ul v-if="Categories">
            <li v-for="(category, index) in Object.keys(Categories)" :key="index"
                :class="{'active': currentCategory === category}"
                @click="changeCategory(category)">
              <span>{{category}}</span>
              <small>({{Categories[category].length}})</small>
            </li>
          </ul>
          <kits-select
            :selected-index="0"
            :options="Object.keys(Categories)"
            @selectedCategory="selectedCategory"/>
        </div>
        <div class="kit-products">
          <ul v-if="currentCategory">
            <li v-for="(product, index) in Categories[currentCategory]" :key="index">
              <kit-product v-if="product" :product="product">
                <template v-slot:kit-product-action>
                  <div class="kit-product-action">
                    <kit-action v-if="product.stock.is_in_stock" :product="product"/>
                    <span class="not-available" v-else>{{ $t('NotAvailable') }}</span>
                  </div>
                </template>
              </kit-product>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '../../../Modal';
import KitProduct from '../Kits/KitProduct';
import KitAction from '../Kits/KitAction';
import KitMixin from '../Kits/KitMixin';
import KitTotals from '../Kits/KitTotals';
import KitSelectedProducts from '../Kits/KitSelectedProducts';
import KitsSelect from '../Kits/KitsSelect';

export default {
  mixins: [KitMixin],
  components: {
    KitSelectedProducts,
    Modal,
    KitProduct,
    KitAction,
    KitTotals,
    KitsSelect
  },
  data () {
    return {
      currentCategory: null
    }
  },
  computed: {
    Categories () {
      const kitsCategories = [...this.getCurrentProduct.product_kits[0].categories].map(c => c.name)
      const Categories = {}
      kitsCategories.forEach(c => {
        Categories[c] = this.kitProducts.filter(it => it.category.find(k => k.name === c))
      })
      this.currentCategory = Object.keys(Categories)[0]
      return Categories
    },
    count () {
      return this.getSelectedProducts.length + 1
    }
  },
  methods: {
    selectedCategory (data) {
      this.currentCategory = data
    },
    changeCategory (category) {
      this.currentCategory = category
    }
  }
}
</script>

<style lang="scss" scoped>
$table: 767px;
@media (max-width: $table) {
  ::v-deep .modal-content{
    padding: 16px !important;
  }
}
.kits-price-info{
  @media (max-width: $table) {
    width: 100% !important;
  }
  ::v-deep .added-products{
    margin-bottom: 32px;
  }
}
::v-deep .kits-selected-block{
  @media (max-width: $table) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #23BE20;
    max-height: 327px;
  }
}
.kits{
  &-wrapper{
    @media (min-width: 768px) {
      height: 268px;
    }
    @media (max-width: $table) {
      flex-direction: column;
    }
    display: flex;
    border: 1px solid #23BE20;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 24px;
  }
  &-price-info{
    width: 39.1%;
    display: flex;
    flex: 1;
  }
}
.modal-kits_content{
  @media (max-width: $table) {
    padding: 0;
  }
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.kits-container{
  @media (max-width: $table) {
    flex-direction: column;
  }
  flex: 1;
  display: flex;
  grid-gap: 16px;
}
.kit-products{
  flex: 1;
  ul{
    margin: 0;
    padding: 0;
    list-style-type: none;
    overflow: auto;
    max-height: 493px;
    &::-webkit-scrollbar {
      width: 4px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #E0E0E0;
      border-radius: 4px;
    }
    li{
      border: 1px solid #E0E0E0;
      &:first-child{
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      &:last-child{
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      &:not(:first-child){
        border-top: none;
      }
    }
  }
}
.kit-categories{
  ::v-deep .custom-select {
    @media (min-width: 768px) {
      display: none;
    }
    @media (max-width: $table){
      display: block;
    }
  }
  ul{
    @media (min-width: 768px) {
      display: block;
    }
    @media (max-width: $table){
      display: none;
    }
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
.not-available{
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 14px;
  line-height: 16px;
  color: #ee2c39;;
  padding-bottom: 3px;
  border-bottom: 1px dashed #ee2c39;;
}
</style>
