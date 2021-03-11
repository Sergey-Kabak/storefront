<template>
  <div class="remove-from-recently-viewed" @click="removeFromRecentlyViewed(product)">
    <icon-base > <remove-icon /> </icon-base>
  </div>
</template>

<script>

import IconBase from 'theme/components/theme/IconBase';
import { RemoveIcon } from 'theme/assets/account/index';
import { mapActions } from 'vuex';

export default {
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  components: {
    IconBase,
		RemoveIcon
  },
  methods: {
    ...mapActions({
      removeFromRecentlyViewed: 'recently-viewed/removeItem'
    })
  }
}
</script>

<style lang="scss" scoped>
.remove-from-recently-viewed {
  cursor: pointer;
}
</style>
