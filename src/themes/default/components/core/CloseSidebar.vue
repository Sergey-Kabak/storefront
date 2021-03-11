<template>
  <div class="close-sidebar">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 6.40999L17.59 4.99999L12 10.59L6.41 4.99999L5 6.40999L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.40999Z" fill="#BDBDBD"/>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.close-sidebar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  svg {
    cursor: pointer;
    box-sizing: content-box;
    background: #F9F9F9;
    padding: 13px;
  }
}
</style>