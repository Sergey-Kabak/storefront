export default {
  data () {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      resolution: null
    }
  },
  mounted () {
    this.onResolutionChange()
    window.addEventListener('resize', this.onResolutionChange)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResolutionChange)
  },
  methods: {
    onResolutionChange () {
      this.resolution = window.innerWidth
      this.reset()
      if (this.resolution <= 576) {
        this.isMobile = true
      } else if (this.resolution <= 768) {
        this.isTablet = true
      } else {
        this.isDesktop = true
      }
    },
    reset () {
      this.isMobile = this.isTablet = this.isDesktop = false;
    }
  }
}
