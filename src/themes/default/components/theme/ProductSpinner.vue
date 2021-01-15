<template>
  <svg class="product-spinner" viewBox="0 0 50 50">
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      dur="1s"
      by="360"
      repeatCount="indefinite" />
    <circle class="path" cx="25" cy="25" r="20" fill="none" />
  </svg>
</template>

<style scoped lang="scss">
.product-spinner {
  width: 48px;
  height: 48px;
  @media (max-width: 576px){
    width: 24px;
    height: 24px;
  }

& .path {
    stroke: #23BE20;
    stroke-linecap: round;
    stroke-width: 4;
    animation: dash 1.5s ease-in-out infinite;
    @media (max-width: 576px){
      stroke-width: 2;
    }
  }

}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
