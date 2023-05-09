import { createRouter, createWebHashHistory } from 'vue-router';
// 武汉财务部
import whcwb from './../components/home/cwb_Page/whcwb.vue' 
// 北京财务部
import bjcwb from './../components/home/cwb_Page/bjcwb.vue' 
// 徐州财务部
import xzcwb from './../components/home/cwb_Page/xzcwb.vue'
// 南昌产品部
import nccpb from './../components/home/cpb_Page/nccpb.vue'
// 西凉产品部
import xlcpb from './../components/home/cpb_Page/xlcpb.vue'

// 深圳销售部
import szxsb from './../components/home/xsb_Page/szxsb.vue'
const routes = [
    { path: '/', component: '' }, 
    { path: '/whcwb', component: whcwb },
    { path: '/bjcwb', component: bjcwb },
    { path: '/xzcwb', component: xzcwb },
    { path: '/nccpb', component: nccpb },
    { path: '/xlcpb', component: xlcpb },
    { path: '/szxsb', component: szxsb },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
