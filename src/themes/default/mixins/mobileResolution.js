export default {
  data () {
    return {
      isMobile: false
    }
  },
  mounted () {
    this.watchResolution();
    window.onresize = () => {
      this.watchResolution();
    }
  },
  methods: {
    watchResolution () {
      window.innerWidth <= 576 ? this.isMobile = true : this.isMobile = false;
    }
  }
}
