<template>
  <div class="compare-sidebar">
    <div @click="toggleSidebar(false)" class="sidebar-header flex">
      <svg data-v-f0900dd2="" width="24" height="24" viewBox="-6 -6 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="back-icon"><path data-v-f0900dd2="" d="M6.29303 11.707L0.586032 6L6.29303 0.292999L7.70703 1.707L3.41403 6L7.70703 10.293L6.29303 11.707Z" fill="#23BE20"></path></svg>
      <span>{{ $t('Back') }}</span>
    </div>
    <div class="sidebar-body">
      <h2 class="body-header">{{ $t('Products to comapre') }}</h2>
      <div class="body-container">
        <div v-for="(category , index) in categories" :key="index"
             class="item"
             :class="{'active' : currentCategory === index}"
             @click="changeCategoryIndex(index)">
            <base-radiobutton class="radio-item" name="category" :id="category + index" @change="setSelectedBank(index)" :checked="currentCategory === index">
              <div class="label-text">{{index}} <small>({{addedProducts[index]}})</small></div>
            </base-radiobutton>
        </div>
      </div>
      <div class="sidebar-footer">
        <div class="compare-nav__text">{{  $tc(`added {count} items` , addedProducts[currentCategory]) }}</div>
        <button @click="toggleSidebar(false)" class="btn-show weight-700">{{ $t('show')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRadiobutton from '../Form/BaseRadiobutton';
import Compare from '@vue-storefront/core/pages/Compare';
import mixin from './mixin'
export default {
  mixins: [Compare, mixin],
  components: {
    BaseRadiobutton
  },
}
</script>

<style lang="scss" scoped>
.compare-sidebar{
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.radio-item{
  margin-bottom: 10px;
  /deep/ label{
    display: flex;
    &>div{
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 0;
      font-size: 15px;
      line-height: 24px;
      color: #5F5E5E;
      small{
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 0;
        font-size: 15px;
        line-height: 24px;
        color: #a3a3a3;
      }
    }
  }
}
.sidebar-header{
  min-height: 56px;
  border-bottom: 1px solid #E0E0E0;
  align-items: center;
  padding: 16px 16px 15px 11px;
  box-sizing: border-box;
  cursor: pointer;
  span{
    font-family: DIN Pro;
    font-size: 13px;
    line-height: 16px;
    color: #23BE20;
  }
}
.sidebar-body{
  display: flex;
  flex-direction: column;
  flex: 1;
}
.body-header{
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
  margin: 0 0 16px;
  padding: 9px 16px;
}
.body-container{
  padding: 0 16px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.sidebar-footer{
  margin-top: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25);
  &>div{
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 13px;
    line-height: 16px;
    color: #1A1919;
  }
}
.btn-show{
  background: #23BE20;
  border-radius: 4px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 15px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #FFFFFF;
  border: none;
  margin-top: 16px;
  width: 100%;
}
</style>
