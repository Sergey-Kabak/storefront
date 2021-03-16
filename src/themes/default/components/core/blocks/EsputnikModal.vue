<template>
  <modal name="modal-esputnik" class="modal-esputnik">
    <div class="banner">
      <div class="close-modal" @click="close">
        <svg class="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="#1A1919" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
        </svg>
      </div>
      <picture class="promo-image">
        <source srcset="/assets/esputnik-modal/flower_mobile.png" media="(max-width: 768px)">
        <source srcset="/assets/esputnik-modal/flower.png">
        <img src="/assets/esputnik-modal/flower.png" alt="esputnik-promo" class="promo-image">
      </picture>
      <div class="banner__content">
        <template v-if="subscribed">
          <div class="banner__heading">
            <svg class="banner__heading-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.9993 2.66656C8.63935 2.66656 2.66602 8.6399 2.66602 15.9999C2.66602 23.3599 8.63935 29.3332 15.9993 29.3332C23.3594 29.3332 29.3327 23.3599 29.3327 15.9999C29.3327 8.6399 23.3594 2.66656 15.9993 2.66656ZM13.3327 22.6666L6.66602 15.9999L8.54602 14.1199L13.3327 18.8932L23.4527 8.77323L25.3327 10.6666L13.3327 22.6666Z" fill="#23BE20"/>
            </svg>
            <div class="banner__heading-text">{{ $t('Thank!') }}</div>
          </div>
          <div class="banner__text">{{ $t('you have subscribed') }}</div>
        </template>
        <template v-else-if="requestSent">
          <div class="banner__heading">
            <svg class="banner__heading-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.9993 2.66656C8.63935 2.66656 2.66602 8.6399 2.66602 15.9999C2.66602 23.3599 8.63935 29.3332 15.9993 29.3332C23.3594 29.3332 29.3327 23.3599 29.3327 15.9999C29.3327 8.6399 23.3594 2.66656 15.9993 2.66656ZM13.3327 22.6666L6.66602 15.9999L8.54602 14.1199L13.3327 18.8932L23.4527 8.77323L25.3327 10.6666L13.3327 22.6666Z" fill="#23BE20"/>
            </svg>
            <div class="banner__heading-text">{{ $t('Thank!') }}</div>
          </div>
          <div class="banner__text">{{ $tc('check your email and confirm {email}', email) }}</div>
        </template>
        <template v-else>
          <div class="banner__heading">{{ $t('new features and propositions') }}</div>
          <div class="banner__text">{{ $t('subscribe details') }}</div>
          <div class="banner__actions">
            <base-input
              type="email"
              name="email"
              containerClass="banner__input"
              autocomplete="email"
              v-model="email"
              @blur="$v.email.$touch()"
              focus
              :placeholder="$t('E-mail address *')"
              :validations="[
                {
                  condition: !$v.email.required && $v.email.$error,
                  text: $t('Field is required.')
                },
                {
                  condition: !$v.email.email && $v.email.$error,
                  text: $t('Please provide valid e-mail address.')
                }
              ]"
            ></base-input>
            <button-full :disabled="$v.$dirty && $v.$error" @click.native="confirmSubscription" class="subscribe-button" :aria-label="$t('Registrate')">
              {{ $t("let's subscribe") }}
            </button-full>
          </div>
        </template>
      </div>
    </div>
  </modal>
</template>

<script>
import {currentStoreView, localizedRoute} from '@vue-storefront/core/lib/multistore';
import Modal from "theme/components/core/Modal.vue";
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import { EsputnikService } from 'theme/services/EsputnikService.ts'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: '',
      requestSent: false,
      subscribed: false
    }
  },
  components: {
    Modal,
    BaseInput,
    ButtonFull
  },
  methods: {
    close() {
      this.$bus.$emit('modal-hide', 'modal-esputnik')
      this.$router.push(localizedRoute('/', currentStoreView().storeCode))
    },
    showWarning() {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('Please fix the validation errors'),
        action1: { label: this.$t('OK') }
      })
    },
    confirmSubscription() {
      this.$v.$touch();
      if (this.$v.$error) {
        this.showWarning();
      }
      EsputnikService.subscribe({ email: this.email}).then(v => {
        this.requestSent = true;
        // sessionStorage.setItem('esputnik-subscribe-modal', false)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(v) {
        if (v.query.subscribed) {
          this.subscribed = true;
        }
        console.log(v)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  max-width: 533px;
  width: 100%;
  box-shadow: 0 0px 15px -4px #3a3a3a;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    padding: 24px 93px 0 24px;

    @media only screen and (max-width: 768px) {
      padding: 16px 16px 0 16px;
    }
  }

  /* HEADINGS */
  &__heading {
    font-family: DIN Pro;
    font-size: 24px;
    line-height: 32px;
    color: #1A1919;
    margin-bottom: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;

    @media only screen and (max-width: 768px) {
      font-size: 22px;
      line-height: 28px;
      margin-bottom: 12px;
    }
  }

  &__heading-icon {
    margin-right: 16px;
  }
  /* TEXT */
  &__text {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 15px;
    line-height: 24px;
    color: #5F5E5E;
    margin-bottom: 32px;

    @media only screen and (max-width: 768px) {
      margin-bottom: 24px;
    }
  }
  &__actions {
    display: flex;
    
    @media only screen and (max-width: 768px) {
      flex-direction: column;
    }
  }
  &__input {
    margin-right: 16px;
    flex: 0 0 316px;
    
    @media only screen and (max-width: 768px) {
      margin-right: 0;
      margin-bottom: 16px;
      flex: unset;
      max-width: unset;
      width: 1;
    }

  }
  &__subscribe-button {
    width: 100%;
  }
}

img {
  width: 100%;
  height: 100%;
}
.subscribe-button {
  padding: 8px 32px;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 15px;
  line-height: 24px;

  @media only screen and (max-width: 768px) {
    max-width: unset;
  }
}
::v-deep {
  .modal-container {
    display: flex;
    justify-content: center;
    width: 100%!important;
    max-width: fit-content!important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: auto;
    
  }
}

.close-modal {
  cursor: pointer;
  z-index: 1;
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  padding: 8px;
  border-radius: 4px;
  background: #F9F9F9;
  &:hover {
    .close-icon {
      fill: #EE2C39;
    }
  }
}

.close-icon {
  transition: .2s ease-in-out;
}

@media (max-width: 768px) {
  .banner {
    max-width: 382px;
    height: 400
  }

  .close-modal {
    top: 0;
    right: 0;
    border-radius: 0;
  }
}
</style>
