import { createRouter, createWebHashHistory } from 'vue-router';
import {setupRouterGuards} from './ym'
import AttendanceManagement from './AttendanceManagement'





const routes = [
    { 
        path: '/',
        redirect: '/logon'
    },  
    { path: '/logon', component: ()=> import('./../../logon/ui/ui.vue') },
];

// 考勤记录路由
AttendanceManagement.forEach(item => {
    routes.push(item)
})





const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 路由守卫
setupRouterGuards(router)


export default router;
