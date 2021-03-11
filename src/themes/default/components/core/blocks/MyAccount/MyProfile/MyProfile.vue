<template>
  <div class="profile">
    <personal-data />
    <!-- <contacts class="profile-item" /> -->
    <shipping-addresses class="profile-item" />
    <!-- <socials class="profile-item" /> -->
    <logout class="profile-item" />
  </div>
</template>

<script>

import PersonalData from 'theme/components/core/blocks/MyAccount/MyProfile/PersonalData'
import Contacts from 'theme/components/core/blocks/MyAccount/MyProfile/Contacts'
import ShippingAddresses from 'theme/components/core/blocks/MyAccount/MyProfile/ShippingAddresses'
import Socials from 'theme/components/core/blocks/MyAccount/MyProfile/Socials'
import Logout from 'theme/components/core/blocks/MyAccount/MyProfile/Logout'

export default {
  components: {
    PersonalData,
    Contacts,
    ShippingAddresses,
    Socials,
    Logout
  }
}
</script>
