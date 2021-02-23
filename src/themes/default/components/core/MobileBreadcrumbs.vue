<template>
  <div class="breadcrumbs mobile" v-if="previousRoute">
    <svg class="back-icon" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.29303 11.707L0.586032 6L6.29303 0.292999L7.70703 1.707L3.41403 6L7.70703 10.293L6.29303 11.707Z" fill="#5F5E5E"/>
    </svg>
    <router-link :to="previousRoute.route_link">
      {{ previousRoute.name | htmlDecode }}
    </router-link>
  </div>
</template>

<script>
import { Breadcrumbs } from "@vue-storefront/core/modules/breadcrumbs/components/Breadcrumbs.ts";

export default {
  mixins: [Breadcrumbs]
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 20px !important;
  a {
    color: #595858;
    transition: 0.2s ease-in-out;
    font-family: DIN Pro;
    font-size: 13px;
    line-height: 16px;
    &:hover {
      color: #1a1919;
    }
  }
  .back-icon {
    margin-right: 10px;
  }
}

a.underline:after,
a:not(.no-underline):hover:after {
  content: none;
}
</style>
