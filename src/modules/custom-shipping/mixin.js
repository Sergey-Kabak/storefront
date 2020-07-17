import { shop } from 'src/modules/locations/droppoints2';
import { mapGetters } from 'vuex';
import NewPost from 'src/modules/nova-poshta/index';

export default {
  mixins: [NewPost],
  props: ['city', 'type'],
  data () {
    return {
      apikey: 'AIzaSyBNfA38HlGRbKD4vL5_Y8el1dp0o8NC3Tc',
      mob: false,
      error: '',
      extraFields: {},
      shop: shop,
      currier: [],
      loading: false,
      showList: true,
      selected: '',
      cities: [],
      droppoints: [],
      center: {
        lat: 50.448089,
        lng: 30.529123
      },
      stockId: null,
      loadData: false,
      productsInCart: this.$store.state.cart.cartItems,
      isMobNavShow: true,
      currierAddress: {
        apartmentNumber: '',
        house: '',
        address: '',
        zipcode: ''
      },
      np_number: '',
      trigger: true
    }
  },
  computed: {
    ...mapGetters({
      shipping: 'checkout/getShippingDetails'
    }),
    check () {
      return !this.isProduct || !this.hideProducts
    },
    isOnline () {
      return typeof window !== 'undefined'
    },
    valid () {
      return !!(this.currierAddress.house && this.currierAddress.address && this.currierAddress.apartmentNumber && this.city)
    },
    cDroppoints () {
      return this.np_number ? this.droppoints.filter(dp => dp.number === this.np_number) : this.droppoints
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
      let dpsList = this[this.type];
      this[this.type].forEach(dp => {
        if (!this.cities.includes(dp.city)) {
          this.cities.push(dp.city)
        }
      })

      // this.city = (this.shipping && this.shipping.city) || this.cities[0]
      this.selected = (this.shipping && (this.shipping.company || (this.shipping.droppoint && this.shipping.droppoint.id))) || ''
      this.setDroppoints(this[this.type].filter(dp => dp.city === this.city))
    },
    // checked
    changeCity (city = this.city) {
      // this.city = city
      this.setDroppoints([this.type].filter(dp => dp.city === city))
    },
    async setDroppoints (droppoints) {
      this.droppoints = droppoints
      this.center = await droppoints[0].position
      this.loading = false
      // this.stockId = droppoints[0].city_id || 2
      // if (this.items && this.items.length) this.getData()
      // this.loadData = false
    },
    next () {
      if (!this.valid) return
      this.$bus.$emit('checked-location', {
        country: 'UA',
        streetname: `${this.currierAddress.address} ${this.currierAddress.house}`,
        streetname2: this.currierAddress.apartmentNumber || '.',
        apartmentNumber: this.currierAddress.apartmentNumber,
        city: this.city,
        state: '',
        region_id: 0,
        zipcode: this.currierAddress.zipcode || '69068',
        shopName: 'Доставка на дом'
      })
    }
  },
  mounted () {
    if (this.type === 'new_post') {
      this.loading = true
      this.getListByAddress(this.city);
    }
    if (this.type === 'shop') this.fetchDps()
  }
}
