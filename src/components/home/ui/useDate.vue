<template>
    <component @clickChild="getChildInfo" @update="update_Data" @tabulation="list"></component>
    <bodydata :msg="time" @update="update_Data" :search_for="cd" :post="listshuju"></bodydata>
</template>
<script setup>
import component from './useDate/header.vue'
import bodydata from './useDate/body.vue'
import { useRoute } from 'vue-router';
import { ref, watch, onMounted, onBeforeMount, getCurrentInstance } from 'vue'
import url  from './../../../db/db'
// 调用axios，使用全局的axios
const internalInstance = getCurrentInstance();
const axios = internalInstance.appContext.config.globalProperties.$axios;

const route = useRoute();
const routeParams = ref(route.params)

const listshuju = ref()
// 记录要搜索的内容
const cd = ref()


let time = ref()

// console.log(url.url());
// 这里由子组件发来的进行岗位的筛查
const list = (params) => {
    listshuju.value = params[0]
}

// console.log(url.url)



// 处理component组件发来要搜索的数据
const getChildInfo = (params) => {
    // console.log(params.value);
    cd.value = params

}

// 子组件用来提醒更新数据
const update_Data = (params) => {
    axios.get(url.url + '/data?id=' + route.params.id)
        .then((response) => {
            // 更新数据
            time.value = response.data
        })
        .catch((error) => {
            ElMessage({
                type: 'error',
                message: '数据更新失败',
            })
        })
}




const postFontSize = ref(1)
watch(
    () => postFontSize,
    (newVal, nonull) => {
        console.log(newVal);
        console.log(nonull);
    }
)

// 注册一个回调函数，在组件挂载完成后执行。
onMounted(() => {
    // console.log('举例来说，mounted 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码');
    // console.log(route.params.id);
    time.value = [

    ]
    axios.get(url.url + '/data?id=' + route.params.id,)
        .then(function (response) {
            // 处理成功情况
            time.value = response.data
        })
        .catch(function (error) {
            // 处理错误情况
            console.log(error);
        })
        .then(function () {
            // 总是会执行
        });
})
// 注册一个钩子，在组件被挂载之前被调用。
// onBeforeMount(() => {
//     // console.log('注册一个钩子，在组件被挂载之前被调用。');
//     if (route.params.id) {

//     }

// })





// 监听路由来更新数据
watch(() => route.params.id, () => {
    time.value = []
    axios.get(url.url + '/data?id=' + route.params.id,)
        .then(function (response) {
            // 处理成功情况
            time.value = response.data
        })
        .catch(function (error) {
            // 处理错误情况
            console.log(error);
        })



    // console.log(time.msg);
})



</script>
<style scoped>
/* * {
        background-color: #F5F5F5;
    } */
</style>
