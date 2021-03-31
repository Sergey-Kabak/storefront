<template>
  <div class="profile-header">
    <div class="profile-header-left">
      <icon-base class="profile-icon">
        <component :is="icon" />
      </icon-base>
      <h4 class="profile-item-title">{{ $t(title) }}</h4>
    </div>
    <div class="profile-header-right" v-if="!isEdited && editable">
      <button-text
        class="profile-item-change"
        @click.native="$emit('update:isEdited', !isEdited)"
      >
        {{ $t('Edit') }}
      </button-text>
    </div>
  </div>
</template>

<script>

import IconBase from 'theme/components/theme/IconBase';
import ButtonText from 'theme/components/theme/ButtonText';

export default {
  components: {
    IconBase,
    ButtonText
  },
  props: {
    isEdited: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    },
    icon: {
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-header {
  display: flex;
  padding: 16px;
  align-items: center;
}

.profile-item-title {
  margin: 0;
  font-family: DIN Pro;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #1A1919;
}

.profile-header-left {
  display: flex;
  align-items: center;
}

.profile-header-right {
  margin-left: auto;
}

.profile-icon {
  fill: #828282;
  margin-right: 16px;
}

@media (max-width: 900px) {
  .profile-header {
    &:not(:last-child) {
      padding: 16px 16px 8px 16px;
    }
  }
}

</style>