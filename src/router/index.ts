/* eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import FullLayout from '@/components/layout/FullLayout.vue'

const routes: RouteRecordRaw[] = [{
  path: '',
  component: FullLayout,
  children: [
    {
      path: '',
      component: async () => await import('@/views/chat/ChatIndex.vue')
    },
    {
      path: '/chat',
      component: async () => await import('@/views/chat/ChatIndex.vue')
    }
  ]
}]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})

// @ts-ignore
export default router
