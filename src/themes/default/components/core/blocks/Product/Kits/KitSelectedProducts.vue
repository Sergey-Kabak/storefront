<template>
  <div class="kits-selected-block">
    <div class="main-product flex">
      <div class="separator-column">
        <span>Ваш товар</span>
      </div>
      <kit-product :product="getCurrentProduct" :style="{'border-bottom' : (!label && !getSelectedProducts.length) ? 'none' : '1px solid #E0E0E0'}">
        <template v-slot:kit-product-reaction>
          <div></div>
        </template>
      </kit-product>
    </div>
    <ul class="selected-products">
      <li v-for="(product, index) in getSelectedProducts" :key="index" class="flex">
        <div class="separator-column">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15.5" fill="white" stroke="#23BE20"/>
            <path d="M23 17H17V23H15V17H9V15H15V9H17V15H23V17Z" fill="#23BE20"/>
          </svg>
        </div>
        <kit-product :product="product" class="selected-product">
          <template v-slot:kit-product-action>
            <remove-product :product="product" />
          </template>
          <template v-slot:kit-product-reaction>
            <div></div>
          </template>
        </kit-product>
      </li>
      <li v-if="label" class="flex">
        <div class="separator-column">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15.5" fill="white" stroke="#23BE20"/>
            <path d="M23 17H17V23H15V17H9V15H15V9H17V15H23V17Z" fill="#23BE20"/>
          </svg>
        </div>
        <div class="empty-product">
          <div class="rect">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M3 10H5V12H3V10ZM4 2C5.1 2 6 2.9 6 4C6 6 3 5.75 3 9H5C5 6.75 8 6.5 8 4C8 1.79 6.21 0 4 0C1.79 0 0 1.79 0 4H2C2 2.9 2.9 2 4 2Z" fill="#BDBDBD"/>
            </svg>
          </div>
          <span>{{ $t('Another item') }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import KitMixin from './KitMixin';
import KitProduct from './KitProduct';
import RemoveProduct from '../Kits/RemoveProduct';
export default {
  mixins: [KitMixin],
  props: {
    label: {
      type: Boolean,
      default: () => true
    }
  },
  components: {
    KitProduct,
    RemoveProduct
  }
}
</script>

<style lang="scss" scoped>
.kits{
  &-selected-block{
    overflow: auto;
    &::-webkit-scrollbar {
      width: 4px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #E0E0E0;
      border-radius: 4px;
    }
    width: 60.9%;
    padding-left: 16px;
    border-right: 1px solid #23BE20;
    .selected-product{
      padding-right: 11px !important;
      ::v-deep .kit-product-block{
        flex: 1;
        display: flex;
        flex-direction: row;
      }
      ::v-deep .remove-kit{
        margin-top: -6px;
        margin-left: auto;
      }
    }
    .main-product{
      ::v-deep .kit-product-wrapper{
        border-bottom: 1px solid #E0E0E0;
        padding-left: 0;
        flex: 1;
      }
      ::v-deep .kit-product-link {
        margin-bottom: 0;
      }
    }
    .separator-column{
      width: 69px;
      span{
        display: block;
        margin-top: 28px;
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #23BE20;
      }
      svg{
        margin-top: 28px;
      }
    }
    .selected-products{
      margin: 0;
      padding: 0;
      list-style-type: none;
      li{
        position: relative;
        &:not(:last-child){
          &:before{
            position: absolute;
            content: '';
            left: 16px;
            top: 64px;
            height: calc(100% - 40px);
            width: 1px;
            background-color: #23BE20;
          }
        }
        .empty-product{
          display: flex;
          align-items: center;
          padding: 16px 16px 16px 0;
          .rect{
            width: 56px;
            height: 56px;
            background: #F9F9F9;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
          }
          span{
            font-family: DIN Pro;
            font-style: normal;
            font-weight: 0;
            font-size: 13px;
            line-height: 16px;
            color: #5F5E5E;
          }
        }
        ::v-deep .kit-product-wrapper{
          padding-left: 0;
          flex: 1;
        }
        ::v-deep .kit-product-link{
          margin-bottom: 0;
        }
        &:not(:last-child){
          ::v-deep .kit-product-wrapper{
            border-bottom: 1px solid #E0E0E0;
          }
        }
      }
    }
  }
}
</style>
