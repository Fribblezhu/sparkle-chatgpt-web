import {UserInfo} from "@/typings/user";
import {Module} from "vuex";
import {RootState} from '../store'

export interface UserStoreType {
    userInfo: UserInfo
}

const  _default: Module<UserStoreType, RootState> = {
    namespaced: true,
    state: () => ({
        userInfo: {username: '', loginName: ''}
    }) ,
    mutations: {
        SET_USER_INFO: (state, payload) => {
            state.userInfo = payload
        }
    }
}


export default _default
