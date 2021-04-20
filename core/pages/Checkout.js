import i18n from '@vue-storefront/i18n';
import config from 'config';
import VueOfflineMixin from 'vue-offline/mixin';
import {
  mapGetters,
  mapState
} from 'vuex';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import Composite from '@vue-storefront/core/mixins/composite';
import {
  currentStoreView,
  localizedRoute
} from '@vue-storefront/core/lib/multistore';
import { isServer, onlineHelper } from '@vue-storefront/core/helpers';
import { Logger } from '@vue-storefront/core/lib/logger';
import { unmask } from 'theme/helpers';
import GTM from 'theme/mixins/GTM/dataLayer'

export default {
  name: 'Checkout',
  mixins: [Composite, VueOfflineMixin, GTM],
  data () {
    return {
      stockCheckCompleted: false,
      stockCheckOK: false,
      confirmation: null, // order confirmation from server
      order: {},
      personalDetails: {},
      shipping: {},
      shippingMethod: {},
      payment: {},
      orderReview: {},
      cartSummary: {},
      validationResults: {
        personalDetails: { $invalid: true },
        shipping: { $invalid: true },
        payment: { $invalid: true }
      },
      focusedField: null
    }
  },
  computed: {
    ...mapGetters({
      isVirtualCart: 'cart/isVirtualCart',
      isThankYouPage: 'checkout/isThankYouPage',
      totals: 'cart/getTotals'
    }),
    ...mapState({
      selectedShipping: (state) => state.checkoutPage.selectedShipping,
      selectedPayment: (state) => state.checkoutPage.selectedPayment,
      courierShipping: (state) => state.checkoutPage.courierShipping,
      shopShipping: (state) => state.checkoutPage.shopShipping,
      newPostShipping: (state) => state.checkoutPage.newPostShipping,
      justinShipping: (state) => state.checkoutPage.justinShipping,
      city: (state) => state.ui.city,
      shippingDetails: state => state.checkout.shippingDetails,
      cPersonalDetails: state => state.checkout.personalDetails,
      shippingType: state => state.customShipping.type,
      cartServerToken: (state) => state.cart.cartServerToken
    })
  },
  async beforeMount () {
    await this.$store.dispatch('checkout/load')
    await this.$store.dispatch('checkoutPage/init')
    this.$bus.$emit('checkout-after-load')
    await this.$store.dispatch('cart/pullMethods', { forceServerSync: true, syncShipping: false })
    this.$store.dispatch('checkout/setModifiedAt', Date.now())
    // TODO: Use one event with name as apram
    this.$bus.$on('cart-after-update', this.onCartAfterUpdate)
    this.$bus.$on('cart-after-delete', this.onCartAfterUpdate)
    this.$bus.$on('checkout-after-personalDetails', this.onAfterPersonalDetails)
    this.$bus.$on('checkout-after-shippingDetails', this.onAfterShippingDetails)
    this.$bus.$on('checkout-after-paymentDetails', this.onAfterPaymentDetails)
    this.$bus.$on('checkout-after-cartSummary', this.onAfterCartSummary)
    this.$bus.$on('checkout-before-placeOrder', this.onBeforePlaceOrder)
    this.$bus.$on('checkout-do-placeOrder', this.onDoPlaceOrder)
    this.$bus.$on('order-after-placed', this.onAfterPlaceOrder) // unsubscribe when payment method -liqpay
    this.$bus.$on('checkout-before-shippingMethods', this.onBeforeShippingMethods)
    this.$bus.$on('checkout-after-shippingMethodChanged', this.onAfterShippingMethodChanged)
    this.$bus.$on('checkout-after-validationError', this.focusField)
    if (!this.isThankYouPage) {
      this.$store.dispatch('cart/load', { forceClientState: true }).then(() => {
        if (this.$store.state.cart.cartItems.length === 0) {
          this.notifyEmptyCart()
          this.$router.push(this.localizedRoute('/'))
        } else {
          this.stockCheckCompleted = false
          const checkPromises = []
          for (let product of this.$store.state.cart.cartItems) { // check the results of online stock check
            if (product.onlineStockCheckid) {
              checkPromises.push(new Promise((resolve, reject) => {
                StorageManager.get('syncTasks').getItem(product.onlineStockCheckid, (err, item) => {
                  if (err || !item) {
                    if (err) Logger.error(err)()
                    resolve(null)
                  } else {
                    product.stock = item.result
                    resolve(product)
                  }
                })
              }))
            }
          }
          Promise.all(checkPromises).then((checkedProducts) => {
            this.stockCheckCompleted = true
            this.stockCheckOK = true
            for (let chp of checkedProducts) {
              if (chp && chp.stock) {
                if (!chp.stock.is_in_stock) {
                  this.stockCheckOK = false
                  chp.errors.stock = i18n.t('Out of stock!')
                  this.notifyOutStock(chp)
                }
              }
            }
          })
        }
      })
    }
    const storeView = currentStoreView()
    let country = this.$store.state.checkout.shippingDetails.country
    if (!country) country = storeView.i18n.defaultCountry
    this.$bus.$emit('checkout-before-shippingMethods', country)
    this.personalDetails = this.cPersonalDetails
    // await this.$store.dispatch('themeCredit/fetchBanksCheckout', this.$store.state.cart.cartServerToken);
  },
  beforeDestroy () {
    this.$store.dispatch('checkout/setModifiedAt', 0) // exit checkout
    this.$bus.$off('cart-after-update', this.onCartAfterUpdate)
    this.$bus.$off('cart-after-delete', this.onCartAfterUpdate)
    this.$bus.$off('checkout-after-personalDetails', this.onAfterPersonalDetails)
    this.$bus.$off('checkout-after-shippingDetails', this.onAfterShippingDetails)
    this.$bus.$off('checkout-after-paymentDetails', this.onAfterPaymentDetails)
    this.$bus.$off('checkout-after-cartSummary', this.onAfterCartSummary)
    this.$bus.$off('checkout-before-placeOrder', this.onBeforePlaceOrder)
    this.$bus.$off('checkout-do-placeOrder', this.onDoPlaceOrder)
    this.$bus.$off('order-after-placed', this.onAfterPlaceOrder)
    this.$bus.$off('checkout-before-shippingMethods', this.onBeforeShippingMethods)
    this.$bus.$off('checkout-after-shippingMethodChanged', this.onAfterShippingMethodChanged)
    this.$bus.$off('checkout-after-validationError', this.focusField)
  },
  watch: {
    'OnlineOnly': 'onNetworkStatusCheck'
  },
  methods: {
    onCartAfterUpdate (payload) {
      if (this.$store.state.cart.cartItems.length === 0) {
        // this.notifyEmptyCart()
        this.$store.commit('ui/setMicrocart', false)
        this.$router.push(this.localizedRoute('/'))
      }
    },
    async onAfterShippingMethodChanged (payload) {
      await this.$store.dispatch('cart/syncTotals', { forceServerSync: true, methodsData: payload })
      this.shippingMethod = payload
    },
    onBeforeShippingMethods (country) {
      this.$store.dispatch('checkout/updatePropValue', ['country', country])
      this.$store.dispatch('cart/syncTotals', { forceServerSync: true })
      this.$forceUpdate()
    },
    async onAfterPlaceOrder (payload) {
      await this.GTM_TRANSACTION({ id: payload.confirmation.orderNumber, revenue: this.totals.find(it => it.code === 'grand_total').value, products: payload.order.products })
      if (['liqpaymagento_liqpay', 'temabit_payparts'].includes(payload.order.addressInformation.payment_method_code)) return
      this.$router.push({ path: this.localizedRoute('/thank-you-page'), query: { cartId: this.cartServerToken } })
      this.confirmation = payload.confirmation
      this.$store.dispatch('user/getOrdersHistory', { refresh: true, useCache: true })
      Logger.debug(payload.order)()
    },
    onBeforePlaceOrder (payload) {

    },
    onAfterCartSummary (receivedData) {
      this.cartSummary = receivedData
    },
    onDoPlaceOrder (additionalPayload) {
      if (onlineHelper.isOnline) {
        if (this.$store.state.cart.cartItems.length === 0) {
          this.notifyEmptyCart()
          this.$router.push(this.localizedRoute('/'))
        } else {
          this.payment.paymentMethodAdditional = additionalPayload
          this.placeOrder()
        }
      }
    },
    onAfterPaymentDetails (receivedData, validationResult) {
      this.payment = receivedData
      this.validationResults.payment = validationResult
      this.savePaymentDetails()
      // setTimeout(() => {
      //   this.$bus.$emit('checkout-before-placeOrder')
      // })
    },
    onAfterShippingDetails (receivedData, validationResult) {
      this.shipping = receivedData
      this.validationResults.shipping = validationResult
      this.saveShippingDetails()

      const storeView = currentStoreView()
      storeView.tax.defaultCountry = this.shipping.country
    },
    onAfterPersonalDetails (receivedData, validationResult) {
      this.personalDetails = receivedData
      this.validationResults.personalDetails = validationResult

      this.savePersonalDetails()
      this.focusedField = null
    },
    onNetworkStatusCheck (isOnline) {
      this.checkConnection(isOnline)
    },
    checkStocks () {
      let isValid = true
      for (let child of this.$children) {
        if (child.hasOwnProperty('$v')) {
          if (child.$v.$invalid) {
            // Check if child component is Personal Details.
            // If so, then ignore validation of account creation fields.
            // if (child.$v.hasOwnProperty('personalDetails')) {
            //   if (child.$v.personalDetails.$invalid) {
            //     isValid = false
            //     break
            //   }
            // } else {
            //   isValid = false
            //   break
            // }
            break
          }
        }
      }

      if (typeof navigator !== 'undefined' && navigator.onLine) {
        if (this.stockCheckCompleted) {
          if (!this.stockCheckOK) {
            isValid = false
            this.notifyNotAvailable()
          }
        } else {
          this.notifyStockCheck()
          isValid = false
        }
      }
      return isValid
    },
    checkConnection (isOnline) {
      if (!isOnline) {
        this.notifyNoConnection()
      }
    },
    // This method checks if there exists a mapping of chosen payment method to one of Magento's payment methods.
    getPaymentMethod () {
      let paymentMethod = this.payment.paymentMethod
      if (config.orders.payment_methods_mapping.hasOwnProperty(paymentMethod)) {
        paymentMethod = config.orders.payment_methods_mapping[paymentMethod]
      }
      return paymentMethod
    },
    prepareOrder () {
      this.order = {
        user_id: this.$store.state.user.current ? this.$store.state.user.current.id.toString() : '',
        cart_id: this.$store.state.cart.cartServerToken ? this.$store.state.cart.cartServerToken.toString() : '',
        products: this.$store.state.cart.cartItems.map(it => {
          delete it.attributes_metadata
          return it
        }),
        addressInformation: {
          billingAddress: {
            region: '',
            region_id: 0,
            country_id: 'UA',
            company: this.payment.company,
            telephone: unmask(this.personalDetails.phoneNumber, '+38(###)###-##-##'),
            city: this.city,
            firstname: this.personalDetails.firstName,
            lastname: this.personalDetails.lastName,
            email: this.personalDetails.emailAddress,
            region_code: this.payment.region_code ? this.payment.region_code : '',
            vat_id: this.payment.taxId
          },
          shippingAddress: {
            region: '',
            region_id: 0,
            country_id: 'UA',
            company: '',
            telephone: unmask(this.personalDetails.phoneNumber, '+38(###)###-##-##'),
            city: this.city,
            firstname: this.personalDetails.firstName,
            lastname: this.personalDetails.lastName,
            email: this.personalDetails.emailAddress,
            region_code: ''
          },
          shippingExtraFields: {},
          shipping_method_code: this.selectedShipping.method_code,
          shipping_carrier_code: this.selectedShipping.carrier_code,
          payment_method_code: this.selectedPayment.code,
          payment_method_additional: this.payment.paymentMethodAdditional
        }
      }

      const billingAddress = this.order.addressInformation.billingAddress
      const shippingAddress = this.order.addressInformation.shippingAddress
      const extensionAttributes = this.order.addressInformation.shippingExtraFields

      if (this.selectedShipping.method_code === 'freeshipping') {
        shippingAddress.postcode = billingAddress.postcode = this.shopShipping.source_code
        shippingAddress.street = billingAddress.street = [this.shopShipping.street]
      }

      if (this.selectedShipping.method_code === 'nova_poshta_to_warehouse') {
        extensionAttributes.nova_poshta_warehouse_ref = this.newPostShipping.Ref
        extensionAttributes.nova_poshta_city_ref = this.newPostShipping.CityRef
        shippingAddress.street = billingAddress.street = [this.newPostShipping.Description]
        shippingAddress.postcode = billingAddress.postcode = 69068
      }

      if (this.selectedShipping.method_code === 'justin_to_department') {
        extensionAttributes.justin_department_uuid = this.justinShipping.uuid
        extensionAttributes.justin_city_uuid = this.justinShipping.city_uuid
        shippingAddress.street = billingAddress.street = [this.justinShipping.address_ua]
        shippingAddress.postcode = billingAddress.postcode = 69068
      }

      if (this.selectedShipping.method_code === 'nova_poshta_to_door') {
        extensionAttributes.nova_poshta_city_ref = this.courierShipping.address.CityRef
        extensionAttributes.nova_poshta_street_ref = this.courierShipping.address.Ref
        extensionAttributes.nova_poshta_building_number = this.courierShipping.house
        extensionAttributes.nova_poshta_flat = this.courierShipping.apartmentNumber
        shippingAddress.postcode = billingAddress.postcode = 69068
        shippingAddress.street = billingAddress.street = [`${this.courierShipping.address.Description}, ${this.courierShipping.house}, ${this.courierShipping.apartmentNumber}`]
      }
      if (['credit', 'temabit_payparts'].includes(this.order.addressInformation.payment_method_code)) {
        this.order.addressInformation.payment_method_additional = { ...this.$store.state.themeCredit.creditDetails }
        this.order.addressInformation.payment_method_additional['credit_id'] = this.$store.state.themeCredit.selectedCredit.credit_id
        this.order.addressInformation.payment_method_additional['terms'] = this.$store.state.themeCredit.selectedCredit.terms
        this.order.addressInformation.payment_method_additional['bank_id'] = this.$store.state.themeCredit.selectedBank.id
      }
      if (this.$store.state.themeCredit.selectedBank.bank_code === 'monobank') {
        this.order.addressInformation.payment_method_code = 'monobank'
      }
      return this.order
    },
    placeOrder () {
      this.checkConnection({ online: typeof navigator !== 'undefined' ? navigator.onLine : true })
      if (this.checkStocks()) {
        this.GTM_PAYMENT(this.$t(this.getPaymentMethod()))
        this.$store.dispatch('checkout/placeOrder', { order: this.prepareOrder() })
      } else {
        this.notifyNotAvailable()
      }
    },
    savePersonalDetails () {
      this.GTM_CONTACT_DATA()
      this.$store.dispatch('checkout/savePersonalDetails', this.personalDetails)
    },
    saveShippingDetails () {
      this.GTM_DELIVERY(this.$t(this.shipping.deliveryType) + ' - ' + this.shipping.streetAddress)
      this.$store.dispatch('checkout/saveShippingDetails', this.shipping)
    },
    savePaymentDetails () {
      this.$store.dispatch('checkout/savePaymentDetails', this.payment)
    },
    focusField (fieldName) {
      if (fieldName === 'password') {
        window.scrollTo(0, 0)
        this.focusedField = fieldName
      }
      if (fieldName === 'email-address') {
        window.scrollTo(0, 0)
        this.focusedField = fieldName
      }
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('Checkout'),
      meta: this.$route.meta.description ? [{ vmid: 'description', name: 'description', content: this.$route.meta.description }] : []
    }
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      if (context) context.output.cacheTags.add(`checkout`)
      // if (context) context.server.response.redirect(localizedRoute('/'))
      resolve()
    })
  }
}
