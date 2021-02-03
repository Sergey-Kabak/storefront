<template>
  <div class="shipping disabled">
    <span class="disabled-text">2. {{ $t("Delivery" )}}</span>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
.shipping {
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
