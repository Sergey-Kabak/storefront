<template functional>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :width="props.height || 24"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    :fill="props.color || '#828282'"
    :height="props.width || 24" 
    role="presentation"
    :aria-labelledby="props.iconName" 
  >
    <slot />
  </svg>
</template>
