<template>
  <div class="copyright-label">
    Copyright by {{ this.systemInfo.copyright }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store/store'

export default defineComponent({

  setup () {
    const store = useStore()
    return {
      systemInfo: computed(() => store.state.system.systemInfo)
    }
  },
  data () {
    return {}
  },
  computed: {}
})
</script>

<style scoped>
.copyright-label {
  text-align: center;
  line-height: 30px;
  font-size: 16px;
}
</style>
