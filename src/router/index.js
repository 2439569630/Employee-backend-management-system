import { createRouter, createWebHashHistory } from 'vue-router';
import home from './../components/home/ui/home.vue'
import uesdata from './../components/home/ui/useDate.vue'
import logon from './../../logon/ui/ui.vue'
import { walk } from 'vue/compiler-sfc';
import {setupRouterGuards} from './ym'
const routes = [
    { 
        path: '/',
        redirect: '/logon'
    }, 
    {
        path: '/uesdata',
        component: home,
        children: [
            {
                path: ':id',
                component: uesdata,
            }
        ]
    },
    { path: '/logon', component: logon }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


setupRouterGuards(router)

export default router;
