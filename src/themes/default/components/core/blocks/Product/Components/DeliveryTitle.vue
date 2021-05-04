<template>
  <div class="delivery-title">
    <span class="title">{{ $t("delivery to") }}</span>
    <no-ssr>
      <div class="city-picker" @click="openCityPicker()">
        <span>{{ city }}</span>
        <svg class="arrow" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.25 7.5L9 11.25L12.75 7.5H5.25Z" fill="#BDBDBD"/>
        </svg>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr';
import { mapState } from 'vuex';
export default {
  components: {
    'no-ssr': NoSSR
  },
  computed: {
    ...mapState({
      city: (state) => state.ui.city
    })
  },
  methods: {
    openCityPicker() {
      this.$bus.$emit('modal-show', 'modal-city-picker-product')
    }
  }
};
</script>

<style lang="scss" scoped>
.delivery-title {
  display: flex;
  align-items: baseline;
  margin-bottom: 16px;
}
.title {
  font-family: DIN Pro;
  font-weight: 700;
  font-size: 13px;
  line-height: 20px;
  color: #1A1919;
  margin-right: 8px;
}

.city-picker {
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    span {
      border-bottom-color: transparent;
    }

    .arrow {
      transform: rotate(180deg);
    }
  }

  span {
    font-family: DIN Pro;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #23BE20;
    position: relative;
    border-bottom: 1px dashed #23BE20;
  }

  .arrow {
    transition: .1s ease-in;
    margin-top: 5px;
  }
}

@media  (max-width: 600px) {
  .checkout-title {
    flex-direction: column;
    margin-bottom: 16px;

    .title {
      margin-bottom: 16px;
    }
  }
}
</style>
