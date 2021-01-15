<template>
  <div class="payment disabled">
    <span class="disabled-text">3. {{ $t("the Payment")}}</span>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
.payment {
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  padding: 16px;
}

.disabled-text {
  font-family: DIN Pro;
  font-size: 18px;
  line-height: 24px;
  color: #BDBDBD;
}
</style>
