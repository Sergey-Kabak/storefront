<template>
  <footer class="footer">
    <span class="copyright">Все права защищены. «Ringoo» Copyright © {{ new Date().getFullYear() }}</span>
  </footer>
</template>

<script>
import CurrentPage from 'theme/mixins/currentPage';

export default {
  name: 'MainFooter',
  mixins: [CurrentPage]
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #E0E0E0;
  margin-top: auto;
  height: 56px;
}

.copyright {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #5F5E5E;
}
</style>
