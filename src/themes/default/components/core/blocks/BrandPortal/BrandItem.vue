<template>
  <div class="brand-item" @click="$emit('onCategoryChange', brand)">
    <img class="brand-image" v-lazy="brandImage" :alt="brand.name">
    <span class="brand-name">{{ brand.name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    brand: {
      type: Object,
      required: true
    }
  },
  computed: {
    brandImage() {
      if (this.brand.thumbnail) {
        return this.getThumbnail(this.brand.thumbnail, 50, 50, 'brand')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.brand-item {
  position: relative;
  text-align: center;
  cursor: pointer;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  margin-right: 4%;
  margin-bottom: 8px;
  padding-bottom: 8px;

  &:last-child {
    margin-right: 0;
  }

  &.active {
    &:after {
      transform: scaleX(1);
    }
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 2px;
    transform: scaleX(0);
    background-color: #23BE20;
    transition: transform 0.3s;
  }

  &:hover {
    &:after {
      transform: scaleX(1);    
    }
  }
}

.brand-image {
  display: flex;
  width: auto;
  height: 50px;
  max-width: 50px;
  margin: auto auto 16px auto;
}

.brand-name {
  font-family: DIN Pro;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  color: #1A1919;
}
</style>
