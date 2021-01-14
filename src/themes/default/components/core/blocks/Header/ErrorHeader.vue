<template>
  <header>
    <div class="v-container">
      <div class="header">
        <router-link :to="localizedRoute('/')">
          <img
            width="auto"
            height="41px"
            src="/assets/custom/Ringo_logo_green.svg"
            :alt="$t(defaultTitle)"
          />
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { currentStoreView } from "@vue-storefront/core/lib/multistore";
import config from "config";

export default {
  data() {
    const storeView = currentStoreView();
    return {
      defaultTitle: storeView.seo.defaultTitle
        ? storeView.seo.defaultTitle
        : config.seo.defaultTitle
    };
  }
};
</script>

<style lang="scss" scoped>
header {
  height: 67px;
  margin-bottom: 16px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.05);
}

.v-container {
  height: 100%;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
