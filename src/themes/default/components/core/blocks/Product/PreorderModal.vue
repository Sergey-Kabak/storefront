<template>
  <modal name="modal-preorder" class="modal-preorder" :width="533" @close="$v.$reset()">
    <div class="preorder-modal-header">
      <div class="title">{{$t('To preorder') }}</div>
      <svg @click="close()" class="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
      </svg>
    </div>
    <form class="preorder-form">
      <base-input
        class="preorder-input"
        :class="{ error: $v.preorderData.name.$error && $v.preorderData.name.$dirty }"
        type="text"
        name="first-name"
        :placeholder="$t('First name')"
        v-model.trim="preorderData.name"
        @blur="$v.preorderData.name.$touch()"
        autocomplete="given-name"
        :validations="[
          {
            condition: $v.preorderData.name.$error && !$v.preorderData.name.required && $v.preorderData.name.$dirty,
            text: $t('Field is required')
          },
          {
            condition: !$v.preorderData.name.minLength && $v.preorderData.name.$dirty,
            text: $t('Name must have at least 2 letters.')
          }
        ]"
      />
      <base-input
        class="preorder-input"
        type="tel"
        name="phone-number"
        v-mask="'+38(###)###-##-##'"
        @blur="$v.preorderData.phoneNumber.$touch()"
        :placeholder="$t('Phone Number')"
        v-model.trim="preorderData.phoneNumber"
        autocomplete="tel"
        :class="{ error: $v.preorderData.phoneNumber.$error && $v.preorderData.phoneNumber.$dirty }"
        :validations="[
          {
            condition: $v.preorderData.phoneNumber.$error && !$v.preorderData.phoneNumber.required && $v.preorderData.phoneNumber.$dirty,
            text: $t('Field is required')
          },
          {
            condition: !$v.preorderData.phoneNumber.isPhone && $v.preorderData.phoneNumber.$error && $v.preorderData.phoneNumber.$dirty,
            text: $t('Please provide valid phone number')
          }
        ]"
      />
      <base-input
        class="preorder-input"
        type="email"
        name="email-address"
        :placeholder="$t('Email address')"
        v-model="preorderData.email"
        @blur="$v.preorderData.email.$touch()"
        autocomplete="email"
        @keyup.enter="sendDataToCheckout"
        :class="{ error: $v.preorderData.email.$error && $v.preorderData.email.$dirty }"
        :validations="[
          {
            condition: $v.preorderData.email.$error && !$v.preorderData.email.required && $v.preorderData.email.$dirty,
            text: $t('Field is required')
          },
          {
            condition: !$v.preorderData.email.email && $v.preorderData.email.$error && $v.preorderData.email.$dirty,
            text: $t('Please provide valid e-mail address.')
          }
        ]"
      />
      <base-textarea 
        class="preorder-input"
        type="text"
        v-model="preorderData.comment"
        :placeholder="$t('comment')"
      />
      <button-full class="preorder-submit" @click.native="submitPreorderForm()">{{ $t('Send') }}</button-full>
    </form>
  </modal>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import Modal from 'theme/components/core/Modal.vue'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea'
import ButtonFull from 'theme/components/theme/ButtonFull'
import { mask } from 'vue-the-mask'
import { isPhone } from 'theme/helpers/regular-expressions'
import { mapGetters, mapState } from 'vuex'

export default {
  components: {
    Modal,
    BaseInput,
    BaseTextarea,
    ButtonFull
  },
  directives: {
    mask
  },
  validations: {
    preorderData: {
      name: {
        required,
        minLength: minLength(2)
      },
      phoneNumber: {
        required,
        isPhone
      },
      email: {
        required,
        email
      }
    }
  },
  data: () => ({
    preorderData: {
      name: null,
      phoneNumber: null,
      email: null,
      comment: ''
    }
  }),
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct',
    }),
    ...mapState({
      user: state => state.user.current
    })
  },
  mounted () {
    const phoneNumber = this.user && this.user.custom_attributes && this.user.custom_attributes.find(it => it.attribute_code === 'telephone')
    this.preorderData = {
      ...this.preorderData,
      name: this.user && this.user.firstname,
      email: this.user && this.user.email,
      phoneNumber: phoneNumber && phoneNumber.value 
    }
  },
  methods: {
    close() {
      this.$bus.$emit("modal-hide", "modal-preorder");
    },
    async submitPreorderForm() {
      if (this.$v.preorderData.$invalid) {
        this.$v.preorderData.$touch()
      } else {
        this.close()
        const resultCode = await this.$store.dispatch('product/preorder', {
          ...this.preorderData,
          id: this.getCurrentProduct.id
        })
        if (resultCode === 200) {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'success',
            message: this.$t('Preorder successfully completed!'),
            action1: { label: this.$t('OK') }
          })
        }
        console.log(resp)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.preorder-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border-bottom: 1px solid #E0E0E0;
}

.close-icon {
  cursor: pointer;

  &:hover {
    fill: #aeaeae;
  }

  &:active {
    fill: #9f9f9f;
  }
}

.title {
  font-family: DIN Pro;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
}

.preorder-form {
  padding: 24px;
}

.base-input.preorder-input {
  max-width: 100%;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 32px;
  }
}

.preorder-submit.button-full {
  max-width: 100%;
}
</style>
