<template>
  <transition :name="transitionName">
    <div
      class="modal"
      v-if="isVisible"
      ref="modal"
    >
      <!--      <div class="modal-wrapper">-->
      <!--        <div class="modal-center">-->
      <div class="modal-backdrop" @click="close" />
      <div class="modal-container" ref="modal-content" :style="style">
        <header class="modal-header" v-if="$slots.header">
          <slot name="header" />
          <i
            slot="close"
            class="modal-close material-icons"
            @click="close"
            data-testid="closeModalButton"
          >
            close
          </i>
        </header>
        <div class="modal-content bg-cl-primary" v-if="$slots.content">
          <slot name="content" />
        </div>
        <slot />
      </div>
    </div>
    <!--      </div>-->
    <!--    </div>-->
  </transition>
</template>

<script>
import { mapMutations } from 'vuex';
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress';
import {
  clearAllBodyScrollLocks,
  disableBodyScroll
} from 'body-scroll-lock';

export default {
  name: 'Modal',
  data () {
    return {
      isVisible: false
    }
  },
  watch: {
    isVisible (state) {
      if (state) {
        this.$nextTick(() => {
          disableBodyScroll(this.$refs['modal']);
        })
      } else {
        clearAllBodyScrollLocks();
      }
    }
  },
  methods: {
    onHide (name, state, params) {
      return name === this.name ? this.toggle(false) : false
    },
    onShow (name, state, params) {
      return name === this.name ? this.toggle(true) : false
    },
    onToggle (name, state, params) {
      if (name === this.name) {
        state = typeof state === 'undefined' ? !this.isVisible : state
        this.toggle(state)
      }
    },
    onEscapePress () {
      this.close()
    },
    ...mapMutations('ui', [
      'setOverlay'
    ]),
    toggle (state) {
      this.isVisible = state
      state ? this.setOverlay(state) : setTimeout(() => this.setOverlay(state), this.delay)
    },
    close () {
      this.toggle(false)
    }
  },
  beforeMount () {
    this.$bus.$on('modal-toggle', this.onToggle)
    this.$bus.$on('modal-show', this.onShow)
    this.$bus.$on('modal-hide', this.onHide)
  },
  beforeDestroy () {
    this.$bus.$off('modal-toggle', this.onToggle)
    this.$bus.$off('modal-show', this.onShow)
    this.$bus.$off('modal-hide', this.onHide)
  },
  mixins: [onEscapePress],
  props: {
    name: {
      required: true,
      type: String
    },
    delay: {
      required: false,
      type: Number,
      default: 300
    },
    width: {
      type: Number,
      default: 0
    },
    transitionName: {
      type: String,
      default: 'fade-in-down'
    }
  },
  computed: {
    style () {
      return this.width ? `width: ${this.width}px` : false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
$z-index-modal: map-get($z-index, modal);

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: $z-index-modal;

  .modal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
    z-index: $z-index-modal+1;
    height: auto;
  }

  .modal-header {
    position: relative;

    > * {
        margin: 0;
    }

    @media (max-width: 600px) {
      padding: 25px 20px;
    }
  }

  .modal-content {
    @media (max-width: 600px) {
      padding: 30px 20px;
    }
  }

  .modal-header{
    display: flex;
    align-items: center;
    padding: 0;
    border-radius: 4px 4px 0 0;
    background: #fff;
    border-bottom: 1px solid #E0E0E0;
    justify-content: space-between;
  }
  .modal-close {
    cursor: pointer;
    color: #BDBDBD;
    transition: .2s ease-in-out;
    margin-right: 24px;

    &:hover {
      color: #3d3d3d;
    }
  }

  .modal-content {
    border-radius: 0 0 4px 4px;
  }

  .modal-backdrop{
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
  }
}
</style>
