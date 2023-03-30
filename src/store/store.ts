import { InjectionKey } from 'vue'
import UserStore, { UserStoreType } from './modules/user'
import SystemStore, { SystemStoreType } from './modules/system'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface RootState {
    system: SystemStoreType,
    user: UserStoreType
}

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
    modules: {
        user: UserStore,
        system: SystemStore
    },
    mutations: {

    },
    getters: {

    },
    state: {
        system: {} as SystemStoreType,
        user: {} as UserStoreType
    },
    actions: {

    }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
    return baseUseStore(key)
}
