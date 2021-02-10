<template>
  <v-select 
    :reduce="menu => menu.identifier"
    :options="menu"
    :clearable="false"
    :searchable="false"
    v-model="activeMenu"
    @input="changeRoute($event)"
  >
    <template #option="{ title }">
      <div class="option">
        <span class="option-name">{{ title }}</span>
        <div class="selected-option-image">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.50016 13.5001L4.00016 10.0001L2.8335 11.1667L7.50016 15.8334L17.5002 5.83341L16.3335 4.66675L7.50016 13.5001Z" fill="#23BE20"/>
          </svg>
        </div>
      </div>
    </template>
    <template #open-indicator="{ attributes }">
      <svg v-bind="attributes" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.25 0.5L4 4.25L7.75 0.5H0.25Z" fill="#BDBDBD"/>
      </svg>
    </template>
  </v-select>
</template>

<script>
import vSelect from 'vue-select'
import { mapState } from "vuex";
export default {
  components: {
    vSelect
  },
  computed: {
    ...mapState({
      menu: (state) => state.cms.menu,
    }),
    activeMenu: {
      get () {
        return this.$store.state.cms.activeMenu
      },
      set (value) {
        this.$store.commit('cms/SET_ACTIVE_MENU', this.menu.find(it => it.identifier === value))
      }
    }
  },
  methods: {
    changeRoute(value) {
      this.$router.push(`/info/${value}`)
    }
  }
};
</script>

<style lang="scss">
.v-select {
  width: 100%;
  margin-bottom: 16px;
}

.vs__search {
  width:  100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #E0E0E0;
}
</style>