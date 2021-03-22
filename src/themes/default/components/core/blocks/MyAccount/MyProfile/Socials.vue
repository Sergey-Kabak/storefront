<template>
  <div class="socials-data">
    <account-header
      :icon="ShareIcon"
      :isEdited.sync="isEdited"
      :editable="false"
      :title="$t('social networks')"
    />
    <div class="profile-data">
      <div class="profile-data-item">
        <div class="profile-item-name">
          <div class="social-icon">
            <icon-base> <google-icon /> </icon-base>
          </div>
          <span class="social-text">Google</span>
        </div>
        <div class="profile-item-data">
          <button-text>{{ $t('cancel connection') }}</button-text>
        </div>
      </div>
    </div>
    <div class="profile-data">
      <div class="profile-data-item">
        <div class="profile-item-name">
          <div class="social-icon">
            <icon-base> <facebook-icon /> </icon-base>
          </div>
          <span class="social-text">Facebook</span>
        </div>
        <div class="profile-item-data">
          <button-text>{{ $t('cancel connection') }}</button-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import IconBase from 'theme/components/theme/IconBase';
import AccountHeader from 'theme/components/core/blocks/MyAccount/AccountHeader'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import ButtonText from 'theme/components/theme/ButtonText'
import { GoogleIcon, FacebookIcon, ShareIcon } from 'theme/assets/account/index';
import { mapState } from 'vuex';
import cloneDeep from 'lodash-es/cloneDeep'

export default {
  components: {
    AccountHeader,
    BaseInput,
    ButtonFull,
    ButtonText,
    IconBase,
    GoogleIcon,
    FacebookIcon
  },
  data: () => ({
    ShareIcon,
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
* {
  box-sizing: border-box;
}

.profile-input {
  max-width: 316px;
  width: 100%;
}

.profile-data-item, 
.profile-item-name {
  display: flex;
  align-items: center;
}

.social-icon {
  display: flex;
  padding: 8px;
  background: #F9F9F9;
  border-radius: 4px;
  margin-right: 16px;
}

.social-text {
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 16px;
  font-weight: 400;
  color: #000000;
}
</style>