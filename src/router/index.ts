import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import FullLayout from "@/components/layout/FullLayout.vue";

const routes = [
    {
        path: '',
        component: FullLayout,
        children : [
            {
                path: '',
                component: () => import('@/views/login/Login.vue')
            },
            {
                path: '/login',
                component: () => import('@/views/login/Login.vue')
            }
        ]
    } as RouteRecordRaw,
]


const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})


router.beforeEach((to, from) =>{
})

export default router
