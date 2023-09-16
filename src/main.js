import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
import 'default-passive-events' // 解决谷歌浏览器警告
// 管理cookie
import axios from 'axios';

import { createPinia } from 'pinia'
const app = createApp(App).use(createPinia())
// 加载全局配置
import { useConfig } from '@config'
const config = useConfig()
config.updateWidthAndHeight() // 更新窗口大小
import { useServerStore } from './db/db.pinia'
const serverStore = useServerStore()

const instance = axios.create({
    withCredentials: true,
    baseURL: serverStore.url,
})
axios.defaults.withCredentials = true
axios.defaults.baseURL = serverStore.url; // 修改为你的后台地址



app.config.globalProperties.$axios = instance;
app.use(router)
// app.use(ElementPlus)
app.use(ElementPlus, {
    locale: zhCn,
})
app.mount('#app')



