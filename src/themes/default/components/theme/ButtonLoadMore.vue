<template>
  <button @click="$emit('onClick', $event)" :class="{'loading': loading}">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    buttonText() {
      return this.loading ? this.$t('Loading') :  this.$t('Load more')
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #23BE20;
  border-radius: 4px;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  color: #1A1919;
  background-color: #fff;
  min-height: 40px;
  padding: 8px 0;
  width: 100%;
  transition: all .2s ease-in-out;

  &:hover {
    background-color: #E5F7E4;
  }

  &:active {
    background-color: #cddccc;
  }
}

button.loading {
  background-color: #e5f7e4;

  &::after {
    content: '.';
    animation: dots 1s steps(5, end) infinite;
  }
}

@keyframes dots {
  0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);}
  40% {
    color: #1A1919;
    text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);}
  60% {
    text-shadow: .25em 0 0 #1A1919, .5em 0 0 rgba(0,0,0,0);
  }
  80%, 100% {
    text-shadow: .25em 0 0 #1A1919, .5em 0 0 #1A1919;
  }
}
</style>
