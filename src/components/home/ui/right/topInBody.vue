<template>
    <div class="head">
        <router-view name="top"></router-view>
    </div>
    <div class="data">
        <router-view class="body" name="body"></router-view>
    </div>
</template>
<script>
import top from '.././head.vue'

    export default{
        components: {
            top
        }
    }
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
    .data {
        position: fixed;
        top: 10vh;
        left: 12vw;
        right: 0;
        bottom: 0;
    }
</style>