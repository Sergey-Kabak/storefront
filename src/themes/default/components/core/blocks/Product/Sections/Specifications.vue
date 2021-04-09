<template>
  <div class="content">
    <h3 class="tab-title">{{ $t('SpecificationsTab') }}</h3>
    <div class="group" v-for="group in splicedList" :key="group.attribute_group_id" v-if="group.attrs.length">
      <strong class="group-title">{{group.label}}</strong>
      <table class="attributes-table">
        <tbody>
        <product-attribute
          v-for="attr in group.attrs"
          :key="attr.attribute_code"
          :product="getCurrentProduct"
          :attribute="attr"
          empty-placeholder="N/A"
        />
        </tbody>
      </table>
    </div>
    <div v-if="!!count" @click="changeTab" class="tab-link">
      {{ $t('All Specifications') }}
    </div>
  </div>
</template>

<script>
import ProductAttribute from 'theme/components/core/ProductAttribute.vue';
import { mapGetters, mapState } from 'vuex'
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
    ...mapState({
      groups: state => state.attribute.groups
    }),
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct',
      attributesByCode: 'attribute/attributeListByCode'
    }),
    list () {
      const groups = []
      this.groups.forEach(group => {
        const attrs = []
        group.attributes.forEach(attr => {
          if (this.attributesByCode[attr]) {
            attrs.push(this.attributesByCode[attr])
          }
        })
        groups.push({ ...group, attrs: attrs })
      })
      console.log(groups);
      return groups.sort((a, b) => { return a.sort_order > b.sort_order });
      // return Object.values(this.attributesByCode).filter(a => {
      //   return a.is_visible && a.is_user_defined && (parseInt(a.is_visible_on_front) || a.is_visible_on_front === true) && this.getCurrentProduct[a.attribute_code]
      // }).sort((a, b) => { return a.attribute_id > b.attribute_id })
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
.group{
  &:not(:last-child){
    border-bottom: 1px solid #E0E0E0;
  }
  &-title{
    font-family: DIN Pro;
    font-weight: 700;
    font-size: 15px;
    line-height: 24px;
    color: #1A1919;
    display: block;
    padding: 16px 0 12px;
  }
}
tbody{
  @media (max-width: 575px) {
    display: block;
  }
}
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
  //::v-deep tr:nth-child(even){
  //  td{
  //    background: #F9F9F9;
  //  }
  //}
  //::v-deep tr:nth-child(odd){
  //  td{
  //    background: white;
  //  }
  //}
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
