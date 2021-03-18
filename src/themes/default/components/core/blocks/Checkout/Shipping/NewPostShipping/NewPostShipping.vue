<template>
  <div class="new-post">
    <shipping-autocomplete
      :options="getNewPostDepartments"
      :value="value"
      @change="onChange($event)"
      @select="onSelect($event)"
      :selected="newPostShipping"
      :resultValue="resultValue"
      class="autocomplete"
      :placeholder="$t('Number or address of New Post')"
    />
    <div class="new-post-bottom">
      <div class="schedule" v-if="schedule">
        <svg class="schedule-icon" width="20" height="20" viewBox="0 0 20 20" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.99199 1.6665C5.39199 1.6665 1.66699 5.39984 1.66699 9.99984C1.66699 14.5998 5.39199 18.3332 9.99199 18.3332C14.6003 18.3332 18.3337 14.5998 18.3337 9.99984C18.3337 5.39984 14.6003 1.6665 9.99199 1.6665ZM10.0003 16.6665C6.31699 16.6665 3.33366 13.6832 3.33366 9.99984C3.33366 6.3165 6.31699 3.33317 10.0003 3.33317C13.6837 3.33317 16.667 6.3165 16.667 9.99984C16.667 13.6832 13.6837 16.6665 10.0003 16.6665ZM10.417 5.83317H9.16699V10.8332L13.542 13.4582L14.167 12.4332L10.417 10.2082V5.83317Z" />
        </svg>
        <div class="schedule-text">{{ schedule }}</div>
      </div>
      <button-full class="submit" @click.native="activateNewPost()">{{ $t("Pick up here") }}</button-full>
    </div>
  </div>
</template>

<script>
import ShippingAutocomplete from 'theme/components/core/blocks/Checkout/Shipping/ShippingAutocomplete'
import ButtonFull from 'theme/components/theme/ButtonFull'
import { mapState } from 'vuex'

export default {
  components: {
    ShippingAutocomplete,
    ButtonFull
  },
  data: () => ({
    value: null
  }),
  computed: {
    ...mapState({
      city: (state) => state.ui.city,
      newPostShipping: (state) => state.checkoutPage.newPostShipping,
      newPostDepartments: (state) => state.checkoutPage.newPostDepartments
    }),
    schedule() {
      if (this.newPostShipping.Schedule) {
        const { Monday, Saturday, Sunday } = this.newPostShipping.Schedule
        return this.$t('schedule', { Monday, Saturday, Sunday})
      }
    }
  },
  mounted() {
    this.$store.dispatch('checkoutPage/getNewPostDepartments', { city: this.city })
  },
  methods: {
    getNewPostDepartments(query) {
      this.value = query
      return this.newPostDepartments.filter(it => {
        return it.Description.toLowerCase().includes(query.toLowerCase())
      })
    },
    onChange(value) {
      this.query = value
    },
    onSelect(newPostShipping) {
      this.$store.commit('checkoutPage/SET_SELECTED_NEW_POST_SHIPPING', newPostShipping)
    },
    activateNewPost() {
      this.$emit('onSelectShipping')
    },
    resultValue(it) {
      return it.Description
    }
  }
}
</script>

<style lang="scss" scoped>
.new-post {
  padding: 16px 32px 0 32px;
}

.autocomplete {
  margin-bottom: 32px;
}

.new-post-bottom {
  display: flex;
  margin-bottom: 16px;
}

.submit {
  max-width: 195px;
  margin-left: auto;
}

.schedule {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.schedule-text {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 20px;
  color: #5F5E5E;
}

.schedule-icon {
  min-width: 20px;
  min-height: 20px;
  margin-right: 12px;
}

@media  (max-width: 576px) {
  .new-post {
    padding: 0 16px;
  }

  .new-post-bottom {
    flex-direction: column;
  }

  .schedule {
    margin-bottom: 24px;
  }

  .autocomplete {
    margin-bottom: 24px;
  }

  .button-full {
    max-width: 100%;
  }
}
</style>