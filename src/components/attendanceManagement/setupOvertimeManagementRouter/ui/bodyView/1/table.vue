<template>
    <el-table :data="tableStore.data"  align="center" :max-height="props.tableDataHeight" :table-layout="tableLayout">
        <el-table-column prop="id" label="序号" align="center" width="60" show-overflow-tooltip />
        <el-table-column prop="employee_name" label="加班人" show-overflow-tooltip />
        <el-table-column prop="overtime_reason" label="加班原由" show-overflow-tooltip />
        <el-table-column  prop="start_time" label="加班日期" show-overflow-tooltip />
        <el-table-column prop="overtime_hours" label="加班小时数" show-overflow-tooltip />
        <el-table-column prop="hourly_overtime_pay" label="每小时加班费" show-overflow-tooltip />
        <el-table-column prop="overtime_cost" label="加班费用" show-overflow-tooltip />
        <!-- <el-table-column prop="name" label="详情" fixed="right" width="120" /> -->
    </el-table>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, } from 'vue'
import { useTableStatus } from './../../pinia/useTableStatus'
const tableStore = useTableStatus()


const props = defineProps({
    // 父组件获取到的表格所需的宽度
    tableDataWidth: {
        type: Number,
        default: 0
    },
    tableDataHeight: {
        type: Number,
        default: 0
    }
})  

/**
 * 表格逻辑类
 */
class tableLogic {
    width: number
    height: number
    columns: number = 0 // 表格显示多少列
    /**
     * 构造函数
     * @param width 传递表格的宽度
     * @param height 传递表格的高度
     */
    constructor() {
        this.width = props.tableDataWidth
        this.height = props.tableDataHeight
        // this.getTableData()
    }

    /**
     * 把数据从pinia中取出来，然后赋值给表格
     */
    // public getTableData() {
    //     watch(
    //         () => tableStore.data,
    //         (newVal) => {
    //             tableData.value = newVal
    //         }
    //     )
    // }
}


const hg = new tableLogic() // 实例化表格逻辑类
const tableLayout = ref('auto')// 设置表格单元、行和列的布局方式fixed / auto





</script>
../../pinia/useSwitchingOFcomponentsStatus