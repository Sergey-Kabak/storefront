<template>
  <div id="cms-page">
    <div class="v-container">
      <breadcrumbs :with-homepage="true" :active-route="activeMenu && activeMenu.title"/>
      <h1 class="info-title">{{  $t('Help')  }}</h1>
      <div class="cms-wrapper">
        <cms-menu />
        <no-ssr>
          <cms-select-menu />
        </no-ssr>
        <div class="cms">
          <header>
            <h1 class="page-title"> {{ cmsPageContent.title }}</h1>
            <div v-if="isShowCity" class="city-picker" @click="openCityModal()">
              <button class="city">{{ defaultCity }}</button>
              <svg class="city-picker-icon" width="18" height="18" viewBox="0 0 18 18" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 7.5L9 11.25L12.75 7.5H5.25Z" />
              </svg>
            </div>
          </header>
          <component v-if="cmsPageContent.content" class="cms-content" :is="{template: `<div>${cmsPageContent.content}</div>`}"></component>
          <shops v-if="$route.params.slug === 'shops'"></shops>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CmsMenu from 'theme/components/core/blocks/Cms/CmsMenu.vue'
import CmsSelectMenu from 'theme/components/core/blocks/Cms/CmsSelectMenu.vue'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import { Logger } from '@vue-storefront/core/lib/logger';
import { mapState } from 'vuex';
import CmsPage from '@vue-storefront/core/pages/CmsPage'
import Shops from 'theme/pages/Shops.vue'
import NoSSR from 'vue-no-ssr'
import ButtonText from 'theme/components/theme/ButtonText'

export default {
  mixins: [CmsPage],
  components: {
    CmsMenu,
    Breadcrumbs,
    CmsSelectMenu,
    Shops,
    'no-ssr': NoSSR,
    ButtonText
  },
  computed: {
    ...mapState({
      activeMenu: (state) => state.cms.activeMenu,
      cmsPageContent: (state) => state.cmsPage.current,
      defaultCity: (state) => state.ui.defaultCity
    }),
    isShowCity() {
      return ['shops'].includes(this.$route.params.slug)
    }
  },
  methods: {
    openCityModal() {
      this.$bus.$emit('modal-show', 'modal-city-picker')
    }
  }
};
</script>

<style lang="scss" scoped>
.v-container {
  width: 90%;
}

header {
  display: flex;
  align-items: center;
}

.page-title {
  margin: 0 16px 16px 0px;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
}

.city-picker {
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  cursor: pointer;

  &:hover {
    svg {
      transform: rotate(180deg);
    }

    .city {
      border-color: transparent;
    }
  }
}

.city-picker-icon {
  transition: .2s ease-in-out;
}

.city {
  margin-right: 3px;
  font-family: DIN Pro;
  background: none;
  padding: 0;
  border-style: none;
  font-weight: 600;
  border-bottom: 1px dashed #23BE20;
  font-size: 18px;
  line-height: 23px;
  color: #23BE20;
  transition: .2s ease-in-out;
}

.v-select {
  display: none;
}

.breadcrumbs {
  margin-bottom: 24px;
}

.cms {
  width: 100%;
}

.info-title {
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 46px;
  margin-top: 0;
  margin-bottom: 16px;
  color: #1A1919;
}

.cms-wrapper {
  display: flex;
  align-items: flex-start;
  padding-bottom: 52px;

  .menu {
    width: 32%;
    min-width: 200px;
    max-width: 316px;
    margin: 52px 20px 0 0;
  }
}

@media (max-width: 768px) {
  .breadcrumbs {
    display: none;
  }

  .info-title {
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 24px;
  }

  ::v-deep {
    .menu,
    .page-title {
      display: none;
    }

    .v-select {
      display: block;
    }

    .cms-wrapper {
      flex-direction: column;
    }
  }
}
::v-deep .cms-content {
  margin-bottom: 16px;

  * {
    box-sizing: border-box;
  }
  
  .width-full {
    width: 100%
  }

  h1, h2, p {
    margin: 0;
    padding: 0;
  }

  a {
    display: inline-block;
  }

  img {
    display: block;

    &.rounded {
      border-radius: 4px;
    }
  }

  .line {
    width: 100%;
    background: #E0E0E0;
    height: 1px;
    margin-bottom: 32px;
  }
  
  ul {
    padding: 0;
    margin: 0;
    list-style-position: inside;
  }

  li {
    font-family: DIN Pro;
    font-size: 15px;
    line-height: 24px;
    color: #1A1919;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  span {
    display: contents;
  }

  p {
    font-family: DIN Pro;
    margin: 0;
    font-size: 15px;
    line-height: 24px;
    color: #5f5e5e;
  }

  .text-center {
    text-align: center;
  }

  .mt-auto {
    margin-top: auto;
  }

  .dark {
    color: #1A1919
  }

  .light {
    color: #5F5E5E;
  }

  .link {
    display: inline-block;
    font-family: DIN Pro;
    font-style: normal;
    font-size: 14px;
    line-height: 24px;
    color: #1A1919;

    &.light {
      color: #5F5E5E;
    }

    &.underline {
      border-bottom: 1px solid currentColor;
    }

    &.dashed {
      border-bottom: 1px dashed currentColor;
    }
  }
  
  .bold {
    font-weight: 600;
    color: #1A1919;
  }

  .uppercase {
    text-transform: uppercase;
  }

  .red {
    color: #ee2c39;
  }

  .green {
    color: #23be20;
  }

  .offset-bottom {
    margin-bottom: 16px;
  }

  .offset-bottom-24 {
    margin-bottom: 24px;
  }

  .offset-bottom-8 {
    margin-bottom: 8px;
  }

  .warning {
    color: #9f9e9e;
  }

  .offset-left {
    margin-left: 12px;
  }

  .offset-right {
    margin-right: 16px;
  }

  .flex {
    display: flex;
    flex-wrap: wrap;
    margin-left: -10px;
    margin-right: -10px;

    &.offset-bottom-24 {
      margin-bottom: 8px;
    }

    &.column {
      flex-direction: column;
    }

    &.center {
      justify-content: center;
      align-items: center;
    }
  }

  .item {
    margin-bottom: 16px;
    padding: 16px;
    background: #F9F9F9;
    border-radius: 4px;
    margin: 0 10px 16px 10px;
    min-width: 200px;
    flex: 1;
  }

  .grid {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(204px, 1fr));
    grid-auto-rows: 1fr;

    .item {
      margin: 0;
    }
  }

  .title {
    display: flex;
    align-items: flex-start;
    position: relative;
    margin: 0 0 16px 0;
    font-family: DIN Pro;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #1a1919;

    &.border-left {
      &:before {
        content: "";
        display: inline-block;
        min-width: 3px;
        height: 24px;
        margin-right: 16px;
        border-radius: 4px;
        background-color: #23be20;
      }
    }
  }

  .card {
    padding: 16px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }


    &.dark-grey {
      p {
        color: #1A1919;
      }
    }

  }

  .quote {
    background: #F9F9F9;
    border-radius: 4px;
    padding: 16px;

    h1 {
      display: block;
      font-family: DIN Pro;
      font-size: 15px;
      font-weight: normal;
      line-height: 24px;
      color: #1A1919;
    }

    p {
      position: relative;
      display: block;
      padding: 0 36px;
      font-style: italic;

      &:before {
        content: url('/assets/cms/quote.svg');
        position: absolute;
        left: 0;
        top: 0;
      }

      &:after {
        content: url('/assets/cms/quote.svg');
        position: absolute;
        right: 0;
        bottom: 0;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
