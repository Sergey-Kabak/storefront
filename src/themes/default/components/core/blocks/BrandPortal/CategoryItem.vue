<template>
  <router-link :to="categoryLink" class="category-link">
    <div class="category-body">
      <img class="category-image" :src="categoryImage" :alt="category.name">
      <span class="category-name">{{ category.name }}</span>
    </div>
    <div class="category-arrow">
      <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#BDBDBD">
        <path d="M8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6L8.58984 7.41Z" />
      </svg>
    </div>
  </router-link>
</template>

<script>
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'

export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  computed: {
    categoryLink() {
      return formatCategoryLink(this.category)
    },
    categoryImage() {
      return this.getThumbnail(this.category.image, 56, 56, 'category')
    }
  }
}
</script>

<style lang="scss" scoped>
.category-link {
  cursor: pointer;
  max-width: 372px;
  width: 100%;
  padding: 18px 0;
  border-bottom: 1px solid #E0E0E0;

  &:hover {
    .category-name {
      color: #23BE20;
    }
    .arrow {
      fill: #23BE20;
    }
  }
}

.category-link,
.category-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-image {
  display: block;
  margin-right: 12px;
}

.category-name {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #000000;
}

.arrow,
.category-name {
  transition: .2s ease-in-out;
}
</style>
