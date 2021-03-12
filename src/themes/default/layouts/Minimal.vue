<template>
  <div class="minimal-layout">
    <overlay v-if="overlayActive"/>
    <div id="viewport" class="w-100 relative">
      <minimal-header />
      <async-sidebar
        :async-component="Microcart"
        :is-open="isMicrocartOpen"
        @close="$store.commit('ui/closeMicrocart')"
      />
      <async-sidebar
        :async-component="Consultation"
        :is-open="isConsultationOpen"
        @close="$store.commit('ui/setConsultation')"
        class="consultation-sidebar"
      />
      <slot />
      <minimal-footer />

      <city-picker />
      <credit-modal />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AsyncSidebar from 'theme/components/theme/blocks/AsyncSidebar/AsyncSidebar.vue';
import MinimalHeader from 'theme/components/core/blocks/Header/MinimalHeader.vue';
import MinimalFooter from 'theme/components/core/blocks/Footer/MinimalFooter.vue';
import Head from 'theme/head';
import config from 'config';
import Overlay from 'theme/components/core/Overlay.vue';
import { isServer } from '@vue-storefront/core/helpers';
import CreditModal from 'theme/components/core/blocks/CreditModal.vue';

const CityPicker = () => import(/* webpackChunkName: "vsf-custom-city-picker-modal" */ 'theme/components/core/blocks/CityPicker/CityPicker.vue');
const Microcart = () => import(/* webpackChunkName: "vsf-microcart" */ 'theme/components/core/blocks/Microcart/Microcart.vue');
const Consultation = () => import(/* webpackChunkName: "vsf-consultation" */ 'theme/components/core/blocks/Consultation/Consultation.vue');

export default {
  data() {
    return {
      Microcart,
      Consultation
    }
  },
  metaInfo: Head,
  components: {
    MinimalHeader,
    MinimalFooter,
    Overlay,
    CreditModal,
    AsyncSidebar,
    CityPicker
  },
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay,
      isMicrocartOpen: state => state.ui.microcart,
      isConsultationOpen: state => state.ui.consultation
    })
  },
  methods: {
    fetchMenuData() {
      return this.$store.dispatch('category-next/fetchMenuCategories', {
        level: config.entities.category.categoriesDynamicPrefetch && config.entities.category.categoriesDynamicPrefetchLevel >= 0
          ? config.entities.category.categoriesDynamicPrefetchLevel
          : null,
        skipCache: isServer
      });
    }
  },
  serverPrefetch() {
    return this.fetchMenuData();
  }
}
</script>

<style lang="scss" src="theme/css/main.scss">

</style>
