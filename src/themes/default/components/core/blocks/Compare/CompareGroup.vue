<template>
  <div>
    <div class="group-name">{{name}}</div>
    <div class="grid">
      <div v-for="(attrs, key) in group" :key="key" class="flex attr-row">
        <div class="cell">{{key}}</div>
        <div v-for="(attr, index) in attrs" :key="index" class="cell">
          <compare-attribute
            v-if="attr"
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
.grid{
  border-top: 1px solid #E0E0E0;
}
.attr-row{
  border-bottom: 1px solid #E0E0E0;
}
.cell{
  padding: 8px 16px;
  width: 336px;
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
}
</style>
