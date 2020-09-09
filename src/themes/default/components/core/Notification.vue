<template>
  <div class="notifications fixed">
    <transition-group name="fade-in-down">
      <div
        class="notification mt30 border-box cl-white"
        v-for="(notification, index) in notifications"
        :key="`${notification.type}_${index}`"
        :class="notification.type"
      >
        <div
          @click="execAction(notification.action1, index)"
          class="message"
          data-testid="notificationMessage"
        >
          {{ notification.message }}
        </div>
        <div class="actions">
          <button-outline
            class="notification-action"
            id="notificationAction2"
            data-testid="notificationAction2"
            @click.native="execAction(notification.action1, index)"
            v-if="notification.action1"
          >{{ notification.action1.label }}</button-outline>
          <button-full
            id="notificationAction1"
            data-testid="notificationAction1"
            v-if="notification.action2"
            @click.native="execAction(notification.action2, index)"
            class="notification-action"
          >{{ notification.action2.label }}</button-full>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { Notification } from '@vue-storefront/core/modules/notification/components/Notification';
import ButtonFull from 'theme/components/theme/ButtonFull';
import ButtonOutline from 'theme/components/theme/ButtonOutline';

export default {
  mixins: [Notification],
  components: {
    ButtonFull,
    ButtonOutline
  },
  methods: {
    execAction (action, index) {
      if (action.action) {
        // for backward compatibility
        if (action.action === 'close') {
          this.$store.dispatch('notification/removeNotification', index)
        } else {
          action.action()
        }
      }
      this.$store.dispatch('notification/removeNotification', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$z-index-notification: map-get($z-index, notification);
$color-error: color(error);
$color-success: color(success);
$color-warning: color(warning);
$color-info: color(accent);
$color-action: color(black);

.notifications {
  top: 100px;
  right: 5%;
  max-width: 280px;
  z-index: $z-index-notification;

  @media (max-width: 64em) {
    max-width: 100%;
    width: auto;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;

    .fade-in-down-enter,
    .fade-in-down-leave-to {
      transform: translateY(100%);
    }
  }
}
.notification {
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.3);
  background: #FFFFFF !important;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px;
  color: #1A1919;

  &:first-child  {
    margin-top: 0;
  }
}

.button-full {
  background: #23BE20;
}

.message {
  margin-bottom: 24px;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 20px;
  color: #1A1919;
}

.actions {
  display: flex;
  justify-content: space-between;

  .notification-action {
    padding: 4px 0;
    width: 100%;
    min-height: 40px;
    height: auto;
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }
  }
}
.success {
  background: $color-success;
}
.error {
  background: $color-error;
}
.warning {
  background: $color-warning;
}
.info {
  background: $color-info;
}
.action-border {
  border-right: 2px solid transparent;
  &.border-success {
    border-right-color: $color-success;
  }
  &.border-error {
    border-color: $color-error;
  }
  &.border-warning {
    border-color: $color-warning;
  }
  &.border-info {
    border-color: $color-info;
  }
}
</style>
