<template>
  <div class="consultation-content">
    <div class="back" @click="closeConsultation">
      <svg class="back-icon" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.29303 11.707L0.586032 6L6.29303 0.292999L7.70703 1.707L3.41403 6L7.70703 10.293L6.29303 11.707Z" fill="#23BE20"/>
      </svg>
      <span class="back-text">Назад</span>
    </div>
    <phone-info />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PhoneInfo from "theme/components/core/PhoneInfo";

export default {
  components: {
    PhoneInfo
  },
  methods: {
    ...mapActions({
      closeConsultation: 'ui/toggleConsultation'
    }),
  }
};
</script>

<style lang="scss" scoped>
.back {
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #E0E0E0;
  margin-bottom: 10px;
  padding: 0 16px;
  height: 56px;

  &-icon {
    margin-right: 10px;
  }

  &-text {
    font-family: DIN Pro;
    font-size: 13px;
    line-height: 16px;
    color: #23BE20;
  }
}

.phone-tooltip {
  display: flex;
  padding: 0 16px;
  flex-direction: column;
}

::v-deep .phone-tooltip {
  &-title {
    font-size: 24px;
    margin-bottom: 25px;
    line-height: 30px;
  }
}
</style>
