<template>
    <div class="top">
        <div class="left">
            <div class="leftList">
                <el-cascader :options="options" clearable placeholder="所有岗位" @change="dj()" v-model="vl" />
            </div>
            <div class="leftList">
                <el-input v-model="input2" clearable  class="w-50 m-2" placeholder="请输入要搜索的员工名称" />
            </div>
            <div class="leftList">
                <el-button @click="submit">搜索</el-button>
            </div>

        </div>
        <div class="right">
        </div>
    </div>
</template>
<script setup>
import { ref, defineProps, watch, defineEmits, onMounted, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus'
// 调用axios，使用全局的axios
const internalInstance = getCurrentInstance();
const axios = internalInstance.appContext.config.globalProperties.$axios;
// 定义一个事件，获取搜索框的内容，并传递给父组件
const emit = defineEmits()
const submit = () => {
    if (input2.value) {
        let obj = input2
        emit('clickChild', obj)
    }
    else {
        ElMessage({
            message: '请输入搜索内容',
            type: 'warning',
        })
    }
}

const props = defineProps({
    // msg: {
    //     type: [Object, String],
    //     default: ''
    // }
})
watch(
    () => props.msg,
    (newVal) => {
        // console.log(newVal)
    }
)


const input2 = ref('')

const options = ref([
])
onMounted(() => {
    axios.get('http://192.168.31.80:9999/post')
        .then((req)=>{
            // 在这里需要添加一个 ‘所有岗位’
            let temporary = req.data
            temporary.unshift(({
                value: 0,
                label: '所有岗位' 
            }))
            options.value = temporary
        })  
        .catch((error)=>{
            ElMessage({
                type: 'error',
                message: '获取数据失败',
            })
        })
})


const vl = ref()
const dj = (i) => {
    if(vl.value === null || vl.value == 0){
        vl.value = [0]
        // console.log('显示所有');
        emit('tabulation', vl.value)
    }
    else{
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
</style>