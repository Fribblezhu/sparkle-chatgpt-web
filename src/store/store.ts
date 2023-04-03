/* eslint-disable */
import type { InjectionKey } from 'vue'
import UserStore, {  UserStoreType } from './modules/user'
import SystemStore, {  SystemStoreType } from './modules/system'
import chatStore, {  ChatStoreType } from './modules/chat'
import { createStore, useStore as baseUseStore,  Store } from 'vuex'

export interface RootState {
  system: SystemStoreType
  user: UserStoreType
  chat: ChatStoreType
}

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store:  Store<RootState> = createStore<RootState>({
  modules: {
    user: UserStore,
    system: SystemStore,
    chat: chatStore
  },
  mutations: {},
  getters: {},
  state: {
    system: {} as SystemStoreType,
    user: {} as UserStoreType,
    chat: {} as ChatStoreType
  },
  actions: {}
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
