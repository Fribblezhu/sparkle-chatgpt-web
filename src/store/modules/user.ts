import type { UserInfo } from '@/typings/user'
import type { Module } from 'vuex'
import type { RootState } from '../store'

export interface UserStoreType {
  userInfo: UserInfo
}

const _default: Module<UserStoreType, RootState> = {
  namespaced: true,
  state: () => ({
    userInfo: {
      username: 'Fribble',
      secret: '',
      avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  }),
  mutations: {
    SET_USER_INFO: (state, payload) => {
      state.userInfo = payload
      localStorage.setItem('user_info', JSON.stringify(state.userInfo))
    }
  }
}

export default _default
