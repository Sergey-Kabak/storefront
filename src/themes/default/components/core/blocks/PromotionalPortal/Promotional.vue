<template>
  <div class="promotional-card">
    <div class="promotional-image">
      <router-link :to="localizedRoute(promotional.url)">
        <promotional-image image-entity="promotional" :image="image"/>
      </router-link>
    </div>
    <div class="promotional-content">
      <span class="promotional-title" :title="promotional.name">{{ promotional.name }}</span>
      <promotional-date :fromDate="promotional.from_date" :toDate="promotional.to_date"/>
      <router-link :to="localizedRoute(promotional.url)">
        <button-full class="button-details">{{ $t('Details') }}</button-full>
      </router-link>
    </div>
  </div>
</template>

<script>
import PromotionalImage from 'theme/components/core/blocks/PromotionalPortal/PromotionalImage';
import PromotionalDate from "theme/components/core/blocks/PromotionalPortal/PromotionalDate.vue";
import ButtonFull from 'theme/components/theme/ButtonFull'

export default {
  components: {
    PromotionalDate,
    ButtonFull,
    PromotionalImage
  },
  props: {
    promotional: {
      type: Object,
      required: true
    }
  },
  computed: {
    image() {
      return {
        src: this.getThumbnail(this.promotional.image, 314, 270, 'promotional'),
        alt: this.promotional.image
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.promotional-card {
  margin: 0 auto;
  max-width: 316px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 0px 1px #E0E0E0 inset;
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
}

.promotional-image {
  max-height: 270px;
}

.product-image  {
  display: flex;
  align-items: center;
  justify-content: center;
}

.promotional-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  color: #1A1919;
  overflow: hidden;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
}

.promotional-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 18px 16px 16px 16px;
}

.button-full.button-details {
  height: 32px;
  max-width: 100%;
  background-color: #fff;
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 16px;
  color: #1A1919;
  border: 1px solid #E0E0E0;

  &:hover {
    background-color: #f9f9f9;
    color: inherit;
  }

  &:active {
    background-color: #e5e5e5;
  }
}
</style>
