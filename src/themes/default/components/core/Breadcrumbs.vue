<template>
  <div class="breadcrumbs h5 cl-gray">
    <span v-for="link in paths" :key="link.route_link">
      <router-link :to="link.route_link">
        {{ link.name | htmlDecode }}
      </router-link>
      <span class="divider">/</span>
    </span>
    <span class="cl-mine-shaft">
      {{ current | htmlDecode }}
    </span>
  </div>
</template>

<script>
import { Breadcrumbs } from '@vue-storefront/core/modules/breadcrumbs/components/Breadcrumbs.ts'

export default {
  mixins: [Breadcrumbs]
}
</script>

<style lang="scss" scoped>
  .breadcrumbs {
    span, a {
      font-family: DIN Pro;
      font-size: 13px;
      line-height: 16px;
      color: #bdbdbd;
    }

    .divider {
      margin: 0 5px;
    }

    span {
      a {
        color: #5f5e5e;
        transition: .2s ease-in-out;
        &:hover {
          color: #1a1919;
        }
      }
    }
  }

  a.underline:after, a:not(.no-underline):hover:after {
    content: none;
  }
</style>
