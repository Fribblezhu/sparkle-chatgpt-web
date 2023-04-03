import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import Element from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import { store, key } from '@/store/store'
import i18n from '@/i18n/i18n'
import Api from '@/http/api'

const app = createApp(App)
app.use(router)
app.use(Element)
app.use(store, key)
app.use(i18n)
app.config.globalProperties.$Api = Api

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
