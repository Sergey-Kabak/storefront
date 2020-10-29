<template>
  <button @click="$emit('click')" class="brdr-none bg-cl-transparent p0 middle-xs cl-secondary" aria-label="remove">
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.857143 14.2222C0.857143 15.2 1.62857 16 2.57143 16H9.42857C10.3714 16 11.1429 15.2 11.1429 14.2222V3.55556H0.857143V14.2222ZM3 7.91111L4.2 6.66667L6 8.53333L7.8 6.66667L9 7.91111L7.2 9.77778L9 11.6444L7.8 12.8889L6 11.0222L4.2 12.8889L3 11.6444L4.8 9.77778L3 7.91111ZM9 0.888889L8.14286 0H3.85714L3 0.888889H0V2.66667H12V0.888889H9Z" fill="#BDBDBD"/>
    </svg>
  </button>
</template>
