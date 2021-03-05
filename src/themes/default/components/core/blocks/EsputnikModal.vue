<template>
  <modal name="modal-esputnik" class="modal-esputnik">
    <div class="banner">
      <div class="close-modal" @click="close()">
        <svg class="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="#1A1919" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
        </svg>
      </div>
      <img src="/assets/esputnik-modal/flower.png" alt="esputnik-promo" class="promo-image">
      <div class="banner__content">
        <div class="banner__heading">Новинки, скидки и лучшие предложения для вас</div>
        <div class="banner__text">Подписывайся, чтобы всегда быть в курсе!</div>
        <div class="banner__actions">
          <base-input
            type="email"
            name="email"
            containerClass="banner__input"
            autocomplete="email"
            v-model="email"
            focus
            :placeholder="$t('E-mail address *')"
          ></base-input>
          <button-full @click.native="confirmSubscription" class="subscribe-button" :aria-label="$t('Registrate')">
            Подписаться
          </button-full>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from "theme/components/core/Modal.vue";
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';

export default {
  data() {
    return {
      email: ''
    }
  },
  components: {
    Modal,
    BaseInput,
    ButtonFull
  },
  methods: {
    close() {
      this.$bus.$emit('modal-hide', 'modal-main')
    },
    confirmSubscription() {
      debugger;
      const sendEventForToken = (pushToken) => {
        debugger;
        es('sendEvent', 'confirm', pushToken, { email: this.email});
      }
      es('getPushToken', sendEventForToken.bind);
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
    padding: 24px 193px 0 24px;
  }
  &__heading {
    font-family: DIN Pro;
    font-size: 24px;
    line-height: 32px;
    color: #1A1919;
    margin-bottom: 16px;
    font-weight: 700;
  }
  &__text {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 15px;
    line-height: 24px;
    color: #5F5E5E;
    margin-bottom: 32px;
  }
  &__actions {
    display: flex;

  }
  &__input {
    margin-right: 16px;
    flex: 0 0 316px;
  }
  &__subscribe-button {
    width: 100%;
  }
}

img {
  width: 100%;
}
.subscribe-button {
  padding: 8px 32px;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 15px;
  line-height: 24px;
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
  }

  .close-modal {
    top: 0;
    right: 0;
    border-radius: 0;
  }
}
</style>
