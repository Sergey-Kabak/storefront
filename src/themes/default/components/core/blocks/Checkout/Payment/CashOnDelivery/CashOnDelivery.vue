<template>
  <div class="cashondelivery">
    <span class="cashondelivery-text">{{ $t("By paying i accept") }} <router-link class="link" to="/info/umovi-vikoristannja-sajtu"> {{ $t("User conditions") }} </router-link></span>
    <button-full @click.native="placeOrder" class="submit">{{ $t("To pay") }}</button-full>
  </div>
</template>

<script>
import ButtonFull from 'theme/components/theme/ButtonFull'

export default {
  components: {
    ButtonFull
  },
  methods: {
    placeOrder() {
      this.$bus.$emit('checkout-before-placeOrder')
    }
  }
};
</script>

<style lang="scss" scoped>
.cashondelivery {
  display: flex;
  justify-content: space-between;
  padding: 16px 32px;
}

.cashondelivery-text {
  display: block;
  margin-right: 24px;
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
}

.link {
  border-bottom: 1px solid #1A1919;
}

.submit {
  max-width: 195px;
}

@media  (max-width: 576px) {
  .cashondelivery {
    padding: 8px 16px 16px 16px;
    flex-direction: column-reverse;
  }

  .button-full {
    max-width: 100%;
    margin-bottom: 12px;
  }

  .cashondelivery-text {
    margin-right: 0;
  }
}
</style>