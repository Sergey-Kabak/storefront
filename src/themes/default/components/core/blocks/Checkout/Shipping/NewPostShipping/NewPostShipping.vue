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
    })
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

.new-post-bottom {
  display: flex;
}

.submit {
  max-width: 195px;
  margin-left: auto;
  margin-bottom: 16px;
}

.autocomplete {
  margin-bottom: 32px;
}

@media  (max-width: 576px) {
  .new-post {
    padding: 0 16px;
  }

  .autocomplete {
    margin-bottom: 24px;
  }

  .button-full {
    max-width: 100%;
  }
}
</style>