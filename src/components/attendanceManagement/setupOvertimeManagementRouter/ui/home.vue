<template>
    <div class="box">
        <div class="top">
            <top />
        </div>
        <div class="body">
            <index1 v-show="store.index === '1'"></index1>
            <index2 v-show="store.index === '2'"></index2>
        </div>
    </div>
</template>
<script setup>
import top from './top/top.vue'
import { useSwitchingOFcomponentsStatus } from './pinia/useSwitchingOFcomponentsStatus'
import index1 from './bodyView/1/index1.vue'
import index2 from './bodyView/2/index2.vue'
const store = useSwitchingOFcomponentsStatus()

</script>



<style scoped>
    .box {
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        background-color: #fff;
        margin-left: 10px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
    }
    .top {
        width: 100%;
        height: 58.4px;
        background-color: antiquewhite;

    }
    .body {
        width: 100%;
        height: calc(100% - 58.4px);
    }
</style>