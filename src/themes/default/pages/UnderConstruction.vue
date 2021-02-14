<template>
  <div id="page_not_found">
    <div class="v-container">
      <div class="error-page">
        <span class="title"> {{ $t('Page under construction.') }} <span class="highlighted">tap... tap... tap</span> </span>
        <div class="error-info">
          <div class="error-info-top">
            <span> <span class="highlighted">.page</span> { </span>
          </div>
          <div class="error-info-middle">
            <div class="code-line">
              <span>{{ $t('We try hard:') }}</span>
              <div class="emojis">
                <img src="/assets/emojis/ape_1.png" alt="ape_1" class="emoji">
                <img src="/assets/emojis/ape_2.png" alt="ape_2" class="emoji middle">
                <img src="/assets/emojis/ape_3.png" alt="ape_3" class="emoji">
              </div>
              <span class="semicolon">;</span>
            </div>
            <div class="code-line">
              <span>{{ $t('And will finish soon:') }}</span>
              <div class="emojis">
                <img src="/assets/emojis/man.png" alt="man" class="emoji">
                <img src="/assets/emojis/woman.png" alt="woman" class="emoji middle">
                <img src="/assets/emojis/rocket.png" alt="rocket" class="emoji">
              </div>
              <span class="semicolon">;</span>
            </div>
          </div>
          <div class="error-info-bottom">
            <span>}</span>
          </div>
        </div>
        <router-link :to="localizedRoute('/')" class="link">
          <button-full class="not-found">{{ $t("to main") }}</button-full>
        </router-link>
      </div>
      <div class="product-info">
        <span class="product-info-title">{{ $t("Recommend to buy") }}</span>
        <lazy-hydrate :trigger-hydration="!loading">
          <product-listing :products="getStockGoods" />
        </lazy-hydrate>
      </div>
      <div class="product-info" v-if="items.length">
        <span class="product-info-title">{{ $t("Recently viewed") }}</span>
        <product-listing :products="recentlyViewed" />
      </div>
    </div>
  </div>
</template>

<script>
import { Logger } from "@vue-storefront/core/lib/logger";
import { isServer } from "@vue-storefront/core/helpers";
import { mapGetters, mapState } from "vuex";
import i18n from "@vue-storefront/i18n";
import ButtonFull from "theme/components/theme/ButtonFull";
import LazyHydrate from "vue-lazy-hydration";
import ProductListing from "theme/components/core/ProductListing";
import { RecentlyViewedModule } from "@vue-storefront/core/modules/recently-viewed";
import { registerModule } from "@vue-storefront/core/lib/modules";

export default {
  name: "PageNotFound",
  components: {
    LazyHydrate,
    ProductListing,
    ButtonFull
  },
  data: () => ({
    loading: true
  }),
  beforeCreate() {
    registerModule(RecentlyViewedModule);
  },
  async asyncData({ store, route, context }) {
    Logger.log("Entering asyncData for PageUnderConstruction " + new Date())();
    if (context) {
      context.output.cacheTags.add(`under-construction`);
      context.server.response.statusCode = 404;
    }
    await store.dispatch("homepage/loadStockGoods");
  },
  beforeRouteEnter(to, from, next) {
    if (!isServer && !from.name) {
      // Loading products to cache on SSR render
      next(vm => {
        vm.$store.dispatch("homepage/loadStockGoods").then(res => {
          vm.loading = false;
        });
      });
    } else {
      next();
    }
  },
  computed: {
    ...mapGetters({
      getStockGoods: "homepage/getStockGoods"
    }),
    ...mapState("recently-viewed", ["items"]),
    recentlyViewed() {
      return this.items.slice(0, 4);
    }
  },
  metaInfo() {
    return {
      title: this.$route.meta.title || i18n.t("404 Page Not Found"),
      meta: this.$route.meta.description
        ? [
            {
              vmid: "description",
              name: "description",
              content: this.$route.meta.description
            }
          ]
        : []
    };
  }
};
</script>

<style lang="scss" scoped>
#page_not_found {
  margin-top: 40px;
}

.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 68px;
  border-radius: 4px;
}

.error-info {
  max-width: 322px;
  width: 100%;
  margin-bottom: 32px;
  padding: 16px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
}

.title {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1a1919;
  margin-bottom: 24px;

  .highlighted {
    color: #23be20;
  }
}

.emojis {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;

  .emoji {
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.button-full.not-found {
  max-width: 131px;
}

.link {
  display: flex;
  justify-content: center;
  width: 100%;
}

.product-info {
  margin-bottom: 68px;
}

.product-info-title {
  display: block;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1a1919;
  margin-bottom: 32px;
}

.error-info-top,
.error-info-bottom {
  span {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 15px;
    line-height: 16px;
    color: #1A1919;

    &.highlighted {
      color: #EE2C39;
    }
  }
}

.error-info-middle {
  display: flex;
  flex-direction: column;
  margin: 16px 0 16px 10px;
  padding-left: 10px;
  border-left: 1px dashed #bdbdbd;

  span {
    display: block;
    margin-right: 16px;
    font-family: DIN Pro;
    font-size: 15px;
    line-height: 24px;
    color: #23BE20;

    &.semicolon {
      font-weight: 600;
      font-size: 24px;
      margin-right: 0;
      color: #1A1919;
    }
  }
}

.code-line {
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  #page_not_found {
    margin-top: 0px;
  }

  .error-info {
    padding: 12px;
  }

  .error-page {
    margin-bottom: 48px;
  }

  .title {
    font-size: 22px;
    text-align: center;

    .highlighted {
      display: block;
    }
  }

  .button-full.not-found {
    max-width: 320px;
  }

  .product-info {
    margin-bottom: 48px;
  }

  .product-info-title {
    margin-bottom: 24px;
  }

  .emojis {
    .emoji {
      &:last-child {
        display: none;
      }

      &.middle {
        margin-right: 0;
      }
    }
  }
}
</style>
