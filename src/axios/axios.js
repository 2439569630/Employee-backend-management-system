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
    async (error) => {
      try {
        // 处理响应错误
        // 判断是否登录，登录失效时，跳转到登录页面
        if (error.response.data.message === '请登录') {
          await router.push('/logon');
          // 显示登录失效消息
          ElMessage({
            message: '请登录',
            grouping: true,
            type: 'error',
          });
        }
        return Promise.reject(error);
      } catch (err) {
        // 处理捕获的异常
        console.error('拦截器异常:', err);
        return Promise.reject(err);
      }
    }
  );
  


export default axiosInstance;

