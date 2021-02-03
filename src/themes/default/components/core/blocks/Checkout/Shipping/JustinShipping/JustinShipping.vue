<template>
  <div class="justin-post">
    <shipping-autocomplete
      :options="getJustinDepartments"
      :value="value"
      @change="onChange($event)"
      @select="onSelect($event)"
      :selected="justinShipping"
      :resultValue="resultValue"
      class="autocomplete"
    />
    <div class="justin-post-bottom">
      <button-full class="submit" @click.native="activeJustin()">{{ $t("Pick up here") }}</button-full>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ShippingAutocomplete from 'theme/components/core/blocks/Checkout/Shipping/ShippingAutocomplete'
import ButtonFull from 'theme/components/theme/ButtonFull'

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
      justinShipping: (state) => state.checkoutPage.justinShipping,
      justinDepartments: (state) => state.checkoutPage.justinDepartments
    })
  },
  mounted() {
    this.$store.dispatch('checkoutPage/getJustinDepartments', { city: this.city })
  },
  methods: {
    getJustinDepartments(query) {
      this.value = query
      return this.justinDepartments.filter(it => {
        return it.address_ua.toLowerCase().includes(query.toLowerCase())
      })
    },
    onChange(value) {
      this.value = value
    },
    onSelect(justinShipping) {
      this.$store.commit('checkoutPage/SET_SELECTED_JUSTIN', justinShipping)
    },
    activeJustin() {
      this.$emit('onSelectShipping')
    },
    resultValue(it) {
      return it.address_ua
    }
  }
}
</script>

<style lang="scss" scoped>
.justin-post {
  padding: 16px 32px 0 32px;
}

.justin-post-bottom {
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
  .justin-post {
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