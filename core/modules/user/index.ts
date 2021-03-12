import {userStore} from './store'
import {StorefrontModule} from '@vue-storefront/core/lib/modules'
import {StorageManager} from '@vue-storefront/core/lib/storage-manager'
import {isServer} from '@vue-storefront/core/helpers'
import {Logger} from '@vue-storefront/core/lib/logger'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import * as types from './store/mutation-types'

export const UserModule: StorefrontModule = async function ({ store }) {
  StorageManager.init('user')
  store.registerModule('user', userStore)
  if (!isServer) {
    EventBus.$on('user-before-logout', () => {
      store.dispatch('user/logout', { silent: false })
      // TODO: Move it to theme
      store.commit('ui/setSubmenu', {
        depth: 0
      })
    })

    EventBus.$on('user-after-loggedin', receivedData => {
      // TODO: Make independent of checkout module
      const telephone = receivedData.custom_attributes && receivedData.custom_attributes.find(it => it.attribute_code === 'telephone')
      const address = receivedData.addresses && receivedData.addresses.find(it => it.default_shipping)
  
      store.dispatch('checkout/savePersonalDetails', {
        firstName: receivedData.firstname,
        lastName: receivedData.lastname,
        emailAddress: receivedData.email,
        phoneNumber: telephone && telephone.value
      })

      if (address) {
        const { city_ref_number: CityRef, street_ref_number: Ref, apartment_number: apartmentNumber, building_number: house} = address.extension_attributes.extra_address_info

        store.commit('ui/setCity', address.city, { root: true })
        store.commit('checkoutPage/SET_COURIER_SHIPPING', {
          address: {
            Description: address.street[0],
            CityRef,
            Ref
          },
          apartmentNumber,
          house
        } , { root: true })
      }
    })

    store.dispatch('user/startSession')
  }

  store.subscribe((mutation, state) => {
    const type = mutation.type

    if (
      type.endsWith(types.USER_INFO_LOADED)
    ) {
      StorageManager.get('user').setItem('current-user', state.user.current).catch((reason) => {
        Logger.error(reason)() // it doesn't work on SSR
      }) // populate cache
    }

    if (
      type.endsWith(types.USER_ORDERS_HISTORY_LOADED)
    ) {
      StorageManager.get('user').setItem('orders-history', state.user.orders_history).catch((reason) => {
        Logger.error(reason)() // it doesn't work on SSR
      }) // populate cache
    }

    if (
      type.endsWith(types.USER_TOKEN_CHANGED)
    ) {
      StorageManager.get('user').setItem('current-token', state.user.token).catch((reason) => {
        Logger.error(reason)() // it doesn't work on SSR
      }) // populate cache
      if (state.user.refreshToken) {
        StorageManager.get('user').setItem('current-refresh-token', state.user.refreshToken).catch((reason) => {
          Logger.error(reason)() // it doesn't work on SSR
        }) // populate cache
      }
    }
  })
}
