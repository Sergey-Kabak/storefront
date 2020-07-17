<script>
import { dps } from 'src/modules/droppoint-shipping/components/droppoints'
import { mapGetters } from 'vuex'
import NoSSR from 'vue-no-ssr'

export default {
  components: {
    'no-ssr': NoSSR
  },
  props: {
    items: {
      required: true,
      type: Array
    },
    products: {
      required: true,
      type: Array
    },
    zipcode: {
      type: Number,
      default: null,
      required: false
    },
    hideProducts: {
      type: Boolean,
      default: false,
      required: false
    },
    isProduct: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      mob: false,
      error: '',
      extraFields: {},
      loading: false,
      showList: true,
      city: '',
      selected: '',
      cities: [],
      droppoints: [],
      center: {
        lat: 55.488351,
        lng: 9.479296
      },
      stockId: null,
      loadData: false,
      productsInCart: this.$store.state.cart.cartItems,
      isMobNavShow: true
    }
  },
  computed: {
    ...mapGetters({
      shipping: 'checkout/getShippingDetails'
    }),
    citiesOptions () {
      return this.cities.map(item => {
        return {
          value: item,
          label: item,
          text: item
        }
      })
    },
    check () {
      return !this.isProduct || !this.hideProducts
    },
    isOnline () {
      return typeof window !== 'undefined'
    }
  },
  beforeDestroy () {
    if (this.isOnline) window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    sendDataToCheckout () {
      this.$emit('sendDataToCheckout')
    },
    handleResize (val) {
      this.mob = !!(val.target.innerWidth < 991)
    },
    onFilterChanged (filter) {
      console.log(filter)
    },
    onNavClick (val) {
      this.showList = val
      if (this.showList) this.changeCity()
    },
    fetchDps () {
      dps.forEach(dp => {
        if (!this.cities.includes(dp.city)) {
          this.cities.push(dp.city)
        }
      })
      this.city = (this.shipping && this.shipping.city) || this.cities[0]
      this.selected = (this.shipping && (this.shipping.company || (this.shipping.droppoint && this.shipping.droppoint.id))) || ''
      this.setDroppoints(dps.filter(dp => dp.city === this.city))
    },
    // checked
    changeCity (city = this.city) {
      this.city = city
      this.setDroppoints(dps.filter(dp => dp.city === city))
    },
    async setDroppoints (droppoints) {
      this.droppoints = droppoints
      this.center = await droppoints[0].position
      this.stockId = droppoints[0].city_id || 2
      // if (this.items && this.items.length) this.getData()
      this.loadData = false
    },
    onScrollShowNav (value) {
      this.isMobNavShow = value
    }
  },
  mounted () {
    if (this.isOnline) {
      window.addEventListener('resize', this.handleResize)
      if (window.innerWidth < 991) this.mob = true
    }
    this.fetchDps()
  }
}
</script>
