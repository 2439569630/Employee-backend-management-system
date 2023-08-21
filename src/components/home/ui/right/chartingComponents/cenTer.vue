<template>
    <div id="cenTer">

    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue'


const chartDom = ref('')
let myChart;
const option = ref(null);


onMounted(() => {
    chartDom.value = document.getElementById('cenTer')
    myChart = echarts.init(chartDom.value)
    option.value = {
        title: {
            text: '本周签到',
            subtext: 'Living Expenses in Shenzhen',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                var tar = params[1];
                return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            splitLine: { show: false },
            data: ['Total', 'Rent', 'Utilities', 'Transportation', 'Meals', 'Other']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Placeholder',
                type: 'bar',
                stack: 'Total',
                itemStyle: {
                    borderColor: 'transparent',
                    color: 'transparent'
                },
                emphasis: {
                    itemStyle: {
                        borderColor: 'transparent',
                        color: 'transparent'
                    }
                },
                data: [0, 1700, 1400, 1200, 300, 0]
            },
            {
                name: 'Life Cost',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'inside'
                },
                data: [2900, 1200, 300, 200, 900, 300]
            }
        ]
    };
    option.value && myChart.setOption(option.value);
})



</script>
<style scoped>
#cenTer {
    width: 100%;
    height: 100%;
}
</style>