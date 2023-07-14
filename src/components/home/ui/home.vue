<template>
    <header class="head">
        <heads></heads>
    </header>
    <div class="left">
        <!-- 列表 -->
        <left></left>
    </div>
    <div class="data">
        <router-view></router-view>
    </div>
    
</template>
<script setup>
    import router from './../../../router/index';
    import heads from './../ui/head.vue'
    import left from './../ui/left.vue'
</script>
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
        overflow-y: auto;
    }
    .data {
        position: fixed;
        top: 10vh;
        left: 12vw;
        right: 0;
        bottom: 0;
        background-color: #F5F5F5;
    }
</style>