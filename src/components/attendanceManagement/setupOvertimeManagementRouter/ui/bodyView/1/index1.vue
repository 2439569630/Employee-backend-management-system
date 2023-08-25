<template>
    <div id="box">
        <!-- 搜索模块 -->
        <div class="top">
            搜索模块
        </div>
        <!-- 表格模块 -->
        <div class="box" id="dataTable">
            <dataTable :tableDataWidth="Number(dataTableWidth)" :tableDataHeight="Number(dataTableHeight)"></dataTable>
        </div>
        <!-- 分页模块 -->
        <div class="botton">
            <Pagination></Pagination>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import dataTable from './table.vue'
import Pagination from './Pagination.vue'
// 导入通用防抖函数
import { Debounce } from './../../../../../../Universalfunction/debounce'
const form = ref({
    date: '',
    duration: '',
    reason: '',
    type: '',
    status: '',
    remark: ''
})
// 表格模块的宽度
const dataTableWidth = ref<Number>(966)
// 表格模块的高度
const dataTableHeight = ref<Number>(984)


/**
 * 监听窗口大小变化的工具类
 */
class Resize {
    private debounce: any; // 防抖函数实例
    public width: number = 0; // 元素的宽度
    public height: number = 0; // 元素的高度
    public document: string; // 传递的document选择器
    public time: number = 10; // 防抖时间

    /**
     * 回调函数，用于处理窗口大小变化事件
     */
    public resizeHandler = function () {
        // 防抖
        this.debounce.debounce(() => {
            this.getTableHeight(this.debounce) // 获取元素的宽高
            dataTableHeight.value = this.height // 把高度传递给子组件
            dataTableWidth.value = this.width // 把宽度传递给子组件
        }, this.time);
    }

    /**
     * 构造函数，创建 Resize 实例
     * @param Debounce 防抖函数
     * @param document 需要监听大小变化的元素选择器
     * @param time 防抖时间
     */
    constructor(Debounce: any, document: string, time: number) {
        this.debounce = new Debounce(); // 实例化防抖
        this.document = document; // 传递的document选择器
        this.time = time;
        // 在构造函数中绑定 resizeHandler 函数的上下文
        this.resizeHandler = this.resizeHandler.bind(this);
    }

    /**
     * 启动窗口大小变化监听
     */
    public resize() {
        // 在页面加载时获取高度
        this.getTableHeight();
        dataTableWidth.value = this.width;
        dataTableHeight.value = this.height;
        // 实例化防抖
        // 添加监听
        window.addEventListener('resize', this.resizeHandler);
    }

    /**
     * 停止窗口大小变化监听
     * @returns 返回一个字符串，表示监听已被移除
     */
    public removeResize() {
        window.removeEventListener('resize', this.resizeHandler);
        return '移除监听';
    }

    /**
     * 获取指定元素的宽高
     * @throws 如果没有传递有效的document选择器，抛出一个错误
     */
    private getTableHeight() {
        if (!this.document) {
            throw new Error('请传递一个document选择器');
        }
        const element = document.querySelector(this.document) as HTMLElement;
        if (element) {
            this.width = element.offsetWidth;
            this.height = element.offsetHeight;
        } else {
            console.warn('获取元素失败')
            this.width = 0;
            this.height = 0;
        }
    }
}

// 实例化监听窗口大小变化
const resizeInstance = new Resize(Debounce, '#dataTable', 300)
// 组件完成初始渲染并创建 DOM 节点后
onMounted(() => {
    // 延迟100毫秒执行
    setTimeout(() => {
        resizeInstance.resize()
    }, 100);
    
})



onBeforeUnmount(() => {
    // 移除事件监听器，避免在组件销毁后继续执行逻辑
    resizeInstance.removeResize()

})

</script>
<style scoped>
#box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

}

#box .top {
    width: 100%;
    height: 77px;
    /* background-color: antiquewhite; */
}

.box {
    width: 100%;
    height: calc(100% - 77px - 50px);

    /* background-color: aqua; */
}

.botton {
    width: 100%;
    height: 50px;
    /* background-color: aqua; */
}
</style>
