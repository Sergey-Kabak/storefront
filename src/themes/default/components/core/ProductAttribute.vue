<template>
  <tr>
    <td>{{ label| htmlDecode }}</td>
    <td>{{ value| htmlDecode }}</td>
  </tr>
</template>

<script>
import { ProductAttribute } from '@vue-storefront/core/modules/catalog/components/ProductAttribute.ts'

export default {
  mixins: [ProductAttribute]
}
</script>

<style lang="scss" scoped>
tr{
  td{
    width : 50%;
    font-family: 'DIN Pro';
    font-style: normal;
    padding: 8px 0;
    font-size: 15px;
    line-height: 24px;
    vertical-align: baseline;
  }
  td:first-child{
    color: #5F5E5E;
  }
  td:last-child{
    color: #1A1919;
    font-weight: 600;
  }
}
</style>
