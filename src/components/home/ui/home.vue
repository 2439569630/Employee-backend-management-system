<template>
    <div class="left">
        <!-- 列表 -->
        <router-view name="left"></router-view>
    </div>
    <div class="right">
        <router-view name="right"></router-view>
    </div>
</template>
<script setup>
import router from './../../../router/index';
import heads from './../ui/head.vue'
import left from './../ui/left.vue'
import { ElNotification } from 'element-plus'
import { getCurrentInstance, onBeforeMount } from 'vue'
// 全局配置
import url from './../../../db/db'
// 调用axios，使用全局的axios
const internalInstance = getCurrentInstance();
const instance = internalInstance.appContext.config.globalProperties.$axios;


// 注册一个钩子，在组件被挂载之前被调用。
onBeforeMount(() => {
    instance.post(url.url + '/ues/loginRecord')
        .then(res => {
            ElNotification({
                title: '上一次登录',
                message: `
                名称: ${res.data.name}<br>
                登录时间：${res.data.loginTime}<br>
                登录地点：${res.data.loginLocation}<br>
                ip地址：${res.data.ip}<br>
                登录设备：${res.data.loginDevice}
                `,
                type: 'warning',
                position: 'bottom-right',
                duration: 5000,
                dangerouslyUseHTMLString: true,
                customClass: 'mynotification'
            })
        })
        .catch(error => {
            console.error(error)
        })
})
</script>
<style>
.mynotification {
    width: 500px;
    height: auto;
    overflow: auto;
}
</style>
<style scoped>
.head {
    /* width: 100vw; */
    height: 10vh;
    background-color: #333333;
    position: fixed;
    top: 0;
    left: 12vw;
    right: 0;
}

.left {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 12vw;
    height: 90vw;
    /* background-color: #333333; */
    /* overflow-y: auto; */
}

.data {
    position: fixed;
    top: 10vh;
    left: 12vw;
    right: 0;
    bottom: 0;
    background-color: #F5F5F5;
}

.right {
    width: 88vw;
    height: 100vh;
    position: fixed;
    left: 12vw;
    background-color: #D3D3D3;
}
</style>