/**
 * @file axiosInstance.js
 * @description axios实例
 */
import axios from 'axios'
import { useServerStore } from '@/db/db.pinia'
import { ElMessage } from 'element-plus'
import router from '@router/index'

const serverStore = useServerStore()
// 配置axios
const axiosInstance = axios.create({
    baseURL: serverStore.url, // 基础路径
    timeout: 10000, // 超时时间
    withCredentials: true, // 请求时是否携带cookie
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
})
console.log(serverStore.url)

/**
 * @description 全局axios响应拦截器
 */
axiosInstance.interceptors.response.use(
    (response) => {
        // console.log('响应拦截器', response);
        return response;
    },
    (error) => {
        // 处理响应错误
        // 判断是否登录，登录失效时，跳转到登录页面
        if (error.response.data.message == '请登录') {
            router.push('/logon')
            router.push('/logon')
            .then(() => {
                // 提示登录失效 element-ui
                ElMessage({
                    message: error.response.data.message,
                    grouping: true,
                    type: 'error',
                })
            })
            .catch(() => {
                // 提示登录失效 element-ui
                // 如果跳转失败则刷新页面
                
                ElMessage({
                    message: error.response.data.message,
                    grouping: true,
                    type: 'error',
                })
                router.push('/logon')
            })
            // .finally(() => {
            //     router.push('/logon')
            // })
            
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;

