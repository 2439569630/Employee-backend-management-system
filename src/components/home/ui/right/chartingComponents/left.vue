<template>
    <div id="main"></div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';

const chartDom = ref('')
let myChart;
const option = ref(null);
// const windowWidth = ref(window.innerWidth);

/**
 * 存放图表的数据
 */
const data = reactive([])
Object.assign(data, [
    { value: 25, name: '上海销售部' },
    { value: 20, name: '北京财务部' },
    { value: 40, name: '南昌产品部' },
    { value: 50, name: '深圳销售部' },
    { value: 100, name: '广州销售部' }
])


onMounted(() => {
    chartDom.value = document.getElementById('main');
    myChart = echarts.init(chartDom.value);
    option.value = {
        title: {
            text: '部门人数',
            subtext: '',
            left: 'center',
            top: '1%'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: '部门',
                type: 'pie',
                radius: '60%',
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    option.value && myChart.setOption(option.value);
})

/**
 * 销毁时释放图表
 */
onBeforeUnmount(() => {
    if (myChart) {
        myChart.dispose();
    }
})

</script>
<style scoped>
#main {
    width: 100%;
    height: 100%;
}
</style>