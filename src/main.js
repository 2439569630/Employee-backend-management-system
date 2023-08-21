import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'


// 管理cookie
import axios from 'axios';

import { createPinia } from 'pinia'

const instance = axios.create({
    withCredentials: true,
})
axios.defaults.withCredentials = true


const app = createApp(App).use(createPinia())
app.config.globalProperties.$axios = instance;
app.use(router)
// app.use(ElementPlus)
app.use(ElementPlus, {
    locale: zhCn,
})
app.mount('#app')

