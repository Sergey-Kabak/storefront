<template>
  <div class="breadcrumbs">
    <span class="breadcrumb-item" v-for="(link, index) in breadcrumbs" :key="index">
      <router-link v-if="link.link" :to="localizedRoute(link.link)">
        <span class="link-name">{{ $t(link.name)}}</span>
        <span class="link-id" v-if="link.id">№{{ link.id }}</span>
      </router-link>
      <span class="divider">/</span>
    </span>
  </div>
</template>

<script>

export default {
  computed: {
    breadcrumbs() {
      return  [
        { name: 'Homepage', link: '/'},
        ...this.$route.meta(this.$route)
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb-item {

  &:last-child {
    position: relative;
    cursor: text;
    a {
      pointer-events: none;
    }

    .divider {
      display: none;
    }
    
    .link-name,
    .link-id {
      color: #bdbdbd
    }
  }
}

.link-name,
.link-id {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #5f5e5e;

  &:hover {
    color: #1a1919;
  }

}

.divider {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #bdbdbd;
  margin: 0 5px;
}
</style>
