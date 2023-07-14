import axios from "axios"
import { ElMessage } from 'element-plus'
import url from './../db/db'
/**
 * 设置路由守卫。
 * 在路由跳转前进行身份验证。
 * @param {Object} router - Vue Router 实例。
 */
export function setupRouterGuards(router) {
    let isAuthenticated = false
    router.beforeEach((to, from) => {
        if (to.path.startsWith('/uesdata') && !isAuthenticated) {
            return axios.get(url.url + '/ues/logon')
                .then(res => {
                    if (res.data['isAuthenticated'] === true) {
                    } else if (res.data['isAuthenticated'] === false) {
                        ElMessage({
                            message: '未登录',
                            type: 'warning',
                        })
                        return { path: '/logon' }
                    }
                })
                .catch(err => console.log(err))
        }
    })
}