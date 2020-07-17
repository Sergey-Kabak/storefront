<script>
// import moment from 'moment'
import Product from '../../../themes/default/components/core/blocks/Checkout/Product'
import InfoPopup from '@vue-storefront/theme-default/components/theme/blocks/InfoPopup/InfoPopup'
import { mapGetters } from 'vuex'
import { BDropdown, BDropdownItem } from 'bootstrap-vue'
import DroppointActionButton from '../../droppoint-shipping/components/DroppointActionButton.vue'
import { isServer } from '@vue-storefront/core/helpers'

export default {
  components: {Product, InfoPopup, BDropdown, BDropdownItem, DroppointActionButton},
  name: 'AvailabilitySheet',
  props: {
    id: {
      type: String,
      default: null
    },
    stockId: {
      type: Number,
      default: null
    },
    item: {
      type: Object,
      default: null
    },
    checked: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    hideProducts: {
      type: Boolean,
      required: false,
      default: false
    },
    hideActions: {
      type: Boolean,
      required: false,
      default: false
    },
    items: {
      required: true,
      type: Array
    },
    missing: {
      required: true,
      type: Array
    },
    products: {
      required: true,
      type: Array
    },
    isFavorite: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      size: 30,
      opened: false,
      selected: '',
      missingLng: 0,
      productsInCart: this.$store.state.cart.cartItems
    }
  },
  computed: {
    ...mapGetters({
      totals: 'cart/totals'
    }),
    cBtnText () {
      return this.opened ? `${this.$t('Close up')}` : `${this.$t('Check availability')}`
    }
  },
  methods: {
    showDD () {
      this.$bus.$emit('zoom', this.item.id)
    },
    handleResize (val) {
      this.size = (val.target.innerWidth < 400) ? 20 : 30
    },
    cProductName (product) {
      return (product.name.length > this.size) ? product.name.substring(0, this.size) + ' ...' : product.name
    },
    thumbnail (image) {
      return this.getThumbnail(image, 40, 40)
    },
    hidden () {
      this.opened = false
    },
    toggle () {
      this.opened = !this.opened
    },
    filterData (item) {
      return this.item.missing.find(i => i.sku === item.sku)
    }
  },
  mounted () {
    if (!isServer) {
      this.size = (window.innerWidth < 400) ? 20 : 30
      window.addEventListener('resize', this.handleResize)
    }
  },
  beforeDestroy () {
    if (!isServer) window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    checked (val, old) {
      if (val !== this.selected) this.selected = val
    }
  }
}
</script>
