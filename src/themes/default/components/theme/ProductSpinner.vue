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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 48px;
  min-height: 48px;
  max-height: 48px;
  max-width: 48px;

  .path {
    stroke: #23BE20;
    stroke-linecap: round;
    stroke-width: 4;
    animation: dash 1.5s ease-in-out infinite;
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
