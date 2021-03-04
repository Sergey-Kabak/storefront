<template>
  <div v-if="getUserEmail" class="sr-only">
    <span id="EsMail" style="display:none">{{ getUserEmail }}</span>
    <!-- <span id="EsPhone" style="display:none">PHONE NUMBER</span> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', [ 'getUserEmail'])
  }
}
</script>

<style scoped lang="scss">
.sr-only {
  clip: rect(0 0 0 0); 
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; 
  width: 1px;
}
</style>