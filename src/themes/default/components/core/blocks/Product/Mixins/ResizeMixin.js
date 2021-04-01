export default {
  data () {
    return {
      width: 992
    };
  },
  computed: {
    screenResolution () {
      const screenSize = {
        desktop: this.width >= 992,
        table: this.width >= 768 && this.width < 992,
        mobile: this.width < 768
      };
      return Object.keys(screenSize).find(s => !!screenSize[s]);
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      this.width = window.innerWidth;
      window.addEventListener('resize', this.resizeEvent);
    }
  },
  methods: {
    resizeEvent () {
      this.width = event.target.innerWidth;
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeEvent);
  }
};
