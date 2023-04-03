<template>
  <el-container class="app-container">
    <el-main class="app-main">
      <router-view></router-view>
    </el-main>
    <el-footer class="app-footer">
      <app-footer></app-footer>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppFooter from '@/components/footer/AppFooter.vue'

export default defineComponent({
  components: {
    AppFooter
  }
})
</script>

<style scoped>
.app-container {
  height: 100%
}

.app-main {
  height: calc(100% - 30px);
}

.app-footer {
  height: 30px;
}
</style>
