<template>
    <div class="index2box">
        <el-form class="widht" :model="form" >
            <div>
                <el-form-item label="加班人" widht="100px">
                    <el-input v-model="form.name" />
                </el-form-item>
            </div>
            <el-form-item label="加班日期">
                <el-date-picker v-model="form.date1" type="date" placeholder="日期" style="width: 100%" />
            </el-form-item>
            <el-form-item label="加班时长" class="display">
                <el-input-number v-model="form.num" :change="num(Number(form.num))" :precision="1" :step="0.1" :max="10"
                    :min="0" />
                <p style="margin-left: 10px;color: var(--el-text-color-regular);">小时/分钟</p>
            </el-form-item>
            <el-form-item label="加班原因" class="display">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
                <div class="center">
                    <el-button type="primary" @click="submitForm()">添加</el-button>
                    <el-button @click="clearForm()">清空</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import axios from '@axios/axios'
import { ElMessage } from 'element-plus'
import { useConfig } from '@config'
import { number } from 'echarts';
// do not use same name with ref
const form = reactive<{
    [key: string]: string | number
}>({
    name: '',
    date1: '',
    desc: '',
    num: 0,
})


/**
 * 处理加班时间范围分为小时.分钟
 * @param {number} number 传递一个数字
 */
const num = (number: number) => {
    if (number === 10) return;

    const decimalPart = Number(number.toString().slice(2, 3));

    if (decimalPart === 6) {
        form.num = Math.round(number);
    } else if (decimalPart >= 7) {
        form.num = Math.floor(number) + 0.5;
    }
};

/**
 * 清空表单
 */
const clearForm = () => {
    form.name = '';
    form.date1 = '';
    form.desc = '';
    form.num = 0;
}


/**
 * 表单提交
 */
const submitForm = async () => {
    try {
        // 判断表单是否为空
        Object.keys(form).forEach((i) => {
            if (!form[i]) {
                throw new Error("表单不能为空！");
            }
        })
        const fromData:any = await new Promise((resole, reject) => {
            axios.post('/overtime/overtimeManagement/addOvertime', form)
                .then (res => {
                    resole(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
        ElMessage({
            message: fromData.data.msg,
            grouping: true,
            type: 'success',
        })
        // 请求成功后清空表单
        clearForm()
    }
    catch (error: any) {
        ElMessage({
            message: error.message || error.response.data.msg ,
            grouping: true,
            type: 'error',
        })
    }
}


</script>
<style scoped>
.text-center {
    display: flex;
    justify-content: center;
    width: 10px;
}

.center {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

}
.widht {
    width: 35vw;
}

.index2box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
    padding-top: 40px;
    /* background-color: red; */
}

.index2box .widht {}

.display {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 媒体查询#index2box宽度小于300px */
@media screen and (max-width: 768px) {
    .index2box {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        overflow: auto;
        /* background-color: red; */
    }

    .index2box .widht {
        width: calc(100% - 20px);

        min-width: 100%;
    }
}

/* 媒体查询#index2box宽度小于300px */
@media screen and (max-height: 500px) {
    .index2box {
        height: calc(100% - 40px);
        overflow: auto;
    }
}
</style>