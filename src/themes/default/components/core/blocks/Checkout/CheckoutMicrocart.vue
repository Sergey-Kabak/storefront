<template>
  <div class="checkout-microcart">
    <microcart-icon class="icon pointer icon-microcart" />
  </div>
</template>

<script>

import MicrocartIcon from 'theme/components/core/blocks/Header/MicrocartIcon';

export default {
  components: {
    MicrocartIcon
  }
};
</script>

<style lang="scss" scoped>
  .checkout-microcart {
    cursor: pointer;
    position: absolute;
    top: 105px;
    right: 0;
    overflow: hidden;
  }

  .icon-microcart ::v-deep {
    display: flex;
    padding: 16px 0;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #1A1919!important;
    min-width: 48px;
    min-height: 88px;
    border-radius: 4px 0px 0px 4px;

    svg {
      fill: #23BE20;
    }

    span {
      min-width: 24px;
      min-height: 24px;
      background: #23BE20;
      font-size: 12px;
      line-height: 13px;
      position: static;
      top: 100%
    }
  }

  @media (max-width: 768px) {
    .checkout-microcart {
      display: none;
    }
  }
</style>
