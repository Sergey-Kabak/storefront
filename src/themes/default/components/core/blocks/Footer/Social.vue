<template>
  <div class="social">
    <a
      v-for="(social, index) in socials"
      :key="index"
      class="social-icon brdr-circle no-underline"
      :href="social.link"
      target="__blank"
      :aria-label="$t(social.label)"
    >
      <img :src="social.path" :alt="$t(social.label)">
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    socials () {
      return [{
        path: '/assets/socials/facebook.svg',
        link: 'https://www.facebook.com/ringoo.ua',
        label: 'Go to Facebook'
      }, {
        path: '/assets/socials/instagram.svg',
        link: 'https://www.instagram.com/ringoo.ua/',
        label: 'Go to Instagram'
      }, {
        path: '/assets/socials/youtube.svg',
        link: 'https://www.youtube.com/user/ringoo.ua',
        label: 'Go to Youtube'
      }]
    }
  }
};
</script>

<style lang="scss" scoped>
.social-icon {
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }
}
</style>
