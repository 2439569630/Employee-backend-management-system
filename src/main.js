import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
import axios from 'axios';
const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(router)
// app.use(ElementPlus)
app.use(ElementPlus, {
    locale: zhCn,
})
app.mount('#app')