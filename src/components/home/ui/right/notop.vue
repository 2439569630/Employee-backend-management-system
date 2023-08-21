<template>
    <div class="body">
        <div class="top">
            <div class="center">
                <div class="left" id="main">
                    <left></left>
                </div>
                <div class="cenTer">
                    <cenTer></cenTer>
                </div>
                <div class="right">
                    <right></right>
                </div>
            </div>
        </div>
        <div class="bottom">
            <listBody></listBody>
        </div>
    </div>
</template>
<script setup>
import left from './chartingComponents/left.vue'
import cenTer from './chartingComponents/cenTer.vue'
import right from './chartingComponents/right.vue'
import listBody from './chartingComponents/footer/body.vue'
</script>
<style scoped>
.top {
    width: 100%;
    height: 21vh;
}

.center {
    width: 100%;
    height: 100%;
    background-color: #D3D3D3;
    margin: auto;
    display: flex;
    justify-content: space-between;
}

.body {
    background-color: #D3D3D3;
    width: 98%;
    height: 99%;
    margin: 1%;
}

.bottom {
    width: 100%;
    height: 99%;
    background-color: #ffffff;
    margin-top: 1%;
    
}

.center div {
    width: 32.70%;
    height: 100%;
    background-color: #ffffff;

}
</style>