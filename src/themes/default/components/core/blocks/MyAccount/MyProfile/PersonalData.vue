<template>
  <div class="personal-data-wrapper">
    <h2 class="account-page-title">{{ $t($route.name) }}</h2>
    <div class="personal-data profile-item">
      <account-header
        :icon="AccountCorrectIcon"
        :isEdited.sync="isEdited"
        :title="$t('personal data')"
      />
      <div class="profile-data">
        <div class="profile-data-item">
          <span class="profile-item-name">{{ $t('ФИО') }}</span>
          <span class="profile-item-data" v-if="!isEdited">{{ userData && userData.firstname }} {{ userData && userData.lastname }} {{ userData && userData.middlename }}</span>
          <div class="profile-item-data" v-else>
            <base-input
              type="text"
              v-model.trim="user.lastname"
              :placeholder="$t('Last name')"
              class="profile-input"
              :class="{ error: $v.user.lastname.$error && $v.user.lastname.$dirty }"
              @blur="$v.user.lastname.$touch()"
              :validations="[{
                  condition: $v.user.lastname.$error && !$v.user.lastname.required && $v.user.lastname.$dirty,
                  text: $t('Field is required')
                }, {
                  condition: !$v.user.lastname.minLength && $v.user.lastname.$dirty,
                  text: $t('Name must have at least 2 letters.')
                }, {
                  condition: !$v.user.lastname.lettersOnly && $v.user.lastname.$dirty,
                  text: $t('Accepts only alphabet characters.')
              }]"
            />
            <base-input
              type="text"
              name="first-name"
              v-model.trim="user.firstname"
              :placeholder="$t('First name')"
              class="profile-input"
              :class="{ error: $v.user.firstname.$error && $v.user.firstname.$dirty }"
              @blur="$v.user.firstname.$touch()"
              :validations="[{
                  condition: $v.user.firstname.$error && !$v.user.firstname.required && $v.user.firstname.$dirty,
                  text: $t('Field is required')
                }, {
                  condition: !$v.user.firstname.minLength && $v.user.firstname.$dirty,
                  text: $t('Name must have at least 2 letters.')
                }, {
                  condition: !$v.user.firstname.lettersOnly && $v.user.firstname.$dirty,
                  text: $t('Accepts only alphabet characters.')
              }]"
            />
            <base-input
              type="text"
              v-model="user.middlename"
              :placeholder="$t('surname')"
              class="profile-input last-name"
              :class="{ error: $v.user.middlename.$error && $v.user.middlename.$dirty }"
              @blur="$v.user.middlename.$touch()"
              :validations="[{
                  condition: !$v.user.middlename.minLength && $v.user.middlename.$dirty,
                  text: $t('Name must have at least 2 letters.')
                }, {
                  condition: !$v.user.middlename.lettersOnly && $v.user.middlename.$dirty,
                  text: $t('Accepts only alphabet characters.')
              }]"
            />
          </div>
        </div>
        <div class="profile-data-item">
          <span class="profile-item-name">{{ $t('birthday') }}</span>
          <span class="profile-item-data" v-if="!isEdited">{{ formattedUserBirthday }}</span>
          <div class="profile-item-data" v-else>
            <base-datepicker
              v-model="userDob"
              class="date-picker"
            />
          </div>
        </div>
        <div class="profile-data-item">
          <span class="profile-item-name">{{ $t('gender') }}</span>
          <span class="profile-item-data" v-if="!isEdited">{{ getUserGender(userData && userData.gender) }}</span>
          <div class="profile-item-data" v-else>
            <div class="radio-buttons">
              <base-radio-button name="gender" id="male" value="1" v-model.number="user.gender" > {{ $t('male') }} </base-radio-button>
              <base-radio-button name="gender" id="female" value="2" v-model.number="user.gender"> {{ $t('female') }} </base-radio-button>
            </div>
          </div>
        </div>
        <div class="profile-data-item">
        <span class="profile-item-name">{{ $t('contacts') }}</span>
        <span class="profile-item-data" v-if="!isEdited">{{ userData && userData.email }}, {{ userData && userData.custom_attributes && userData.custom_attributes.find(it => it.attribute_code === 'telephone').value }}</span>
        <div class="profile-item-data" v-else>
          <base-input
            class="profile-input"
            type="tel"
            name="phone-number"
            v-mask="'+38(###)###-##-##'"
            :placeholder="$t('Phone Number *')"
            v-model.trim="telephone"
            autocomplete="tel"
            @blur="$v.telephone.$touch()"
            :class="{ error: $v.telephone.$error && $v.telephone.$dirty }"
            :validations="[{
              condition: $v.telephone.$error && !$v.telephone.required && $v.telephone.$dirty,
              text: $t('Field is required')
            },{
              condition: !$v.telephone.isPhone && $v.telephone.$error && $v.telephone.$dirty,
              text: $t('Please provide valid phone number')
            }]"
          />
          <base-input
            type="text"
            v-model="user.email"
            disabled
            :placeholder="$t('E-mail')"
            class="profile-input"
          />
        </div>
      </div>
        <div class="profile-data-actions" v-if="isEdited">
          <span class="profile-item-name"></span>
          <button-full @click.native="updateUser()">{{ $t('save') }}</button-full>
          <button-text @click.native="changeEdit()">{{ $t('Cancel') }}</button-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from 'theme/components/theme/IconBase';
