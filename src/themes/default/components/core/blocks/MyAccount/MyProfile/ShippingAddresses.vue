<template>
  <div class="shipping-addresses">
    <account-header
      :icon="DeliveryIcon"
      :isEdited.sync="isEdited"
      :editable="isEditable"
      :title="$t('Delivery address')"
    />
    <div class="profile-data">
      <div class="no-addresses" v-if="!user.addresses.length">
        <div class="add-address">
          <span class="profile-item-name"></span>
          <span class="no-addresses-text">{{ $t('you dont have saved addresses') }}</span>
          <button-text @click.native="addAddress()" class="add-address">{{ $t('add address') }}</button-text>
        </div>
      </div>
      <div class="profile-data-item" v-show="user.addresses.length" v-for="(address, index) in user && user.addresses" :key="index">
        <span class="profile-item-name">
          {{ $t('address') }} №{{index +  1}}
          <span v-if="address.default_shipping">({{   $t('main') }})</span>
        </span>
        <div class="profile-item-data" v-if="!isEdited">
          <span class="profile-item-data" v-if="userData && userData.addresses && userData.addresses.length">{{ userData.addresses[index].city }}, {{ userData.addresses[index].street[0] }}, {{ $t('house.') }} {{ userData.addresses[index].extension_attributes.extra_address_info.building_number}}, {{ $t('appartNumber') }} {{ userData.addresses[index].extension_attributes.extra_address_info.apartment_number }}</span>
        </div>
        <div class="profile-item-data" v-else>
          <div class="profile-item-inputs">
            <div class="profile-item-inputs-top">
              <autocomplete
                class="search-autocomplete profile-input"
                :selectedValue="address.city"
                :placeholder="$t('Choose your city') + ' *'"
                :search="getCities"
                :options="cities"
                :index="index"
                :clearable="false"
                @submit="onCitySelect($event)"
                :blur="$v.user.addresses.$each[index].city.$touch"
                :isError="$v.user.addresses.$each[index].city.$dirty && $v.user.addresses.$each[index].city.$error"
                :validations="[
                  {
                    condition: !$v.user.addresses.$each[index].city.required && $v.user.addresses.$each[index].city.$dirty,
                    text: $t('Field is required')
                  }
                ]"
              />
              <autocomplete
                @submit="onStreetSelect($event)"
                :search="getStreets(index)"
                :selectedValue="address.street && address.street[0]"
                :options="streets"
                label="Description"
                :index="index"
                :disabled="!address.city"
                :clearable="false"
                :placeholder="$t('Choose your street') + ' *'"
                class="search-autocomplete profile-input"
                :blur="$v.user.addresses.$each[index].street.$touch"
                :isError="$v.user.addresses.$each[index].street.$dirty && $v.user.addresses.$each[index].street.$error"
                :validations="[
                  {
                    condition: $v.user.addresses.$each[index].street.$error && !$v.user.addresses.$each[index].street.required,
                    text: $t('Field is required')
                  }
                ]"
              />
            </div>
            <div class="profile-item-inputs-bottom">
              <base-input
                type="text"
                :value="address.extension_attributes.extra_address_info.building_number"
                @input="changeHouseNumber($event, index)"
                :placeholder="$t('house') + ' *'"
                class="profile-input house"
                :class="{'error': $v.user.addresses.$each[index].extension_attributes.extra_address_info.building_number.$dirty && $v.user.addresses.$each[index].extension_attributes.extra_address_info.building_number.$error}"
                @blur="$v.user.addresses.$each[index].extension_attributes.extra_address_info.building_number.$touch()"
                :validations="[
                  {
                    condition: $v.user.addresses.$each[index].extension_attributes.extra_address_info.building_number.$error && !$v.user.addresses.$each[index].extension_attributes.extra_address_info.building_number.required,
                    text: $t('Field is required')
                  }
                ]"
              />
              <base-input
                type="text"
                :value="address.extension_attributes.extra_address_info.apartment_number"
                @input="changeAppartmentNumber($event, index)"
                :placeholder="$t('apparment') + ' *'"
                class="profile-input appartment"
                :class="{'error': $v.user.addresses.$each[index].extension_attributes.extra_address_info.apartment_number.$dirty && $v.user.addresses.$each[index].extension_attributes.extra_address_info.apartment_number.$error}"
                @blur="$v.user.addresses.$each[index].extension_attributes.extra_address_info.apartment_number.$touch()"
                :validations="[
                  {
                    condition: $v.user.addresses.$each[index].extension_attributes.extra_address_info.apartment_number.$error && !$v.user.addresses.$each[index].extension_attributes.extra_address_info.apartment_number.required,
                    text: $t('Field is required')
                  }
                ]"
              />
            </div>
          </div>
        </div>
        <div class="address-actions" v-if="isEdited">
          <div class="remove-address">
            <button-text @click.native="removeAddress(index)">{{ $t('remove address') }}</button-text>
          </div>
          <div class="address-default">
            <div class="address-default" v-if="address.default_shipping">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.0013 0.666687C4.4013 0.666687 0.667969 4.40002 0.667969 9.00002C0.667969 13.6 4.4013 17.3334 9.0013 17.3334C13.6013 17.3334 17.3346 13.6 17.3346 9.00002C17.3346 4.40002 13.6013 0.666687 9.0013 0.666687ZM6.74297 12.575L3.7513 9.58335C3.4263 9.25835 3.4263 8.73335 3.7513 8.40835C4.0763 8.08335 4.6013 8.08335 4.9263 8.40835L7.33464 10.8084L13.068 5.07502C13.393 4.75002 13.918 4.75002 14.243 5.07502C14.568 5.40002 14.568 5.92502 14.243 6.25002L11.0805 9.41252L7.91797 12.575C7.6013 12.9 6.74297 12.575 6.74297 12.575Z" fill="#23BE20"/>
              </svg>
              <span>{{ $t('default address') }}</span>
            </div>
            <button-text @click.native="setDefaultAddress(index)" v-else >{{ $t('use by default') }}</button-text>
          </div>
        </div>
      </div>
    </div>
    <div class="shipping-addresses-actions" v-if="isEdited">
      <div class="add-address">
        <span class="profile-item-name"></span>
        <button-text @click.native="addAddress()">{{ $t('add address') }}</button-text>
      </div>
      <div class="profile-data-actions">
        <span class="profile-item-name"></span>
        <button-full @click.native="updateAddress()">{{ $t('To apply') }}</button-full>
        <button-text @click.native="changeEdit()">{{ $t('undo') }}</button-text>
      </div>
    </div>
  </div>
