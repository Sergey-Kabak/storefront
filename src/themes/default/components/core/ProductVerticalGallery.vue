<template>
  <div class="vertical-bar-wrapper">
    <div v-for="(item , index) in verticalGallery"
         :key="index"
         @click="navigate(index)"
         :class="{'active' : index === active}"
         class="vertical-bar__item flex v-center mb8">
      <img :src="item.src" alt="">
    </div>
    <div v-if="filteredGallery.length > 5" class="vertical-bar__more" @click="openOverlay">
      {{ $t('more') }} {{ filteredGallery.length - 5 }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getThumbnailPath } from '@vue-storefront/core/helpers';
import config from 'config';

export default {
  props: {
    gallery: {
      type: Array,
      required: true
    },
    configuration: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      active: 0,
      filteredGallery: [...this.gallery]
    }
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    verticalGallery () {
      return [...this.filteredGallery].splice(0, 5)
    }
  },
  created () {
    if (Object.keys(this.configuration)) {
      this.selectVariant(this.configuration)
    }
  },
  beforeMount () {
    this.$bus.$on('filter-changed-product', this.selectVariant)
    this.$bus.$on('navigate-from-slider', (index) => {
      this.active = index;
    })
  },
  methods: {
    selectVariant (configuration) {
      if (this.getCurrentProduct.type_id === 'configurable' && (configuration.attribute_code === 'color' || (configuration['color'] && configuration['color'].id))) {
        let configurableChildren = this.getCurrentProduct.configurable_children.find(child => child['color'] === (+configuration.id || +configuration['color'].id))
        this.filteredGallery = [...configurableChildren.media_gallery].map(gallery => {
          return {
            src: getThumbnailPath((gallery.image), config.products.gallery.width, config.products.gallery.height),
            loading: getThumbnailPath(gallery.image, config.products.thumbnails.width, config.products.thumbnails.height),
            id: configurableChildren.color
          }
        })
      }
      this.active = 0
    },
    navigate (index) {
      this.$bus.$emit(
        'slide-index-from-vertical-bar',
        index
      )
    },
    openOverlay () {
      this.$emit('toggle', 0)
    }
  },
  watch: {
    configuration: function (v) {
      this.selectVariant(v)
    },
    gallery: function (v) {
      this.filteredGallery = v
      this.active = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.vertical-bar {
  &-wrapper {
    @media (max-width: 1200px) {
      padding: 20px 0;
      display: flex;
      margin-right: 0;
    }
    @media (max-width: 767px) {
      display: none;
    }
    min-width: 56px;
    margin-right: 48px;
  }

  &__item {
    margin-bottom: 16px;
    @media (max-width: 1200px) {
      width: 50px;
      margin-bottom: 0;
    }

    &.active {
      opacity: 1;
    }

    &:hover {
      opacity: 1;
    }

    transition: ease-in 0.2s;
    cursor: pointer;
    width: 100%;
    opacity: 0.5;

    img {
      max-height: 56px;
      max-width: 56px;
      object-fit: contain;
      margin: 0 auto;
    }
  }

  &__more {
    @media (max-width: 1200px) {
      display: flex;
      align-items: center;
    }
    display: inline-block;
    font-family: 'DIN Pro';
    font-size: 13px;
    line-height: 16px;
    color: #1A1919;
    padding-bottom: 4px;
    border-bottom: 1px dashed #1A1919;
    box-sizing: border-box;
    cursor: pointer;
  }
}
</style>
