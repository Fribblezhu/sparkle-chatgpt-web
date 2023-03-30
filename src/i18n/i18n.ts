import { createI18n } from 'vue-i18n'
import zhCnElementLocale from 'element-plus/es/locale/lang/zh-cn'
import enElementLocale from 'element-plus/es/locale/lang/en'
import enLocale from '@/i18n/langs/en.json'
import zhCnLocale from '@/i18n/langs/zh_cn.json'

const _default = createI18n( {
    locale:  localStorage.getItem('lang') || 'zh_CN',
    fallbackLocale: 'zh_CN',
    messages: {
        "en": {
            ...enLocale,
            ...enElementLocale
        },
        "zh_CN": {
            ...zhCnLocale,
            ...zhCnElementLocale
        }
    }
})

export default _default
