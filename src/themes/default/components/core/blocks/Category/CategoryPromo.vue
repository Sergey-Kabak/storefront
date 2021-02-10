<template>
  <div class="banner-description">
    <div v-if="getCurrentCategory.image" class="banner-description__image-wrapper" :class="{full: !getCurrentCategory.description}">
      <img class="desk" :src="thumbnail" alt="banner">
    </div>
    <div class="banner-description__block" v-if="getCurrentCategory.description">
      <h3>{{ $t('Description of the action') }}</h3>
      <div class="banner-description-info">
        <div class="banner-description__text-wrapper">
          <div class="banner-description__text" v-html="getCurrentCategory.description"></div>
        </div>
      </div>
      <promo-expiry-date
        v-if="getCurrentCategory.custom_design_from && getCurrentCategory.custom_design_from"
        :to="getCurrentCategory.custom_design_to"
        :from="getCurrentCategory.custom_design_from" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PromoExpiryDate from './PromoExpiryDate';

export default {
  components: {
    PromoExpiryDate
  },
  computed: {
    ...mapGetters({
      getCurrentCategory: 'category-next/getCurrentCategory'
    }),
    thumbnail () {
      return this.getThumbnail(this.getCurrentCategory.image.replace('/media/catalog/category/', ''), 0, 0, 'category')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/helpers/mixins';

.banner-description-info {
  margin-bottom: 24px;

  @media only screen and (max-width: 1024px) {
    height: 100%;
  }
}

.banner-description {
  margin-bottom: 64px;;
  display: flex;
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
  @media only screen and (max-width: 1024px) {
    margin-bottom: 46px;
  }
  
  img {
    &.desk {
      border-radius: 4px;
      margin-right: 20px;
      height: 100%;
      object-fit: cover;
    }
    display: block;
    width: 100%;
    &.mob {
      display: none;
    }
  }
  .full {
    width: 100%;
    img.desk {
      width: 100% !important;
      height: auto !important;
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
      display: block !important;
    }
    img.mob {
      display: none !important;
    }
  }
  h3 {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
    color: #1A1919;
    margin: 16px 0;
  }
  &__image-wrapper {
    flex: 1;
  }
  &__block {
    margin-left: 20px;
    display: flex;
    flex: 0 0 294px;
    flex-direction: column;
    max-height: 24vw;

    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px 0 16px 16px;
    @media only screen and (max-width: 1200px) {
      padding: 8px 0 8px 8px;
    }
    position: relative;
    @media only screen and (max-width: 1024px) {
      flex: 1;
      margin-left: 0;
      max-height: unset;
      padding: 16px;
      margin-top: 20px;
      width: 100%;
      height: 100%;
    }
    @media only screen and (max-width: 600px) {
      padding: 12px;
      max-height: 500px;
    }

    @include mobile-view {
      margin-top: 16px;
    }
    & > h3 {
      margin-top: 0;
      padding-right: 16px;

      @media only screen and (max-width: 1024px) {
        padding-right: 0;
      }
    }
  }
  &__text {
    overflow-y: auto;
    font-family: DIN Pro;
    line-height: 24px;
    color: #5f5e5e;
    font-size: 15px;
    margin-bottom: 8px;
    margin: 0;
    height: 100%;
    max-height: 15vw;
    &::-webkit-scrollbar {
      width: 4px;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #E0E0E0;
      height: 49px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    @media only screen and (max-width: 1024) {
      max-height: 500px;
    }
    @media only screen and (max-width: 600px) {
      max-height: 250px;
    }
    &.active {
      display: block;
    }
  }
  &__text-wrapper {
    position: relative;
    height: 100%;

    &::before {
      z-index: 2;
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 17%;
      width: 100%;
      background: linear-gradient(rgba(255, 255, 255, 0.02), white);

      @media only screen and (max-width: 1024px) and (min-width: 600px) {
        display: none;
      }
    }
    &.active::before {
      height: 0;
    }
  }
}
::v-deep {
  p {
    margin: 0;
  }
}
</style>
