<template>
  <div class="checkout-title">
    <span class="title">{{ $t("Checkout") }}</span>
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
      this.$bus.$emit('modal-show', 'modal-city-picker')
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~theme/css/helpers/mixins';

.checkout-title {
  display: flex;
  align-items: baseline;
  margin-bottom: 25px;
}
.title {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
  margin-right: 16px;
}

.city-picker {
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    span {
      border-bottom: 0;
    }

    .arrow {
      transform: rotate(180deg);
    }
  }

  span {
    font-family: DIN Pro;
    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
    color: #23BE20;

    @include borderBottomDashed;
  }

  .arrow {
    transition: .1s ease-in;
    margin-top: 4px;

  }
}

@media  (max-width: 600px) {
  .checkout-title {
    flex-direction: column;
    margin-bottom: 19px;

    .title {
      margin-bottom: 16px;
    }
  }
}
</style>
