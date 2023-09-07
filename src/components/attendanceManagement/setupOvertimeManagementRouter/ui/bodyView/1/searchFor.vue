<template>
    <div class="body">
        <div class="left1">
            <div class="widht">
                <el-autocomplete v-model="tableStore.searchValue" :fetch-suggestions="fow.querySearchAsync" placeholder="查找加班人"
                @select="handleSelect" :clearable="true" :trigger-on-focus="true" :debounce="debounce"
                @clear="tableStore.cleanUp" ref="autocomplete" 
                />
            </div>
            <el-row class="mb-4">
                <el-button :icon="Search" @click="newButton.click()" circle />
            </el-row>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from '@axios/axios'
import { useTableStatus } from './../../pinia/useTableStatus'
import { usePagingStatus } from './../../pinia/usePagingStatus'
const tableStore = useTableStatus()
const pagingStore = usePagingStatus()
import { ElMessage } from 'element-plus'
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
const autocomplete = ref(null); // 创建对 el-autocomplete 的引用
/**
 * 按钮逻辑类
 */
class button {
    // 点击按钮
    click() {
        // 判断是否有搜索值
        if (tableStore.searchValue) {
            // 有搜索值则执行搜索
            tableStore.searchValueData()
        }
        else {
            // 没有值时把焦点聚焦到搜索框
            ElMessage({
                message: '请输入加班人',
                type: 'warning',
                grouping: true,
            })
            autocomplete.value.focus();
        }
    }
}

const newButton = new button()



/**
 * 查找加班人
 * Find overtime workers
 */
class Fow {

    /**
    * 根据搜索框的值进行异步查询搜索框建议内容
    * @param fowValue 搜索框的值
    */
    querySearchAsync = async (fowValue, callback) => {
        try {
            if (fowValue) {
                // 当搜索框有值时更新search：true
                tableStore.useTableStatus({
                    search: true,
                })
                const data = await axios.post('/overtime/overtimeManagement/searchName/preview', {
                    name: fowValue
                })
                let arr = []
                data.data.data.forEach((item) => {
                    arr.push({
                        value: item.employee_name,
                    })
                })
                // 去除arr重复的值
                let uniqueArray = arr.filter(function (item, index, self) {
                    return self.findIndex(v => v.value === item.value) === index
                })
                callback(uniqueArray);
            }
            else {
                // 没有搜索值则显示空的建议内容
                callback([
                    {
                        value: '',
                    }
                ]);
                // 这里是使用删除按键删除数据为空时执行
                //  需要先判断是否开启的搜索功能，如果开启的话不执行，
                // 如果没有开启的话请求一次页面加载时的数据
                if (tableStore.search) {
                    tableStore.useTableStatus({
                        search: false,
                    })
                    tableStore.cleanUp()
                }

            }
        }
        catch (error) {
            // 发生错误则不显示建议内容
            callback([
                {
                    value: '',
                }
            ]);
            console.error(error);

        }
    }

}
const fow = new Fow()
const debounce = ref(500) // 获取输入建议的防抖延时，单位为毫秒

/**
 * 当获取到搜索框的值时直接搜索不需要再次点击搜索按钮
 * @param {*} xd 搜索框的值
 */
const handleSelect = (xd) => {
    // 更改pinia的searchValue值
    tableStore.search = true
    tableStore.searchValue = xd.value
    tableStore.searchValueData(pagingStore.page, pagingStore.rows)


}
</script>
<style scoped>
.body {
    width: calc(100% - 20px);
    height: 100%;
    display: flex;
    /* 上下居中 */
    align-items: center;

}

.left1 {
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    padding-right: 10px;



}

.left1 .mb-4 {
    margin-left: 10px;
}

.form {
    display: flex;
}
.widht {
    /* 为搜索框添加一个盒子防止搜索框长度超出导致长度变化 */
    width: 196.4px;
    height: 100%;
}

</style>