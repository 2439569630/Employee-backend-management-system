<template>
    <div id="rightMain">
    </div>
</template>
<script setup>
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/line';


import { onMounted, ref } from 'vue'

const chartDom = ref('')
let myChart
const option = ref(null)

onMounted(() => {
    chart()
})



function chart() {
    if (myChart) {
        myChart.dispose();
    }
    chartDom.value = document.getElementById('rightMain');
    myChart = echarts.init(chartDom.value);

    option.value = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    };
    option.value && myChart.setOption(option.value);
}

</script>
<style scoped>
#rightMain {
    width: 100%;
    height: 100%;
}
</style>