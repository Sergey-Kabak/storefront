<template>
  <button
    v-if="type === 'next'"
    class="inline-flex between-xs w-100 px25 py20 pr15 serif cl-accent"
    type="button"
    @click.stop="next()"
    :aria-label="$t('Show subcategories')"
    data-testid="categoryButton"
  >
    {{ customClass }}
    <span class="back" v-html="ico"></span>
    {{ name }}
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.707 17.707L16.414 12L10.707 6.293L9.29297 7.707L13.586 12L9.29297 16.293L10.707 17.707Z"/>
    </svg>
  </button>
  <button
    v-else
    class="inline-flex p15 between-xs"
    type="button"
    @click.stop="back()"
    :aria-label="$t('Back')"
  >
    {{ customClass }}
    <span v-html="ico" class="back"></span>
    {{ name }}
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.2929 6.293L7.58594 12L13.2929 17.707L14.7069 16.293L10.4139 12L14.7069 7.707L13.2929 6.293Z" />
    </svg>
  </button>
</template>
<script>
import { mapState } from 'vuex';
import config from 'config';

export default {
  name: 'SubBtn',
  props: {
    id: {
      type: null,
      default: ''
    },
    type: {
      type: String,
      default: 'next'
    },
    name: {
      type: String,
      default: ''
    },
    isCategory: {
      type: Boolean,
      default: true
    },
    ico: {},
    customClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      submenu: state => state.ui.submenu
    })
  },
  methods: {
    next () {
      if (config.entities.category.categoriesDynamicPrefetch && this.isCategory) this.$store.dispatch('category-next/fetchMenuCategories', { parent: this.id })
      this.$store.commit('ui/setSubmenu', {
        id: this.id,
        depth: ++this.submenu.depth
      })
    },
    back () {
      this.$store.commit('ui/setSubmenu', {
        depth: --this.submenu.depth
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-gray: color(gainsboro);
$color-black: color(matterhorn);

button {
  display: flex;
  align-items: center;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  color: #595858;
  span {
    margin-right: 10px;
    display: block;
    width: 25px;
  }
  .mla {
    margin-left: auto;
  }
  svg {
    margin-left: auto;
    fill: $color-gray;
    font-size: 28px;
    line-height: 24px;
  }
  &:hover,
  &:focus {
    svg {
      fill: $color-black;
    }
  }
}

.back {
  width: auto;
}
</style>
