<template>
  <button class="brdr-none bg-cl-transparent p0 middle-xs inline-flex cl-secondary weight-400 h4 sans-serif fs-medium" :aria-label="$t('Clear cart')">
    <span class="clearcart-btn cl-accent">
      {{ $t('Clear cart') }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
  .clearcart {
    &-btn {
      font-size: 12px;
      margin-right: 30px;
      display: flex;
      align-items: center;
      &:hover {
        color: gray;
      }
    }
  }
</style>
