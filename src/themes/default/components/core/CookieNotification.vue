<template>
  <transition name="fade" appear>
    <div class="cookie" v-if="isOpen">
      <div class="v-container">
        <div class="cookie-message">
          <span>{{ this.$t('To give you the best shopping experience we') }}</span>
          <router-link class="cookie-link" :to="localizedRoute('/info/umovi-vikoristannja-sajtu')">{{ $t('use cookies.') }}</router-link>
        </div>
        <div 
          class="close-cookie"
          @click="accept"
          tabindex="0"
          @keyup.enter="accept"
        >
          <svg class="close-cookie-icon" width="24" height="24" viewBox="0 0 24 24" fill="#F6F7FA" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
          </svg>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    accept () {
      this.setVisited()
      this.isOpen = false
    },
    setVisited () {
      this.$store.dispatch('claims/set', { claimCode: 'cookiesAccepted', value: true })
    }
  },
  mounted () {
    this.$store.dispatch('claims/check', { claimCode: 'cookiesAccepted' }).then((cookieClaim) => {
      if (!cookieClaim) {
        this.isOpen = true
        this.$store.dispatch('claims/set', { claimCode: 'cookiesAccepted', value: false })
      } else {
        this.isOpen = !cookieClaim.value
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.v-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
}

.cookie {
  z-index: 2;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1A1919;
}

.cookie-message {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  span,
  .cookie-link {
    display: block;
    font-family: DIN Pro;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;

    &:first-child {
      margin-right: 5px;
    }
  }

  .cookie-link {
    text-decoration: underline;
  }
}

.close-cookie {
  cursor: pointer;
  display: flex;
  padding: 4px;
  border-radius: 4px;
  transition: .2s ease-in-out;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #313030;
  }
}

@media (max-width: 768px) {
  .cookie-message {
    span,
    .cookie-link {
      font-size: 13px;
    }
  }
}
</style>
