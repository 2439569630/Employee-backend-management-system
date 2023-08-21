<template>
    <div class="box">
        <!-- 头部 -->
        <div class="header">

        </div>
        <div class="dataList">
            <!-- 显示考勤记录数据 -->
            <el-table class="table" :data="tableData" border stripe>
                <el-table-column prop="date" label="日期" >
                </el-table-column>
                <el-table-column prop="name" label="姓名" >
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
            </el-table>
        </div>
        <!-- 底部分页 -->
        <div class="footer">
            <el-pagination
                :current-page="currentPage"
                :total="total"
                @update:current-page="handlePageChange"
                layout="prev, pager, next, jumper"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'

const currentPage = ref(1)
const total = ref(1000)


const handlePageChange = (newPage) => {
    console.log(newPage)
    currentPage.value = newPage
    
}






const tableData = [
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    },
    {
        date: 556,
        name: 1556,
        address: 256625
    }
]


</script>

<style scoped>
.box {
    width: 100%;
    height: 100%;
    padding-bottom: 1%;
    display: flex;
    flex-direction: column;
}

/* .header {
    background-color: #d32121;
    width: 100%;
    height: 10%;
} */
.dataList {
    /* background-color: #18bf1e; */
    width: 100%;
    height: 90%;
}

.footer {
    width: 100%;
    height: 10%;
    background-color: #fff;
    display: flex;
    justify-content: center;
}
.table {
    width: 100%;
    height: 100%;
}
</style>
