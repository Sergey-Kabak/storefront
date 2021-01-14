<template>
  <div class="minimal-layout">
    <div id="viewport" class="w-100 relative">
      <error-header />
      <slot />
      <minimal-footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ErrorHeader from 'theme/components/core/blocks/Header/ErrorHeader.vue';
import MinimalFooter from 'theme/components/core/blocks/Footer/MinimalFooter.vue';

import Head from 'theme/head';

export default {
  data () {
    return {
      ordersData: []
    }
  },
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay
    })
  },
  methods: {
  },
  beforeMount () {
  },
  beforeDestroy () {
  },
  metaInfo: Head,
  components: {
    ErrorHeader,
    MinimalFooter
  }
}
</script>

<style lang="scss" src="theme/css/main.scss">

</style>
