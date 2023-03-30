import {System} from "@/typings/system";
import {Module} from "vuex";
import {RootState} from '../store'

export interface SystemStoreType {
    systemInfo: System
}

const  _default: Module<SystemStoreType, RootState> = {
    namespaced: true,
    state: () => ({
        systemInfo: {}
    }),
    mutations: {
        SET_SYSTEM_INFO: (state, payload) => {
            state.systemInfo = payload
        }
    }
}


export default _default
