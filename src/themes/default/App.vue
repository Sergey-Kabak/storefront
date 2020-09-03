<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'src/themes/default/assets/fonts/stylesheet.css';

const DefaultLayout = () => import(/* webpackChunkName: "vsf-layout-default" */ './layouts/Default')
const EmptyLayout = () => import(/* webpackChunkName: "vsf-layout-empty" */ './layouts/Empty')
const MinimalLayout = () => import(/* webpackChunkName: "vsf-layout-minimal" */ './layouts/Minimal')

export default {
  data () {
    return {
      ordersData: []
    }
  },
  created(){
    function isEdge () {
      return window.navigator.userAgent.indexOf('Edge') > -1 
    }

    if (isEdge) {
      Array.prototype.flat = function () {
        return this.reduce(function (flat, toFlatten) {
          return flat.concat(Array.isArray(toFlatten) ? toFlatten.flat() : toFlatten);
        }, []);
      }
    }
  },
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay
    }),
    layout () {
      return `${(this.$route.meta.layout || 'default')}-layout`
    }
  },
  components: {
    DefaultLayout,
    EmptyLayout,
    MinimalLayout
  }
}
</script>

<style lang="sass">
  .main-green-color
    &:hover
      background-color: transparent !important
      color: #23BE20
</style>
