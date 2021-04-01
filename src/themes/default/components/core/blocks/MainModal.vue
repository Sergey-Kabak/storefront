<template>
  <modal name="modal-main" class="modal-main">
    <div class="banner">
      <div class="close-modal" @click="close()">
        <svg class="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="#1A1919" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
        </svg>
      </div>
      <picture class="flex">
        <source srcset="/assets/banners/popup_banner_mobile.png" media="(max-width: 768px)">
        <source srcset="/assets/banners/popup_banner.png">
        <img src="/assets/banners/popup_banner.png" alt="promo" class="promo-image">
      </picture>
    </div>
  </modal>
</template>

<script>
import Modal from "theme/components/core/Modal.vue";

export default {
  components: {
    Modal
  },
  methods: {
    close() {
      this.$bus.$emit('modal-hide', 'modal-main')
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  max-width: 533px;
  width: 100%;
  margin: 0 16px;
  box-shadow: 0 0px 15px -4px #3a3a3a;
  border-radius: 4px;
  overflow: hidden;
}

img {
  width: 100%;
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
  background: rgba(255, 255, 255, 0.5);

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
