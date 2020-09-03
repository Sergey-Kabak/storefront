export default {
  computed: {
    isEdge () {
      if (typeof window !== 'undefined') return window.navigator.userAgent.indexOf('Edge') > -1
      return false;
    }
  },
  methods: {
    flattenDeep (arr1) {
      return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(this.flattenDeep(val)) : acc.concat(val), []);
    }
  }
}
