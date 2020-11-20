<template>
  <div class="category-content-wrapper" v-if="description || faq">
    <div v-if="description" v-html="description" />
    <div v-if="faq" v-html="faq" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getCurrentCategory: 'category-next/getCurrentCategory'
    }),
    description () {
      return this.getCurrentCategory.description_bottom || ''
    },
    faq () {
      return this.getCurrentCategory.faq || ''
    }
  },
  mounted () {
    document.querySelectorAll('.category-faq--item .subtitle').forEach(el => el.addEventListener('click', this.faqToggle))
  },
  beforeDestroy () {
    document.querySelectorAll('.category-faq--item .subtitle').forEach(el => el.addEventListener('click', this.faqToggle))
  },
  methods: {
    faqToggle () {
      let el = event.path.find(it => it.className.includes('category-faq--item'));
      if (el) {
        el.classList.toggle('open');
      }
    }
  }
}
</script>

<style lang="scss">
.category-content{
  &-wrapper{
    @media (max-width: 767px) {
      margin: 48px 0 0;
    }
    margin: 68px 0 0;
    font-family: "DIN Pro";
    *{
      font-family: "DIN Pro";
    }
    p{
      &.attention{
        @media (max-width: 767px){
          margin-top: 16px;
        }
        color: #EE2C39;
        text-transform: uppercase;
        margin-top: 24px;
      }
      color: #5F5E5E;
      font-size: 15px;
      line-height: 24px;
      margin: 0;
    }
    ul{
      padding-left: 17px;
      @media (max-width: 767px) {
        margin-bottom: 16px;
      }
      margin: 0 0 24px 0;
      li{
        &:not(:last-child){
          margin-bottom: 8px;
        }
        font-size: 15px;
        line-height: 24px;
        color: #1A1919;
      }
    }
  }
  &-head{
    h3{
      @media (max-width: 767px) {
        margin-bottom: 16px;
      }
      margin: 0 0 22px;
      line-height: 30px;
      color: #1A1919;
    }
    @media (max-width: 767px) {
      margin-bottom: 16px;
    }
    margin-bottom: 24px;
  }
}
.category-description {
  @media (max-width: 767px) {
    margin-bottom: 48px;
  }
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 68px;
  &--item {
    &:not(:last-child) {
      border-bottom: 1px solid #E0E0E0;
      @media (max-width: 767px) {
        margin-bottom: 24px;
        padding-bottom: 24px;
      }
      margin-bottom: 32px;
      padding-bottom: 32px;
    }
    .subtitle {
      display: block;
      padding-left: 18px;
      position: relative;
      line-height: 24px;
      margin-bottom: 16px;
      font-weight: 500;
      color: #1A1919;
      font-size: 18px;

      &:before {
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        width: 3px;
        height: 24px;
        background: #23BE20;
        border-radius: 4px;
      }
    }
    b {
      font-size: 14px;
      line-height: 24px;
      color: #1A1919;
      font-weight: 700;
      display: block;
      margin-bottom: 16px;
    }
  }
}
.category-faq{
  @media (max-width: 767px){
    margin-top: 24px;
  }
  &--item{
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;
    &:not(:last-child){
      @media (max-width: 767px) {
        margin-bottom: 16px;
      }
      margin-bottom: 20px;
    }
    &:hover{
      .subtitle{
        color: #1A1919;
      }
    }
    .subtitle{
      font-weight: 500;
      cursor: pointer;
      color: #5F5E5E;
      font-size: 18px;
      line-height: 24px;
    }
  }
  &--content{
    display: none;
    padding-top: 12px;
    p{
      color: #1A1919;
    }
  }
}
.category-faq--item.open{
  .category-faq--content{
    display: block;
  }
}
</style>
