<template>
  <div class="vertical-bar-wrapper pr20">
    <div v-for="(item , index) in verticalGallery"
         :key="index"
         @click="navigate(index)"
         :class="{'active' : index === active}"
         class="vertical-bar__item flex v-center mb8">
      <img :src="item.src" alt="">
    </div>
    <div v-if="gallery.length > 5" class="vertical-bar__more" @click="openOverlay">
      Еще {{ gallery.length - 5 }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gallery: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      active: 0
    }
  },
  computed: {
    verticalGallery () {
      return [...this.gallery].splice(0, 5)
    }
  },
  beforeMount () {
    this.$bus.$on('navigate-from-slider', (index) => {
      this.active = index;
    })
  },
  methods: {
    navigate (index) {
      this.$bus.$emit(
        'slide-index-from-vertical-bar',
        index
      )
    },
    openOverlay () {
      this.$emit('toggle', 0)
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
    }
    @media (max-width: 767px) {
      display: none;
    }
    min-width: 36px;
  }

  &__item {
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
      max-height: 36px;
      max-width: 36px;
      object-fit: contain;
      max-width: 100%;
    }
  }

  &__more {
    @media (max-width: 1200px) {
      display: flex;
      align-items: center;
    }
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
