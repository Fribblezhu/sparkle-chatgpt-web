import { type Store } from 'vuex'
import { type RootState } from '@/store/store'
import type Api from '@/http/api'
import { type ElMessage } from 'element-plus'

declare module '@vue/runtime-core' {
  // 声明自己的 store state

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<RootState>
    $Api: typeof Api
    $message: ElMessage
  }
}
