<template>
  <div class="notifications-wrapper">
    <h2 class="account-page-title">{{ $t($route.name) }}</h2>
    <div class="notifications">
      <account-header
        :icon="MarkEmailIcon"
        :editable="false"
        :title="$t('Уведомления на e-mail')"
      />
      <span class="header-description">Укажите, какие уведомления вы хотите получать по электронной почте</span>
      <div class="profile-data">
        <div class="profile-data-item">
          <div class="profile-item-name">
            <base-switch id="news-switch"/>
          </div>
          <div class="profile-item-data">
            <h4 class="profile-item-header">Новости и акции</h4>
            <p class="profile-item-body">Будьте в курсе всех событий магазина, просматривайте обзоры.</p>
          </div>
        </div>
        <div class="profile-data-item">
          <div class="profile-item-name">
            <base-switch id="recommendations-switch"/>
          </div>
          <div class="profile-item-data">
            <h4 class="profile-item-header">Персональные рекомендации</h4>
            <p class="profile-item-body">Ежедневно мы изучаем поведение миллионов наших клиентов. Основываясь на этой информации, мы можем предложить вам товар, который мог бы вас заинтересовать.</p>
          </div>
        </div>
        <div class="profile-data-item">
          <div class="profile-item-name">
            <base-switch id="sales-switch"/>
          </div>
          <div class="profile-item-data">
            <h4 class="profile-item-header">Персональные скидки и предложения</h4>
            <p class="profile-item-body">Мы сообщим вам, если у нас появится скидка на товар, которым вы интересовались, товар, который вы добавили в список желаний, или товар, который подобрала наша рекомендационная система.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="notifications">
      <account-header
        :icon="SmartphoneIcon"
        :editable="false"
        :title="$t('Уведомления на мобильный телефон')"
      />
      <span class="header-description">Укажите каналы для получения уведомлений по мобильному телефону</span>
      <div class="profile-data">
        <div class="profile-data-item">
          <div class="profile-item-name">
            <base-switch id="telegram-switch"/>
          </div>
          <div class="profile-item-data">
            <span class="telegram">Telegram</span>
          </div>
        </div>
        <div class="profile-data-item">
          <div class="profile-item-name">
            <base-switch id="viber-switch"/>
          </div>
          <div class="profile-item-data">
            <span class="viber">Viber</span>
          </div>
        </div>
        <div class="profile-data-item">
          <div class="profile-item-name">
            <base-switch id="sms-switch"/>
          </div>
          <div class="profile-item-data sms">
            <span class="sms">SMS</span>
          </div>
        </div>
      </div>
    </div>
    <div class="notifications">
      <div class="profile-data-item">
        <div class="profile-item-name">
          <base-switch id="refuse-switch"/>
        </div>
        <div class="profile-item-data">
          <span>Отказаться от всех уведомлений</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AccountHeader from 'theme/components/core/blocks/MyAccount/AccountHeader'
import { MarkEmailIcon, SmartphoneIcon } from 'theme/assets/account/index';
import { mapState } from 'vuex';
import BaseSwitch from 'theme/components/core/blocks/Form/BaseSwitch';

export default {
  components: {
    AccountHeader,
    BaseSwitch
  },
  data: () => ({
    MarkEmailIcon,
    SmartphoneIcon
  })
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.notifications {
  margin-bottom: 20px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
}

.header-description {
  display: block;
  padding-left: 16px;
  margin: 0 0 16px 0;
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 24px;
  color: #5F5E5E;
}

.profile-item-header {
  margin: 0 0 8px 0;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #1A1919;
}

.profile-item-body {
  margin: 0;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 16px;
  color: #9f9e9e;
}

.profile-item-name {
  width: auto;
  margin-right: 16px;
}

.profile-item-data {
  span {
    font-family: DIN Pro;
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;

    &.telegram {
      color: #40B3E0;
    }

    &.viber {
      color: #7C529E;
    }

    &.sms {
      color: #D44638;
    }
  }
}
</style>