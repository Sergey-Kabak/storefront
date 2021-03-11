<template>
  <div class="stars">
    <div class="star" v-for="(star, index) in maxStars" :key="index">
      <icon-base :width="16" :height="16" class="star-icon" :class="{ 'active': rating >= star }"> <star-icon /> </icon-base>
    </div>
  </div>
</template>

<script>
import { StarIcon } from 'theme/assets/account/index';
import IconBase from 'theme/components/theme/IconBase';

export default {
  components: {
    IconBase,
    StarIcon
  },
  props: {
    maxStars: {
      type: Number,
      default: 5
    },
    rating: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.stars {
  display: flex;
  align-items: center;
}

.star-icon {
  fill: #E0E0E0;

  &.active {
    fill: #FFCA41;
  }
}
</style>