import AccountHeader from 'theme/components/core/blocks/MyAccount/AccountHeader'  
import BaseInput from 'theme/components/core/blocks/Form/BaseInput';
import BaseDatepicker from 'theme/components/core/blocks/Form/BaseDatepicker';
import BaseRadioButton from 'theme/components/core/blocks/Form/BaseRadiobutton.vue'
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import ButtonText from 'theme/components/theme/ButtonText'

import { AccountCorrectIcon, CalendarIcon } from 'theme/assets/account/index';
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex';
import cloneDeep from 'lodash-es/cloneDeep'
import { mask } from 'vue-the-mask'


const lettersOnly = value => value ? /^[А-Яа-яЁёЇїІіЄєҐґ]?[А-Яа-яЁёЇїІіЄєҐґ\'\-]+[А-Яа-яЁёЇїІіЄєҐґ]+$/.test(value) : !value
  
const isPhone = value => value ? /\+38\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/.test(value) : !value

export default {
  components: {
    AccountHeader,
    BaseInput,
    IconBase,
    CalendarIcon,
    BaseRadioButton,
    ButtonFull,
    ButtonText,
    BaseDatepicker
  },
  directives: { mask },
  validations: {
    user: {
      firstname: {
        required,
        lettersOnly,
        minLength: minLength(2)
      },
      lastname: {
        required,
        lettersOnly,
        minLength: minLength(2)
      },
      middlename: {
        lettersOnly,
        minLength: minLength(2)
      },
      email: {
        required,
        email
      }
    },
    telephone: {
      required,
      isPhone
    }
  },
  data: () => ({
    AccountCorrectIcon,
    isEdited: false,
    user: {}
  }),
  computed: {
    ...mapState({
      userData: (state) => state.user.current
    }),
    telephone: {
      get() {
        const phone = this.user.custom_attributes.find(it => it.attribute_code === 'telephone') 
        return phone.value
      },
      set(telephone) {
        const index = this.user.custom_attributes.findIndex(it => it.attribute_code === 'telephone') 
        this.$set(this.user.custom_attributes, index, {
          ...this.user.custom_attributes[index],
          value: telephone
        })
      }
    },
    userDob: {
      get() {
        return this.user.dob && new Date(this.user.dob)
      },
      set(date) {
        this.$set(this.user, 'dob', date)
      }
    },
    formattedUserBirthday() {
      return this.userData && this.userData.dob ? this.$d(new Date(this.userData.dob), 'short') : this.$t('not specified')
    },
    currentLang() {
      return {
        'uk-UA': {
          monthFormat: 'MMMM'
        },
        'ru-RU': {
          monthFormat: 'MMMM'
        },
        'en-US': 'en'
      }[this.$i18n.locale]
    }
  },
  mounted: function() {
    this.copyUser()
    eS('sendEvent', 'CustomerData', {
      'CustomerData': {
        'user_email': this.userData.email,
        'user_name': `${this.userData.firstname} ${this.userData.lastname}`,
        'user_client_id': this.userData.id,
        'user_phone': this.telephone
      }
    });
  },
  methods: {
    changeEdit() {
      this.isEdited = !this.isEdited
      this.copyUser()
    },
    async updateUser() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        const res = await this.$store.dispatch('user/update', { customer: this.prepareUser({...this.userData, ...this.user}) })
        if (res.resultCode === 200) {
          this.$store.dispatch('user/setCurrentUser', res.result, { root: true })
          this.isEdited = false
          this.spawnNotification()
        }
      }
    },
    copyUser() {
      this.user = cloneDeep(this.userData)
    },
    spawnNotification() {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: this.$i18n.t('Account data has successfully been updated'),
        action1: { label: this.$i18n.t('OK') }
      }, { root: true })
    },
    prepareUser(user) {
      return {
        ...user,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        middlename: user.middlename,
        gender: +user.gender,
        phoneNumber: user.phoneNumber,
        dob: user.dob && new Date(user.dob).toLocaleDateString()
      }
    },
    getUserGender(gender) {
      return {
          '1': this.$t('male'),
          '2': this.$t('female')
        }[gender] || this.$t('not specified')
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-item-data {
  max-width: 316px;
}

.profile-input {
  margin-bottom: 20px;

  &.last-name {
    margin-bottom: 0;
  }
}

.date-picker {
  width: 100%;
}

.radio-buttons {
  display: flex;
  align-items: center;

  .radio-button {
    border: none;
    margin-right: 32px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.profile-input {
  max-width: 100%;
  min-width: 105px;

  &::v-deep {
    input {
      height: 40px;
    }
  }
}

.radio-buttons ::v-deep {
  .radio-label {
    font-family: DIN Pro;
    font-size: 15px;
    line-height: 24px;
    color: #1A1919;
  }
}

@media (max-width: 1000px) {
  .profile-item-name {
    margin-bottom: 16px;
  }

  .profile-item-data {
    max-width: 100%;
  }

  .profile-data-item {
    flex-direction: column;
  }
}
</style>