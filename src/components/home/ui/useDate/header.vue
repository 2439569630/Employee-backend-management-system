<template>
    <div class="top">
        <div class="left">
            <div class="leftList">
                <el-cascader :options="options" clearable placeholder="所有岗位" @change="dj()" v-model="vl" />
            </div>
            <div class="leftList">
                <el-input v-model="input2" :suffix-icon="Search" clearable @change="text_Nonull(input2)" class="w-50 m-2"
                    placeholder="请输入要搜索的员工名称" />
            </div>
            <div class="leftList">
                <el-button @click="submit">搜索</el-button>
            </div>

        </div>
        <div class="right">
            <el-button type="primary" @click="dialogFormVisible = true;" :icon="Plus">添加员工</el-button>


            <el-dialog v-model="dialogFormVisible" center align-center modal title="添加员工">
                <el-form :model="dialogFormVisibleData">

                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <span class="required1">*</span>
                        <el-input v-model="dialogFormVisibleData.name" width="10" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth">
                        <span class="required1">*</span>
                        <el-select v-model="dialogFormVisibleData.sex" placeholder="性别">
                            <el-option label="男" value="男" />
                            <el-option label="女" value="女" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出生时间" :label-width="formLabelWidth">
                        <span class="required2">*</span>
                        <el-date-picker v-model="dialogFormVisibleData.birthday" type="date" format="YYYY/MM/DD"
                            value-format="YYYY-MM-DD" />
                    </el-form-item>
                    <el-form-item label="岗位" :label-width="formLabelWidth">
                        <span class="required1">*</span>
                        <el-cascader :options="add_options" v-model="dialogFormVisibleData.poid" @change="listData"
                            placeholder="选择岗位" />
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth">
                        <el-input v-model="dialogFormVisibleData.textarea" :rows="10" type="textarea" placeholder="备注" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="complete">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>
<script setup>
import { Plus, Search } from '@element-plus/icons-vue'
import { ref, defineProps, watch, defineEmits, onMounted, getCurrentInstance, reactive } from 'vue';
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
const emit = defineEmits()


// 获取路由id
const route = useRoute();

// 初始化各数据
const initialization = () => {
    console.log(233);
}
//  确认创建员工事件
const complete = () => {
    // 获取路由id
    dialogFormVisibleData.seid = route.params.id
    // console.log(dialogFormVisibleData);
    const { name, sex, birthday, textarea, poid, seid } = dialogFormVisibleData
    // Object.keys(dialogFormVisibleData).forEach((elment) => {
    //     if (dialogFormVisibleData[]) {

    //     }
    //     console.log(dialogFormVisibleData[elment]);
    // })
    const aryy = ['name', 'sex', 'birthday', 'poid', 'seid']
    const tip = {
        name: '姓名',
        sex: '性别',
        birthday: '出生时间',
        poid: '岗位',
        seid: '部门id获取失败'
    }
    let state = true
    aryy.forEach((element) => {
        if (!dialogFormVisibleData[element] == '') {
            // console.log(dialogFormVisibleData[element] == '')
        }
        else {
            ElMessage({
            type: 'error',
            message: tip[element] + '没有选择',
        })
            console.log(tip[element] + '没有选择');
            state = false
        }
    })
    // console.log('state:' + state)
    if (state) {
        const url = 'http://htyg.bbqll.xyz/adddata?'
        const data = 'name=' + name + '&sex= ' + sex + '&birthday=' + birthday + '&poid=' + poid + '&seid=' + seid + '&textarea=' + textarea
        axios.get(url + data)
            .then((res) => {
                ElMessage({
                    type: 'success',
                    message: res.data.msg,
                })
                dialogFormVisible.value = false
                // 提示父组件更新数据
                emit('update', 200)
                // 添加数据成功，清除填写的数据
                console.log('添加数据成功，清除填写的数据');
                Object.keys(dialogFormVisibleData).forEach((element) => {
                    dialogFormVisibleData[element] = ''
                })
            })
            .catch((error) => {
                console.log(error)
                ElMessage({
                    type: 'error',
                    message: error,
                })
            })
    }
    else {
        ElMessage({
            type: 'error',
            message: '缺少必要的内容',
        })
    }
}


// 获取岗位信息
onMounted(() => {
    // 筛选的默认选着全部岗位
    vl.value = 0
    axios.get('http://htyg.bbqll.xyz/post')
        .then((req) => {
            // 在这里需要添加一个 ‘所有岗位’
            add_options.value = req.data
            let temporary = [{
                value: 0,
                label: '所有岗位'
            }]
            // 提取在存入temporary
            req.data.forEach(elment => {
                temporary.push(elment)
            });
            options.value = temporary
        })
        .catch((error) => {
            ElMessage({
                type: 'error',
                message: '获取数据失败',
            })
            console.log(error);
        })
})







// 页面的弹出状态
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const dialogFormVisibleData = reactive({
    name: '',
    sex: '',
    birthday: '',
    poid: '',
    textarea: '',
    // 获取路由id
    seid: ''
})

const listData = () => {
    dialogFormVisibleData.poid = dialogFormVisibleData.poid[0]
}

// 调用axios，使用全局的axios
const internalInstance = getCurrentInstance();
const axios = internalInstance.appContext.config.globalProperties.$axios;
// 定义一个事件，获取搜索框的内容，并传递给父组件
const submit = () => {
    if (input2.value) {
        let obj = {
            text: input2,
            // 能力有限，使用了watch导致提交的内容为一样搜索不起效果
            ra: Math.random()
        }
        emit('clickChild', obj)
    }
    // else if (input2.value == '') {
    //     let obj = {
    //         text: null,
    //         // 能力有限，使用了watch导致提交的内容为一样搜索不起效果
    //         ra: Math.random()
    //     }
    //     emit('clickChild', obj)
    // }
    else {
        ElMessage({
            message: '请输入搜索内容',
            type: 'warning',
        })
    }
}

const text_Nonull = (text) => {
    console.log(text);
    if (text == '') {
        input2.value = null
        let obj = {
            text: input2,
            // 能力有限，使用了watch导致提交的内容为一样搜索不起效果
            ra: Math.random()
        }
        emit('clickChild', obj)
    }
}


const input2 = ref('')
// watch(
//     () => input2.value,
//     (newVal) => {
//         console.log(newVal)
//         if (newVal == '') {
//             console.log('搜索框为空了')
//             input2.value = null
//         }
//     }
// )

const options = ref([
])
const add_options = ref([])



const vl = ref()
const dj = (i) => {
    if (vl.value === null || vl.value == 0) {
        vl.value = [0]
        // console.log('显示所有');
        emit('tabulation', vl.value)
    }
    else {
        // console.log('显示:' + vl.value);
        emit('tabulation', vl.value)
    }

}


























</script>
<style scoped>
.top {
    height: 10vh;
    line-height: 10vh;

}

.left {
    /* width: 60vw; */
    float: left;
    margin-left: 3vw;
}

.right {
    float: right;
    width: 10vw;
    height: 10vh;
}

.leftList {
    float: left;
    line-height: 10vh;
    margin-right: 3vw;

}



.required1 {
    color: red;
    position: absolute;
    left: -50px;
}

.required2 {
    color: red;
    position: absolute;
    margin-left: -78px;
}
</style>