<template>
  <div class="categories" v-if="categories.length">
    <h4 class="categories-title">
      {{ $t('Categories') }}
    </h4>
    <div class="category-buttons" @click="closeSearchPanel()">
      <router-link
        v-for="category in categories"
        :to="getCategoryLink(category.url)"
        :key="category.id"
        class="category"
      >
        {{ category.title }} ({{ category.count }})
      </router-link>
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
    getCategoryLink(url) {
      const link = new URL(url)
      return link && link.pathname || '/'
    },
    closeSearchPanel() {
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setMicrocart', false)
      this.$store.commit('ui/setSearchpanel', false)
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
  margin-bottom: -12px;
}

.category {
  margin: 0 12px 12px 0;
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

  &:hover {
    border-color: #BDBDBD;
  }

  &:active {
    border-color: #a6a6a6
  }
}
</style>
