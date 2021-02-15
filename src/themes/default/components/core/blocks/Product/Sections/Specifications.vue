<template>
  <div class="content">
    <h3 class="tab-title">{{ $t('SpecificationsTab') }}</h3>
    <table class="attributes-table">
      <tbody>
        <product-attribute
          v-for="attr in splicedList"
          :key="attr.attribute_code"
          :product="getCurrentProduct"
          :attribute="attr"
          empty-placeholder="N/A"
        />
      </tbody>
    </table>
    <div v-if="!!count" @click="changeTab" class="tab-link">
      {{ $t('All Specifications') }}
    </div>
  </div>
</template>

<script>
import ProductAttribute from 'theme/components/core/ProductAttribute.vue';
import { mapGetters } from 'vuex'
export default {
  components: {
    ProductAttribute
  },
  props: {
    count: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct',
      attributesByCode: 'attribute/attributeListByCode'
    }),
    list () {
      return Object.values(this.attributesByCode).filter(a => {
        return a.is_visible && a.is_user_defined && (parseInt(a.is_visible_on_front) || a.is_visible_on_front === true) && this.getCurrentProduct[a.attribute_code]
      }).sort((a, b) => { return a.attribute_id > b.attribute_id })
    },
    splicedList () {
      return !!this.count ? this.list.splice(0, this.count) : this.list
    }
  },
  methods: {
    changeTab () {
      this.$bus.$emit('change-tab', 'specifications-tab')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/pages/Product/Tabs";
.attributes-table {
  width: 100%;
  border-collapse: collapse;
  @media (max-width : 575px){
    width: calc(100% + 32px);
    margin-left: -16px;
    border-top: none;
    display: block;
  }
  tr{
    @media (max-width : 575px){
      display: block;
    }
    ::v-deep td:first-child{
      @media (max-width : 575px){
        padding: 16px 16px 8px 16px;
      }
    }
    ::v-deep td:last-child{
      @media (max-width : 575px){
        padding: 8px 16px 16px 16px;
      }
    }
  }
  ::v-deep td{
    @media (max-width : 575px){
      display: block;
      width: 100%;
      line-height: 1;
    }
  }
  ::v-deep tr:nth-child(even){
    td{
      background: #F9F9F9;
    }
  }
  ::v-deep tr:nth-child(odd){
    td{
      background: white;
    }
  }
}
.tab-link{
  display: inline-block;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 12px;
  line-height: 13px;
  text-transform: uppercase;
  color: #23BE20;
  padding-bottom: 3px;
  border-bottom: 1px dashed #23BE20;
  margin-top: 24px;
  cursor: pointer;
}
</style>
