<template>
  <button class="clearcart-button brdr-none bg-cl-transparent p0 middle-xs inline-flex cl-secondary weight-400 h4 sans-serif fs-medium" @click="$emit('click')" :aria-label="$t('Clear wishlist')">
<!--    <span class="clearcart-btn cl-accent">-->
<!--      <i class="material-icons cl-accent mr5">-->
<!--        cancel-->
<!--      </i>-->
      <span class="clearcart-button-span">
        {{ $t('Clear wishlist') }}
      </span>
<!--    </span>-->
  </button>
</template>

<style lang="scss" scoped>
  /*.clearcart {*/
  /*  &-btn {*/
  /*    display: flex;*/
  /*    align-items: center;*/
  /*  }*/
  /*}*/

  .clearcart-button {
    span {

      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
      color: #1A1919;

      padding-bottom: 3px;
      border-bottom: 1px dashed #958f8f;

      &:hover {
        color: #bfa8a8;
      }
    }
  }
</style>