</template>

<script>

import AccountHeader from 'theme/components/core/blocks/MyAccount/AccountHeader'  
import { DeliveryIcon } from 'theme/assets/account/index';
import { mapState } from 'vuex';
import cloneDeep from 'lodash-es/cloneDeep'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import ButtonText from 'theme/components/theme/ButtonText'
import Autocomplete from 'theme/components/core/blocks/Form/Autocomplete'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    AccountHeader,
    ButtonFull,
    ButtonText,
    BaseInput,
    Autocomplete
  },
  data: () => ({
    DeliveryIcon,
    isEdited: false,
    user: {
      addresses: []
    }
  }),
  validations: {
    user: {
      addresses: {
        $each: {
          city: {
            required
          },
          street: {
            required
          },
          extension_attributes: {
            extra_address_info: {
              building_number: {
                required
              },
              apartment_number: {
                required
              }
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      userData: (state) => state.user.current,
      cities: (state) => state.checkoutPage.cities,
      streets: (state) => state.checkoutPage.streets
    }),
    isEditable() {
      return !!(this.user && this.user.addresses && this.user.addresses.length)
    },
    address() {
      return {
        street: null,
        default_shipping: false,
        firstname: this.userData.firstname,
        lastname: this.userData.lastname,
        postcode: '12345',
        country_id: 'UA',
        telephone: '123',
        city: null,
        extension_attributes: {
          extra_address_info: {
            building_number: null,
            apartment_number: null,
            city_ref_number: null,
            street_ref_number: null
          }
        },
        custom_attributes: []
      }
    }
  },
  mounted: function() {
    this.copyUser()
  },
  methods: {
    async updateAddress() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        const res = await this.$store.dispatch('user/update', { customer: {...this.userData, ...this.user} })
        if (res.resultCode === 200) {
          this.$store.dispatch('user/setCurrentUser', res.result, { root: true })
          this.isEdited = false
          // this.spawnNotification()
        }
      }
    },
    changeEdit() {
      this.isEdited = !this.isEdited
      this.copyUser()
    },
    copyUser() {
      this.user = cloneDeep(this.userData)
    },
    setDefaultAddress(index) {
      const defaultAddress = this.user.addresses.find(it => it.default_shipping)
      if (defaultAddress) {
        this.$set(defaultAddress, 'default_shipping', false)
      }
      this.$set(this.user.addresses[index], 'default_shipping', true)
    },
    async removeAddress(index) {
      const address = this.user.addresses[index]
      this.user.addresses.splice(index, 1)
  
      if (address.default_shipping && this.user.addresses[0]) { // set default shipping to first element when removed default shipping 
        this.$set(this.user.addresses[0], 'default_shipping', true)
      }

      if (!this.user.addresses.length) {
        this.isEdited = false
      }

      const res =  await this.$store.dispatch('user/update', { customer: {...this.userData, ...this.user} })
      if (res.resultCode === 200) {
        this.$store.dispatch('user/setCurrentUser', res.result, { root: true })
        this.remoteAddressNotification()
      }
    },
    remoteAddressNotification() {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: this.$i18n.t('Address deleted successfully'),
        action1: { label: this.$i18n.t('OK') }
      }, { root: true })
    },
    addAddress() {
      this.isEdited = true;
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        this.resetValidation()
        if (!this.user.addresses.length) {
          this.user.addresses.push({ ...this.address, default_shipping: true })
        } else {
          this.user.addresses.push(this.address)
        }
      }
    },
    getCities(query) {
      if (query && query.trim() && query.length >= 2) {
        this.$store.dispatch('checkoutPage/getCities', { city: query })
      }
    },
    getStreets(index) {
      return (query) => {
        if (query && query.trim() && query.length >= 2) {
          this.$store.dispatch('checkoutPage/getStreetsByCity', { city: this.user.addresses[index].city, street: query })
        }
      }
    },
    onCitySelect(result) {
      this.$set(this.user.addresses, result.index, {
        ...this.user.addresses[result.index],
        city: result.value
      })
      
      this.$set(this.user.addresses, result.index, {
        ...this.user.addresses[result.index],
        street: null
      })
      
      this.$store.commit('checkoutPage/SET_CITIES', [])
      this.resetValidation()
    },
    onStreetSelect(result) {
      this.$set(this.user.addresses, result.index, {
        ...this.user.addresses[result.index],
        street: [result.value.Description]
      })

      this.$set(this.user.addresses, result.index, {
        ...this.user.addresses[result.index],
        extension_attributes: {
          extra_address_info: {
            ...this.user.addresses[result.index].extension_attributes.extra_address_info,
            city_ref_number: result.value.CityRef,
            street_ref_number: result.value.Ref
          }
        }
      })

      this.user.addresses[result.index].custom_attributes.push({
        attribute_code: 'city_ref_number',
        value: result.value.CityRef
      }, {
        attribute_code: 'street_ref_number',
        value: result.value.Ref
      })
      
      this.$store.commit('checkoutPage/SET_STREETS', [])
    },
    changeHouseNumber(event, index) {
      this.$set(this.user.addresses, index, {
        ...this.user.addresses[index],
        extension_attributes: {
          extra_address_info: {
            ...this.user.addresses[index].extension_attributes.extra_address_info,
            building_number: event
          }
        }
      })
      this.user.addresses[index].custom_attributes.push({
        attribute_code: 'building_number',
        value: event
      })
    },
    changeAppartmentNumber(event, index) {
      this.$set(this.user.addresses, index, {
        ...this.user.addresses[index],
        extension_attributes: {
          extra_address_info: {
            ...this.user.addresses[index].extension_attributes.extra_address_info,
            apartment_number: event
          }
        }
      })
      this.user.addresses[index].custom_attributes.push({
        attribute_code: 'apartment_number',
        value: event
      })
    },
    resetValidation() {
      this.$nextTick(() => {
        this.$v.$reset()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.profile-item-data {
  max-width: 316px;
  width: 100%;
  margin-right: 32px;
}

.profile-input {
  max-width: 100%;
  margin-bottom: 20px;
  min-width: 105px;

  &.appartment,
  &.house {
    margin-bottom: 0;
  }
}

.address-actions {
  border-left: 1px solid #E0E0E0;
  padding-left: 16px;
}

.profile-item-inputs-bottom {
  display: flex;
  column-gap: 20px;
}

.address-actions {
  .button-text {
    margin-bottom: 16px;
  }
}

.address-default {
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 12px;
  }

  span {
    white-space: nowrap;
    font-family: DIN Pro;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #5F5E5E;
  }
}

.add-address {
  display: flex;
  align-items: baseline;
  padding: 8px 16px 16px 16px;

  .button-text ::v-deep {
    padding: 0;

    span {
      color: #23BE20;
      font-weight: 600;
      border-bottom-color: #23be20;
    }

    &:hover {
      border-bottom-color: transparent;
    } 
  }
}

.no-addresses {
  .no-addresses-text {
    font-family: DIN Pro;
    font-size: 15px;
    line-height: 16px;
    color: rgba(95, 94, 94, 0.6);
  }

  .button-text {
    white-space: nowrap;
    margin-left: auto;
  }
}


@media (max-width: 1000px) {
  .profile-data-item {
    flex-direction: column;
  }

  .profile-item-data {
    max-width: 100%;
    margin-right: 0;
  }

  .profile-item-data {
    order: 1;
  }

  .profile-item-name {
    margin-bottom: 16px;
  }

  .address-actions {
    margin-bottom: 24px;
  }

  .add-address,
  .profile-data-actions {
    .profile-item-name {
      display: none;
    }
  }

  .profile-input {
    margin-bottom: 16px;
  }
}

</style>