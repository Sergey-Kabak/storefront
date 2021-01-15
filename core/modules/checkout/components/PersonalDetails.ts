import { mapState, mapGetters } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'

export const PersonalDetails = {
  name: 'PersonalDetails',
  props: {
    focusedField: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      isFilled: false,
      personalDetails: this.$store.state.checkout.personalDetails,
      shipping: this.$store.state.checkout.shippingDetails,
      createAccount: false,
      acceptConditions: true,
      password: '123',
      rPassword: '',
      isValidationError: false
    }
  },
  computed: {
    ...mapState({
      currentUser: (state: RootState) => state.user.current,
      shippingDetails: (state: RootState) => state.checkout.shippingDetails
    }),
    ...mapGetters({
      isVirtualCart: 'cart/isVirtualCart'
    })
  },
  methods: {
    onLoggedIn (receivedData) {
      this.personalDetails = {
        firstName: receivedData.firstname,
        lastName: receivedData.lastname,
        emailAddress: receivedData.email
      }
    },
    sendDataToCheckout () {
      this.$store.dispatch('checkout/saveShippingDetails',
        {
          ...this.shippingDetails,
          firstName: this.personalDetails.firstName,
          lastName: this.personalDetails.lastName,
          phoneNumber: this.personalDetails.phoneNumber,
        })
      // delete this.personalDetails.phoneNumber;
      this.$bus.$emit('checkout-after-personalDetails', this.personalDetails, this.$v)
      this.isFilled = true
      this.isValidationError = false
    },
    onCheckoutLoad () {
      this.personalDetails = this.$store.state.checkout.personalDetails
    }
  },
  beforeMount () {
    this.$bus.$on('checkout-after-load', this.onCheckoutLoad)
    this.$bus.$on('user-after-loggedin', this.onLoggedIn)
  },
  beforeDestroy () {
    this.$bus.$off('checkout-after-load', this.onCheckoutLoad)
    this.$bus.$off('user-after-loggedin', this.onLoggedIn)
  }
}
