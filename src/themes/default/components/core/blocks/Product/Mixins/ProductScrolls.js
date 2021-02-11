export default {
  methods: {
    scrollEvents () {
      const tabLineOffset = document.querySelector('.tab-underline').offsetTop;
      window.addEventListener(
        'scroll',
        () => {
          if (window.pageYOffset > tabLineOffset - 100) {
            this.$bus.$emit('top-header-blocked', true);
            this.fixedContent = true;
            this.carriagePosition(window.pageYOffset);
          } else {
            this.$bus.$emit('top-header-blocked', false);
            this.fixedContent = false;
          }
        },
        { passive: true }
      );
    },
    carriagePosition (top) {
      const carriageBlock = document.querySelector('.small-product');
      const carriageBlockHeight = carriageBlock.clientHeight;
      const tabBlock = document.querySelector('.tab-row');
      const tabBlockOffset = tabBlock.offsetTop;
      const tabBlockHeight = tabBlock.clientHeight;
      if (top >= tabBlockOffset + tabBlockHeight - carriageBlockHeight - 112) {
        this.absoluteContent = tabBlockOffset + tabBlockHeight - carriageBlockHeight;
      } else {
        this.absoluteContent = 112;
      }
    }
  }
}
