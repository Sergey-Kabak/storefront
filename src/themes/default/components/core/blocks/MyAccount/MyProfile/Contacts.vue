<template>
  <div class="сontacts-data">
    <account-header
      :icon="ContactsIcon"
      :isEdited.sync="isEdited"
      :title="$t('contacts')"
    />
    <div class="profile-data">
      <div class="profile-data-item">
        <span class="profile-item-name">{{ $t('phone') }}</span>
        <span class="profile-item-data" v-if="!isEdited">{{userData && userData.email}}</span>
        <div class="profile-item-data" v-else>
          <base-input
            type="text"
            v-model="user.email"
            :placeholder="$t('E-mail')"
            class="profile-input"
          />
        </div>
      </div>
      <div class="profile-data-item">
        <span class="profile-item-name">E-mail</span>
        <span class="profile-item-data" v-if="!isEdited">{{userData && userData.email}}</span>
        <div class="profile-item-data" v-else>
          <base-input
            type="text"
            v-model="user.email"
            :placeholder="$t('E-mail')"
            class="profile-input"
          />
        </div>
      </div>
      <div class="profile-data-actions" v-if="isEdited">
        <span class="profile-item-name"></span>
        <button-full @click.native="updateUser()">{{ $t('To apply') }}</button-full>
        <button-text @click.native="changeEdit()">{{ $t('Cancel') }}</button-text>
      </div>
    </div>
  </div>
</template>

<script>

import AccountHeader from 'theme/components/core/blocks/MyAccount/AccountHeader'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import ButtonText from 'theme/components/theme/ButtonText'
import { ContactsIcon } from 'theme/assets/account/index';
import { mapState } from 'vuex';
import cloneDeep from 'lodash-es/cloneDeep'

export default {
  components: {
    AccountHeader,
    BaseInput,
    ButtonFull,
    ButtonText
  },
  data: () => ({
    ContactsIcon,
    isEdited: false,
    user: null
  }),
  computed: {
    ...mapState({
      userData: (state) => state.user.current
    })
  },
  mounted: function() {
    this.copyUser()
  },
  methods: {
    changeEdit() {
      this.isEdited = !this.isEdited
      this.copyUser()
    },
    copyUser() {
      this.user = cloneDeep(this.userData)
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-item-data {
  max-width: 316px;
  width: 100%;
}
</style>