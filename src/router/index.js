import { createRouter, createWebHashHistory } from 'vue-router';
import uesdata from './../components/home/ui/useDate.vue'

const routes = [
    { path: '/', component: '' }, 
    { path: '/uesdata/:id', component: uesdata },
    
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
