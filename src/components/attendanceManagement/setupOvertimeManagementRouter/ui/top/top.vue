<template>
    <el-menu  :default-active="store.index" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item index="1">今日加班记录</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="2">添加加班记录</el-menu-item>
    </el-menu>
</template>
<script lang="ts" setup>
import router from './../../../../../router';
import { onUnmounted } from 'vue'
import { useSwitchingOFcomponentsStatus } from './../pinia/useSwitchingOFcomponentsStatus'
const store = useSwitchingOFcomponentsStatus()


/**
 * 切换底部的组件
 * @param {string} path 
 */
function handleSelect(path: string) {
    store.index = path.toString()
}
/**
 * 组件被销毁时把index初始化为1
 */
onUnmounted(() => {
    store.index = '1'
})






</script>../pinia/useSwitchingOFcomponentsStatus