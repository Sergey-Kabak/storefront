<template>
  <div class="relative base-switch">
    <input 
      :id="id"
      class="checkbox"
      type="checkbox"
      :checked="value"
      @change="$emit('change', $event.target.checked)"
    />
    <label :for="id" class="toggle"><span></span></label>
    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue';

export default {
  name: 'BaseSwitch',
  components: {
    ValidationMessages
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: false
    },
    validations: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      passType: 'password',
      iconActive: false,
      icon: 'visibility_off'
    }
  },
  
}
</script>

<style lang="scss" scoped>
.toggle {
  position: relative;
  display: block;
  width: 32px;
  height: 16px;
  cursor: pointer;

  &:before {
    content: "";
    position: relative;
    width: 32px;
    height: 16px;
    display: block;
    background: #E0E0E0;
    border-radius: 8px;
    transition: background .2s ease;
  }
  span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 3px;
    width: 10px;
    height: 10px;
    display: block;
    background: white;
    border-radius: 10px;
    transition: all .2s ease;
  }
}

.checkbox {
  display: none;
}

.checkbox:checked + .toggle {
  &:before {
    background: #23BE20;
  }
  span {
    background: #fff;
    transform: translateX(16px) translateY(-50%);
    transition: all .2s cubic-bezier(.8,.4,.3,1.25), background .15s ease;
  }
}

</style>
