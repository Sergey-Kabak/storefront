<template>
  <div>
    <div class="group-name">{{name}}</div>
    <div class="grid">
      <div v-for="(attrs, key) in group" :key="key" class="flex attr-row">
        <div class="cell first">
          <span>{{key}}</span>
        </div>
        <div class="flex flex-auto">
          <div v-for="(attr, index) in attrs" :key="index" class="cell">
            <compare-attribute
              v-if="attr && products[index]"
              :product="products[index]"
              :attribute="attr"
              empty-placeholder="N/A"
            />
            <div v-else>
              N/A
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompareAttribute from './CompareAttribute';

export default {
  components: {
    CompareAttribute
  },
  props: {
    group: {
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      required: true
    },
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-auto{
  flex: 1 1 auto;
}
.grid{
  border-top: 1px solid #E0E0E0;
}
.cell{
  &.first{
    min-width: 336px;
    width: 336px;
  }
  &:not(.first){
    @media (max-width: 768px) {
      width: calc(50vw - 22px);
      min-width: calc(50vw - 22px);
    }
    min-width: 330px;
    width: 330px;
  }
  padding: 8px 16px;
  border-right: 1px solid #E0E0E0;
}
.group-name{
  padding: 8px 16px;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  color: #1A1919;
  background: #F9F9F9;
}
.attr-row{
  display: flex;
  border-bottom: 1px solid #E0E0E0;
  @media (max-width: 768px) {
    flex-direction: column;
    .cell.first {
      border-right: none;
      border-bottom: 1px solid #E0E0E0;
      width: 100%;
      position: relative;
      span{
        position: sticky;
        left: 0;
      }
    }
  }
}
</style>
