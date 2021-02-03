<template>
  <div class="personal-details-wrapper">
    <personal-details-active v-if="personalDetailsStatus === 'active'"/>
    <personal-details-selected v-if="personalDetailsStatus === 'selected'"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import personalDetailsActive from 'theme/components/core/blocks/Checkout/PersonalDetails/PersonalDetailsActive'
import personalDetailsSelected from 'theme/components/core/blocks/Checkout/PersonalDetails/PersonalDetailsSelected'

export default {
  components: {
    personalDetailsActive,
    personalDetailsSelected
  },
  computed: {
    ...mapState({
      personalDetailsStatus: (state) => state.checkoutPage.personalDetailsStatus
    })
  }
}
</script>

<style lang="scss" scoped>
.personal-details-wrapper {
  padding: 16px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
}
</style>
