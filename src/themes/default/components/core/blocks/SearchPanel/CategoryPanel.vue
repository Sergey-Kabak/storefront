<template>
  <div class="categories">
    <h4 class="categories-title">
      {{ $t('Categories') }}
    </h4>
    <div class="category-buttons">
      <button
        v-for="category in categories"
        :key="category.category_id"
        @click="toggleCategory(category)"
        :class="{ 'active': isCategoryActive(category) }"
        class="category"
        type="button"
      >
        {{ category.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    toggleCategory (category) {
      const isSelected = this.value.includes(category.category_id)
      if (isSelected) {
        this.$emit('input', this.value.filter(categoryId => categoryId !== category.category_id))
      } else {
        this.$emit('input', [...this.value, category.category_id])
      }
    },
    isCategoryActive(category) {
      return this.value.includes(category.category_id)
    }
  }
}
</script>

<style lang="scss" scoped>
.categories-title {
  margin: 0 0 20px 0;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #1A1919;
}

.category-buttons {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 12px;
}

.category {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  color: #1A1919;
  border-style: none;
  background-color: #F2F2F2;
  border-radius: 4px;
  padding: 8px 10px;
  border: 1px solid transparent;
  transition: .2s ease-in-out;

  &.active {
    border-color: #23BE20;
    background-color: #fff;
    
    &:hover {
      border-color: #20af1d;
    }

    &:active {
      border-color: #1fa71c;
    }
  }

  &:hover {
    border-color: #BDBDBD;
  }

  &:active {
    border-color: #a6a6a6
  }
}
</style>
