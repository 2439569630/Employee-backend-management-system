<template>
    <!-- PC -->
    <div v-show="config.isDesktop === true"  class="box">
        <div class="center">

        </div>
    </div>
    <!-- PE -->
    <div v-show="config.isMobile === true">

    </div>
</template>

<script setup>
import { useConfig } from '@config'
const config = useConfig() // 获取配置

</script>



<style scoped>  
    .box {
        width: 100vw;
        height: 100vh;
        background-color: #f5f5f5;
        display: flex;
    }
    .center {

    }
</style>