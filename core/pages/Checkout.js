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
      activeSection: {
        shipping: true,
        personalDetails: false,
        payment: false,
        orderReview: false
      },
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
      shippingDetails: state => state.checkout.shippingDetails,
      cPersonalDetails: state => state.checkout.personalDetails,
      shippingType: state => state.customShipping.type
    })
  },
  async beforeMount () {
    await this.$store.dispatch('cart/pullMethods', { forceServerSync: true, syncShipping: false })
    await this.$store.dispatch('checkout/load')
    this.$bus.$emit('checkout-after-load')
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
    this.$bus.$on('checkout-before-edit', this.onBeforeEdit)
    this.$bus.$on('order-after-placed', this.onAfterPlaceOrder)
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
    this.$bus.$off('checkout-before-edit', this.onBeforeEdit)
    this.$bus.$off('order-after-placed', this.onAfterPlaceOrder)
    this.$bus.$off('checkout-before-shippingMethods', this.onBeforeShippingMethods)
    this.$bus.$off('checkout-after-shippingMethodChanged', this.onAfterShippingMethodChanged)
    this.$bus.$off('checkout-after-validationError', this.focusField)
  },
  watch: {
    '$route': 'activateHashSection',
    'OnlineOnly': 'onNetworkStatusCheck'
  },
  methods: {
    onCartAfterUpdate (payload) {
      if (this.$store.state.cart.cartItems.length === 0) {
        this.notifyEmptyCart()
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
      this.confirmation = payload.confirmation
      if (this.$store.getters['themeCredit/getPartPaymentData']) {
        const result = await this.$store.dispatch('themeCredit/sendPartPayment', { orderNumber: payload.confirmation.orderNumber });
        if (result.state === 'SUCCESS') {
          await this.$store.dispatch('cart/clear', { sync: false }, { root: true })
          await this.$store.dispatch('user/getOrdersHistory', { refresh: true, useCache: true })
          location.href = 'https://payparts2.privatbank.ua/ipp/v2/payment?token=' + result.token
        }
      } else {
        this.$store.dispatch('checkout/setThankYouPage', true)
        this.$store.dispatch('cart/clear', { sync: false }, { root: true })
        this.$store.dispatch('user/getOrdersHistory', { refresh: true, useCache: true })
      }
      Logger.debug(payload.order)()
    },
    onBeforeEdit (section) {
      this.activateSection(section)
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
      this.activateSection('personalDetails')
      this.saveShippingDetails()

      const storeView = currentStoreView()
      storeView.tax.defaultCountry = this.shipping.country
    },
    onAfterPersonalDetails (receivedData, validationResult) {
      this.personalDetails = receivedData
      this.validationResults.personalDetails = validationResult

      if (this.isVirtualCart === true) {
        this.activateSection('payment')
      } else {
        this.activateSection('payment')
      }
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
    activateHashSection () {
      if (!isServer) {
        var urlStep = window.location.hash.replace('#', '')
        if (this.activeSection.hasOwnProperty(urlStep) && this.activeSection[urlStep] === false) {
          this.activateSection(urlStep)
        } else if (urlStep === '') {
          this.activateSection('personalDetails')
        }
      }
    },
    checkConnection (isOnline) {
      if (!isOnline) {
        this.notifyNoConnection()
      }
    },
    activateSection (sectionToActivate) {
      for (let section in this.activeSection) {
        this.activeSection[section] = false
      }
      this.activeSection[sectionToActivate] = true
      if (!isServer) window.location.href = window.location.origin + window.location.pathname + '#' + sectionToActivate
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
      const shippingMethods = {
        new_post: 'flatrate',
        shop: 'freeshipping',
        currier: 'flatrate'
      }
      this.order = {
        user_id: this.$store.state.user.current ? this.$store.state.user.current.id.toString() : '',
        cart_id: this.$store.state.cart.cartServerToken ? this.$store.state.cart.cartServerToken.toString() : '',
        products: this.$store.state.cart.cartItems.map(it => {
          delete it.attributes_metadata
          return it
        }),
        addressInformation: {
          billingAddress: {
            region: this.payment.state,
            region_id: this.payment.region_id ? this.payment.region_id : 0,
            country_id: this.payment.country,
            street: [this.payment.streetAddress, this.payment.apartmentNumber],
            company: this.payment.company,
            telephone: unmask(this.payment.phoneNumber, '+38(###)###-##-##'),
            postcode: this.payment.zipCode || '69068',
            city: this.payment.city,
            firstname: this.payment.firstName,
            lastname: this.payment.lastName,
            email: this.personalDetails.emailAddress,
            region_code: this.payment.region_code ? this.payment.region_code : '',
            vat_id: this.payment.taxId
          },
          shipping_method_code: shippingMethods[this.shippingType], // this.shippingMethod.method_code ? this.shippingMethod.method_code : this.shipping.shippingMethod,
          shipping_carrier_code: shippingMethods[this.shippingType], // this.shippingMethod.carrier_code ? this.shippingMethod.carrier_code : this.shipping.shippingCarrier,
          payment_method_code: this.getPaymentMethod(),
          payment_method_additional: this.payment.paymentMethodAdditional,
          shippingExtraFields: this.shipping.extraFields
        }
      }
      if (!this.isVirtualCart) {
        this.order.addressInformation.shippingAddress = {
          region: this.payment.state,
          region_id: this.payment.region_id ? this.payment.region_id : 0,
          country_id: this.payment.country,
          street: [this.payment.streetAddress, this.payment.apartmentNumber],
          company: '',
          telephone: this.payment.phoneNumber,
          postcode: this.payment.zipCode || '69068',
          city: this.payment.city,
          firstname: this.payment.firstName,
          lastname: this.payment.lastName,
          email: this.personalDetails.emailAddress,
          region_code: this.payment.region_code ? this.payment.region_code : ''
        }
      }
      if (this.order.addressInformation.payment_method_code === 'credit') {
        this.order.addressInformation.payment_method_additional = { ...this.$store.state.themeCredit.creditDetails }
        this.order.addressInformation.payment_method_additional['credit_id'] = this.$store.state.themeCredit.selectedCredit.credit_id
        this.order.addressInformation.payment_method_additional['terms'] = this.$store.state.themeCredit.selectedCredit.terms
      }
      if (this.shipping.deliveryType === 'new_post') {
        this.order.addressInformation['shippingExtraFields'] = {
          warehouse_id: this.shipping.location.id,
          carrier: 'nova-poshta'
        };
      }
      if (this.order.addressInformation.payment_method_code === 'credit' && +this.$store.getters['themeCredit/getSelectedCredit'].liqpay_allowed) {
        this.order.addressInformation.payment_method_code = 'temabit_payparts'
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
        this.activateSection('personalDetails')
        this.focusedField = fieldName
      }
      if (fieldName === 'email-address') {
        window.scrollTo(0, 0)
        this.activateSection('personalDetails')
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
      if (context) context.server.response.redirect(localizedRoute('/'))
      resolve()
    })
  }
}
