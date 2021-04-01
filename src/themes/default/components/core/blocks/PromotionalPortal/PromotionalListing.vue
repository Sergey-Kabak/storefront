<template> 
  <div class="promotional-listing">
    <promotional v-for="promotional in promotionals" :key="promotional.id" :promotional="promotional" />
  </div>
</template>

<script>
import Promotional from "theme/components/core/blocks/PromotionalPortal/Promotional.vue";

export default {
  components: {
    Promotional
  },
  props: {
    promotionals: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.promotional-listing {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
  width: 100%;
}
</style>
