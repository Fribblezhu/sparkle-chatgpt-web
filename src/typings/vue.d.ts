import { Store } from 'vuex'
import { RootState } from "@/store/store";
import Api from "@/http/api";

declare module '@vue/runtime-core' {
    // 声明自己的 store state

    // 为 `this.$store` 提供类型声明
    interface ComponentCustomProperties {
        $store: Store<RootState>,
        $Api: typeof Api
    }
}
