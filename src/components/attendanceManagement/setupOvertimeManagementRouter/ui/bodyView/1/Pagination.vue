<template>
    <div class="footer">
        <el-pagination class="el-pagination" v-model:current-page="store.page" :page-size="page"
            :page-sizes="[20, 50, 100, 200]" :small="small" :disabled="disabled" :background="background"
            layout="sizes, prev, pager, next, total" :total="store.total_rows"
            @current-change="paging.handlePageChange" 
            @size-change="paging.handleSizeChange"
            />
            <!-- 
                size-change 行数改变时触发
            -->
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted} from 'vue'
// 分页状态
import { usePagingStatus } from './../../pinia/usePagingStatus'
const store = usePagingStatus()
// 这里导入表格的pinia是用来存放表格数据的
import { useTableStatus } from './../../pinia/useTableStatus'
const tableStore = useTableStatus()
// 导入服务器地址
import { useServerStore } from './../../../../../../db/db.pinia'
import { th } from 'element-plus/es/locale';
const serverStore = useServerStore()

import axios from '@axios/axios'







/**
 * 分页逻辑类
 * 负责获取页码、总页数、当前页的数据
 */
class pagingLogic {
    constructor() {
        this.getPagingData()
        this.getCurrentPageData()
    }

    /**
     * 获取数据
     * 后端返回总共有多少条数据记录
     */
    public getPagingData() {
        // 请求服务器分页数据
        axios.post('/overtime/overtimeManagement/pagingData')
            .then((res) => {
                store.total_rows = res.data.total_rows
            })
            .catch((err) => {
                throw new Error('请求失败：' + err)
            })
    }

    /**
     * 获取当前页的数据
     * 后端返回当前页的表格数据
     */
    public getCurrentPageData() {
        return new Promise((resolve, reject) => {
            axios.post('/overtime/overtimeManagement', {
            page: store.page,
            rows: store.rows
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((res) => {
                tableStore.data = res.data
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
        
    }
    /**
     * 切换页码时更新页码
     * @param newPage 当前页码
     */
    public handlePageChange = (newPage: number) => {
        store.page = newPage
        currentPage.value = newPage
        // 判断是否需要根据搜索内容进行分页
        if (tableStore.search) {
            tableStore.searchValueData()
        } else {
            this.getCurrentPageData()
        }
    }
    /**
     * 更改每页显示的行数
     */
    public handleSizeChange = (val: number) => {
        store.rows = val
        page.value = val
        // 判断是否需要根据搜索内容进行分页
        if (tableStore.search) {
            tableStore.searchValueData()

        } else {
            this.getCurrentPageData()
        }
    }
}
const paging = new pagingLogic() // 实例化分页逻辑类
const page = ref(store.rows) // 一页显示多少条数据
const currentPage = ref(store.page)// 当前页
const small = ref(false) // 是否使用小型分页样式
const background = ref(true) // 是否为分页按钮添加背景色
const disabled = ref(false) // 是否禁用分页
</script>

<style scoped>
.footer {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
}

.el-pagination {
    overflow: auto;
}
</style>
