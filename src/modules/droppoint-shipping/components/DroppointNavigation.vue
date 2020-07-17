<template>
  <div class="col-xs-12">
    <div class="nav-wrapper">
      <div class="row">
        <div class="col col-sm-6">
          <a href="#"
             @click.prevent="onClick(true)"
             :class="[{'active': isShow}, 'tab-nav']"
          >
            {{ $t('List') }}
          </a>
        </div>
        <div class="col col-sm-6">
          <a href="#" @click.prevent="onClick(false)" :class="[{'active': !isShow}, 'tab-nav']">
            {{ $t('Map') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isShow'],
  data () {
    return {
      showList: true
    }
  },
  methods: {
    onClick (val) {
      this.showList = val
      this.$emit('onNavClick', val)
    }
  }
}
</script>

<style lang="scss">
  .nav-wrapper {
    .row {
      margin: 0;
      @media all and (max-width: 576px) {
        width: 80%;
        margin: 0 auto;
      }
      .col-sm-6 {
        margin: 0;
        padding: 0;
        @media all and (max-width: 576px) {
          width: 50%;
        }
      }
    }
    .tab-nav {
      text-align: center;
      padding: 15px 0;
      display: block;
      font-size: 14px;
      font-weight: 700;
      color: #8b93a7;

      &:hover {
        text-decoration: none;
      }
      &.underline:after, &:not(.no-underline):hover:after {
        display: none;
      }
      &.active {
        color: #19223d;
      }
    }
  }
</style>
