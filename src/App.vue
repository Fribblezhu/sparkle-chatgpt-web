<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

  created () {
    this.getSystemInfo()
  },

  methods: {
    getSystemInfo(): void {
      this.$store.commit('system/SET_SYSTEM_INFO', {name: '系统管理平台'})
    }
  }

})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
