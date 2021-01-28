<template>
  <div class="compare" v-if="all_comparable_attributes.length">
    <div class="">
      <div class="f-container container">
        <div class="row">
          <div class="col-12 compare-col-mobile">
            <breadcrumbs class="is-on-desktop" :with-homepage="true" :routes="[]" active-route="Compare"/>
            <mobile-breadcrumbs class="is-on-mobile" withHomepage/>
            <h2 class="page-title h2 relative">
              {{ $t(title) }}
              <button v-if="Object.keys(categories).length > 1" @click.prevent="toggleSidebar(true)"
                      class="filter-button--mobile">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 18H9V16H3V18ZM3 6V8H21V6H3ZM3 13H15V11H3V13Z" fill="#BDBDBD"/>
                </svg>
              </button>
            </h2>
            <div v-if="items.length" class="compare-nav-container--mobile">
              <div class="compare-nav__link weight-700" @click="goBack()">{{ $t('add more to comapre') }}</div>
              <div class="flex">
                <div class="compare-nav__text weight-400">{{
                    $tc(`added {count} items`, addedProducts[currentCategory])
                  }}
                </div>
                <div class="compare-nav__text underline" @click="removeAll">
                  {{ $t('Remove all') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pt35 f-container container compare-container" ref="compare-container">
      <div class="row" v-if="items.length">
        <div class="col-xs-12 compare-col">
          <div class="compare__products-table" ref="compare__products-table">
            <div class="flex block-padding" ref="block-padding">
              <div class="compare__features compare-nav-container">
                <div class="compare__top-info">
                  <div class="compare-nav">
                    <div class="compare-nav__text weight-400">
                      {{ $tc(`added {count} items`, addedProducts[currentCategory]) }}
                    </div>
                    <div class="compare-nav__link" @click="goBack()">{{ $t('add more to comapre') }}</div>
                    <div class="compare-nav__text underline" @click="removeAll">
                      {{ $t('Remove all') }}
                    </div>
                    <div class="compare-nav__buttons">
                      <span>{{ $t('indicate') }}</span>
                      <div class="buttons-group">
                        <button :class="{'active' : !isDifference}" type="button" @click="isDifference = false" :aria-label="$t('All parameters')">
                          {{ $t('All parameters') }}
                        </button>
                        <button :class="{'active' : isDifference}" type="button" @click="isDifference = true" :aria-label="$t('Differences')">
                          {{ $t('Differences') }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="compare__products-wrapper ">
                <ul class="compare__products-columns compare__items relative">
                  <div class="catogories-tabs flex" v-if="Object.keys(categories).length">
                    <b>{{ $t('compare') }}:</b>
                    <div class="flex catogories-tabs__wrapper">
                      <div v-for="(category , index) in categories" :key="index"
                           class="item"
                           :class="{'active' : currentCategory === index}"
                           @click="changeCategoryIndex(index)">
                        {{ index }} ({{ addedProducts[index] }})
                      </div>
                    </div>
                  </div>
                  <div class="catogories-tabs-wrap">
                    <template v-for="(product, index) in items">
                      <li
                        :key="index"
                        class="compare__product compare__product-head"
                        data-testid="comparedProduct"
                        v-if="currentCategory === product.category[0].name"
                        :class="{'visible' : currentCategory === product.category[0].name}"
                      >
                        <div class="compare__top-info pt45"
                             :class="{'single-product' : addedProducts[currentCategory] === 1}">
                          <compare-product-tile class="col-md-12 collection-product" :product="product"/>
                        </div>
                      </li>
                    </template>
                  </div>
                </ul>
              </div>
            </div>
            <div class="compare-nav__buttons mobile">
              <span>{{ $t('indicate') }}</span>
              <div class="buttons-group">
                <button :class="{'active' : !isDifference}" type="button" @click="isDifference = false" :aria-label="$t('All parameters')">
                  {{ $t('All parameters') }}
                </button>
                <button :class="{'active' : isDifference}" type="button" @click="isDifference = true" :aria-label="$t('Differences')">
                  {{ $t('Differences') }}
                </button>
              </div>
            </div>
            <div class="no-results" v-if="!hasDiff && isDifference">
              {{ $t('No differences') }} ¯\_(ツ)_/¯
            </div>
            <div v-else class="relative flex container-js-width" ref="container-js-width">
              <div class="compare__features attributes-list flex mobile">
                <ul class="compare__features-list">
                  <template v-for="(attr, index) in getAvailableAttributes">
                    <li
                      :key="index"
                      class="compare__features-item attr-name"
                      v-if="!(isDifference && attr.isUnique)"
                    >
                      {{ attr.default_frontend_label }}
                    </li>
                  </template>
                </ul>
              </div>
              <div class="compare__products-wrapper mobile">
                <ul class="compare__products-columns relative">
                  <template v-for="(product, index) in items">
                    <li
                      :key="index"
                      class="compare__product"
                      data-testid="comparedProduct"
                      v-if="currentCategory === product.category[0].name"
                    >
                      <ul class="compare__features-list">
                        <template v-for="(attr, attIndex) in getAvailableAttributes">
                          <li
                            :key="attIndex"
                            v-if="!(isDifference && attr.isUnique)"
                            :class="{'single-product-attribute' : addedProducts[currentCategory] === 1}"
                            class="compare__features-item specification">

                            <product-attribute
                              :key="attr.attribute_code"
                              :product="product"
                              :attribute="attr"
                              empty-placeholder="N/A"
                            />
                          </li>
                        </template>
                      </ul>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-else>
        <div class="row">
          <div class="col-xs-12">
            <h4 class="cl-accent ml30">
              {{ $t('You have no items to compare.') }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>{{all_comparable_attributes}}</div>
</template>

<script>
import Compare from '@vue-storefront/core/pages/Compare';
import Breadcrumbs from '../components/core/Breadcrumbs';
import MobileBreadcrumbs from '../components/core/MobileBreadcrumbs.vue';
import CompareProductTile from 'theme/components/core/blocks/Compare/CompareProductTile';
import ProductAttribute from '../components/core/blocks/Compare/ProductAttribute';
import i18n from '@vue-storefront/i18n';
import { RemoveFromCompare } from '@vue-storefront/core/modules/compare/components/RemoveFromCompare';
import mixin from '../components/core/blocks/Compare/mixin'
import { mapGetters } from 'vuex'

export default {
  components: {
    Breadcrumbs,
    MobileBreadcrumbs,
    CompareProductTile,
    ProductAttribute
  },
  mixins: [Compare, mixin],
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    calculateCells () {
      for (let i = 0; i < document.querySelectorAll('.attributes-list li').length; i++) {
        let maxHeight = 0
        for (let x = 0; x < document.querySelectorAll('.compare__features-list').length; x++) {
          let listItem = document.querySelectorAll('.compare__features-list')[x].querySelectorAll('li')[i];
          listItem.style.minHeight = 'auto';
          listItem.clientHeight > maxHeight && (maxHeight = listItem.clientHeight);
        }
        for (let x = 0; x < document.querySelectorAll('.compare__features-list').length; x++) {
          let listItem = document.querySelectorAll('.compare__features-list')[x].querySelectorAll('li')[i]
          listItem.style.minHeight = maxHeight + 'px'
        }
      }
    },
    calculateWidth () {
      let tableWrapper = this.$refs['compare__products-table'],
        topNavWrapper = this.$refs['block-padding'],
        attrWrapper = this.$refs['container-js-width'];

      if (tableWrapper && topNavWrapper && attrWrapper) {
        topNavWrapper.style.width = '100%';
        attrWrapper.style.width = '100%';

        topNavWrapper.style.width = tableWrapper.scrollWidth + 'px';
        attrWrapper.style.width = tableWrapper.scrollWidth + 'px';
      }
    }
  },
  computed: {
    ...mapGetters({
      getCompareItems: 'compare/getCompareItems',
      isCompareLoaded: 'compare/isCompareLoaded'
    })
  },
  mounted () {
    // this.$store.dispatch('product/loadProductAttributes', { product: JSON.parse(localStorage.getItem('shop/compare/current-compare'))[0] })
    this.calculateWidth();
    this.calculateCells();
  },
  updated () {
    this.calculateCells();
    this.calculateWidth()
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.title || i18n.t('Compare Products'),
      meta: this.$route.meta.description
        ? [{ vmid: 'description', description: this.$route.meta.description }]
        : []
    }
  },
  watch: {
    getCompareItems: function (v) {
      const attr = this.getCompareItems.map(el => el.attributes_metadata.filter(attr => attr.is_comparable && attr.is_visible_on_front)).flat();
      let uniqAttr = []
      attr.forEach(el => {
        if (!uniqAttr.length) {
          uniqAttr.push(el)
        } else if (!uniqAttr.find(it => it.id === el.id)) {
          uniqAttr.push(el)
        }
      })
      this.$store.state.attribute.list_by_code = [...uniqAttr]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

$color-white: color(white);
$border: mix(#000, $color-white, 10%);
$color-product-bg: color(secondary, $colors-background);

$products-column-width-mobile: 140px;
$products-column-width: 280px;
$features-column-width-mobile: 110px;
$features-column-width: 336px;
$screen-l: 1170px;
.single-product {
  .product {
    @media (max-width: 767px) {
      border-right: 1px solid #E0E0E0 !important;
    }
  }
}

.single-product-attribute {
  @media (max-width: 767px) {
    min-width: 100vw;
  }
}

.is-on-desktop {
  @media (max-width: 767px) {
    display: none;
  }
}

.no-results {
  font-size: 15px;
  line-height: 24px;
  padding: 12px 16px;
  background: #fff;
  width: 100%;
  font-family: DIN Pro;
}

.is-on-mobile {
  @media (min-width: 768px) {
    display: none;
  }
}

.compare__items {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.filter-button--mobile {
  @media (min-width: 768px) {
    display: none;
  }
  @media (max-width: 767px) {
    position: absolute;
    right: 0;
    top: 5px;
    background: transparent;
    border: none;
  }
}

@media (min-width: 768px) {
  .compare__features {
    background-color: transparent !important;
  }
  .compare-nav__buttons.mobile {
    display: none;
  }
}

.compare-container {
  padding-top: 16px;
  @media (min-width: 768px) {
    padding-bottom: 68px;
  }
  @media (max-width: 767px) {
    padding-bottom: 48px;
  }
}

@media (max-width: 767px) {
  .compare__features-item.attr-name {
    padding-left: 16px;
    font-family: DIN Pro;
    font-style: normal;
    //font-weight: 400 !important;
    font-size: 15px;
    line-height: 24px;
    color: #595858;
  }
  .compare__features-item.specification {
    ::v-deep span {
      display: block;
      width: 100%;
      font-size: 15px;
      line-height: 24px;
      position: relative;
      //white-space: nowrap;
      //text-overflow: ellipsis;
      //overflow: hidden;
      &:after {
        content: '';
        position: absolute;
        right: -5px;
        top: 0;
        height: 100%;
        border-right: 1px solid #ccc;
      }
    }
  }
  .compare__top-info {
    padding-top: 0;
  }
  .compare__features.mobile {
    background-color: transparent;

    .compare__features-item {
      padding-bottom: 50px;

      &:nth-child(odd) {
        background-color: transparent;
      }

      &:nth-child(even) {
        background-color: transparent;
      }
    }
  }
  .compare__products-wrapper.mobile {
    position: absolute;

    .compare__features-item {
      padding-top: 50px;
    }
  }
  .compare-nav__buttons.mobile {
    display: inline-flex;
    position: sticky;
    left: 0;
    flex-direction: column;
  }
  .f-container {
    width: 100%;
    max-width: 100%;
  }
  .compare__features.compare-nav-container {
    display: none;
  }
}

.block-padding {
  padding-bottom: 16px;
  @media (max-width: 767px) {
    padding-bottom: 24px;
  }
}

.compare-col-mobile {
  @media (max-width: 767px) {
    padding: 0 16px;
  }
}

.compare-col {
  @media (min-width: 768px) {
    padding: 0;
  }
  @media (max-width: 767px) {
    padding: 0px;
  }
}

.attributes-list {
  li {
    color: #595858;
  }
}

.hidden {
  display: none !important;
}

.page-title {
  @media (max-width: 767px) {
    margin: 16px 0;
    line-height: 30px;
  }
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 700;
  line-height: 46px;
  color: #1A1919;
  margin: 24px 0;
}

.compare-nav-container--mobile {
  @media (min-width: 768px) {
    display: none;
  }

  & > .flex {
    justify-content: space-between;
  }

  .compare-nav__text {
    @media (max-width: 767px) {
      margin-bottom: 0px;
    }
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 13px;
    line-height: 16px;
    color: #1A1919;
    display: inline-block;
    margin-bottom: 29px;

    &.underline {
      cursor: pointer;
      padding-bottom: 3px;
      border-bottom: 1px dashed;

      &:hover {
        border-bottom-color: transparent;
      }
    }
  }

  .compare-nav__link {
    @media (max-width: 767px) {
      margin-bottom: 16px;
    }
    cursor: pointer;
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 13px;
    line-height: 16px;
    color: #23BE20;
    display: inline-block;
    padding-bottom: 4px;
    border-bottom: 1px dashed #23BE20;
    margin-bottom: 29px;

    &:hover {
      border-bottom-color: transparent;
    }
  }
}

.compare-nav-container {
  .compare__top-info {
    padding: 0 20px 0 0 !important;
  }
}

.catogories-tabs {
  @media (max-width: 767px) {
    display: none;
  }
  display: flex;
  align-items: flex-start;

  b {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
    margin-right: 12px;
  }

  &__wrapper {
    display: flex;
    align-items: flex-start;

    .item {
      white-space: nowrap;

      &.active {
        padding-bottom: 3px;
        color: #1A1919;
        border-bottom: 1px solid;
      }

      &:not(:last-child) {
        margin-right: 20px;
      }

      &:hover {
        color: #1A1919;
      }

      cursor: pointer;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 0;
      font-size: 13px;
      line-height: 16px;
      color: #AFB3B9;
    }
  }
}

.catogories-tabs-wrap {
  display: flex;
  width: 100%;

  .compare__product-head {
    &:last-child {
      .compare__top-info:not(.single-product) {
        .product:not(.small) {
          @media (max-width: 767px) {
            &:before {
              position: absolute;
              content: '';
              width: 16px;
              height: 1px;
              background-color: #fff;
              top: -1px;
              right: 0;
            }
            &:after {
              position: absolute;
              content: '';
              width: 16px;
              height: 1px;
              background-color: #fff;
              bottom: -1px;
              right: 0;
            }
          }
        }
      }
    }
  }

  .compare__product-head {
    &:first-child {
      .product {
        @media (max-width: 767px) {
          border-left: none;
        }
      }

      .product:not(.small) {
        @media (max-width: 767px) {
          &:before {
            position: absolute;
            content: '';
            width: 16px;
            height: 1px;
            background-color: #fff;
            top: -1px;
            left: 0;
          }
          &:after {
            position: absolute;
            content: '';
            width: 16px;
            height: 1px;
            background-color: #fff;
            bottom: -1px;
            left: 0;
          }
        }
      }
    }

    &:last-child {
      .product {
        @media (max-width: 767px) {
          border-right: none;
        }
      }
    }
  }

  .compare__product-head:not(.visible) {
    display: none;
  }

  .compare__product-head.visible {
    &:not(:first-child) {
      .product {
        border-left: none;
      }
    }

    &:first-child {
      .product {
        @media (min-width: 768px) {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
      }
    }

    &:last-child {
      .product {
        @media (min-width: 768px) {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }

    @media (max-width: 767px) {
      min-width: calc(50vw);
      max-width: calc(50vw);
    }
    display: flex;
  }
}

.collection-product {
  @media (max-width: 767px) {
    padding-top: 16px;
  }
  min-height: 205px;
  flex: 1;
}

.collection-product.small {
  ::v-deep .name{
    height: 34px;
    overflow: hidden;
    font-size: 13px;
    line-height: 16px;
  }
  @media (max-width: 767px) {
    background-color: #fff;
    .product-price-block {
      flex-direction: row !important;
    }
    ::v-deep .product-cover,
    ::v-deep .price-sale,
    ::v-deep .product__icons,
    ::v-deep .product-card-bottom-options,
    ::v-deep .product-tags {
      display: none;
    }
  }
  @media (min-width: 768px) {
    ::v-deep & > *:not(.product-link) {
      display: none !important;
    }
    ::v-deep .product-link {
      margin-bottom: 0;
    }
  }
  min-height: 93px;
  max-height: 93px;

}

*,
*::after,
*::before {
  box-sizing: border-box;
}

.catogories-tabs {
  position: sticky;
  z-index: 1;
  left: 334px;
  margin-bottom: -20px;
}

.pb16 {
  padding-bottom: 16px;
}

.compare {
  &__features {
    position: sticky !important;
    left: 0;
    display: flex;
    min-width: $features-column-width;
    border: none !important;

    & > ul {
      width: 100%;
    }
  }

  &__top-info {
    flex: 1;

    .compare-nav {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &__text {
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 0;
        font-size: 13px;
        line-height: 16px;
        color: #1A1919;
        display: inline-block;
        margin-bottom: 29px;

        &.underline {
          cursor: pointer;
          padding-bottom: 3px;
          border-bottom: 1px dashed;

          &:hover {
            border-bottom-color: transparent;
          }
        }
      }

      &__link {
        cursor: pointer;
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 0;
        font-size: 13px;
        line-height: 16px;
        color: #23BE20;
        display: inline-block;
        padding-bottom: 3px;
        border-bottom: 1px dashed #23BE20;
        margin-bottom: 16px;

        &:hover {
          border-bottom-color: transparent;
        }
      }

    }
  }
}

.compare-nav__buttons {
  @media (max-width: 767px) {
    padding: 0 16px;
  }
  margin-top: auto;
  width: 100%;

  & > span {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
    display: block;
    margin-bottom: 16px;
  }

  .buttons-group {
    @media (max-width: 767px) {
      margin-bottom: 16px;
    }
    display: flex;
    background: #F2F2F2;
    border-radius: 4px;
    height: 32px;

    button {
      flex: 1;
      background-color: transparent;
      border: 1px solid transparent;
      border-radius: 4px;
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: #1A1919;

      &.active {
        border-color: #23BE20;
        background-color: #fff;
      }
    }
  }
}

.compare {
  &__products-wrapper {
    //overflow-x: auto;
    //-webkit-overflow-scrolling: touch;
  }

  &__products-columns {
    margin: 0;
    padding: 0;
    display: flex;

    @media (min-width: $screen-l) {
      margin-left: 0;
    }
  }

  &__products-table {
    position: relative;
    //overflow: hidden;
    overflow-x: auto;
    overflow-y: hidden;
  }

  &__features {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: $features-column-width-mobile;
    border-style: solid;
    border-color: $border;
    border-width: 1px 0 1px 0;
    background-color: mix(#000, $color-white, 2%);
    opacity: 0.95;

    @media (min-width: $screen-l) {
      width: $features-column-width;
    }
  }

  &__product {
    list-style: none;
    position: relative;
    float: left;
    width: 100%;
    text-align: center;
    transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
    @media (min-width: 768px) {
      min-width: 329px;
      max-width: 329px;
    }
    @media (max-width: 767px) {
      min-width: calc(50vw);
      max-width: calc(50vw);
    }
  }

  &__attributes {
    font-weight: bold;
    font-size: 0.6rem;
    line-height: 14px;
    padding: 15px 5px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    @media (min-width: $screen-l) {
      padding: 16px;
      line-height: 16px;
      font-size: 0.7rem;
    }
  }

  &__top-info {
    flex: 1;
    position: relative;
    //height: 250px;
    width: 100%;
    text-align: center;
    transition: height 0.3s;
    cursor: pointer;
    background: #fff;
    //overflow: hidden;
    display: flex;
    flex-direction: column;
    // @media (min-width: $screen-l) {
    //   height: 385px;
    //   width: $products-column-width;
    // }

    .compare__features & {
      @extend .compare__attributes;
      width: $features-column-width-mobile;
      min-width: $features-column-width-mobile;
      cursor: auto;
      display: flex;
      flex-direction: column;
      padding-right: 20px;
      @media (min-width: $screen-l) {
        min-width: $features-column-width;
        width: $features-column-width;
      }
    }
  }

  &__features-list {
    margin: 0;
    padding: 0;
  }

  &__features-item {
    @extend .compare__attributes;
    list-style: none;
    //white-space: nowrap;
    //text-overflow: ellipsis;
    //overflow: hidden;
    font-size: 15px;
    font-family: "DIN Pro";
    color: #1A1919;

    &:nth-child(odd) {
      background-color: #fff;
    }

    &:nth-child(even) {
      background-color: #F9F9F9;
    }

    .compare__products-columns & {
      font-weight: normal;
      //text-align: center;
      span {
        @media (max-width: 767px) {
          padding-left: 11px;
        }
      }
    }
  }

  &__remove {
    position: absolute;
    top: 0;
    right: 0;
  }

  .compare__products-columns {
    & > li {
      &:last-child {
        li span:after {
          display: none;
        }
      }
    }
  }
}
</style>
