<template>
  <div class="body">
    <el-table :data="tableData" scrollbar-always-on height="100%" show-header stripe style="width: 100%">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="post_name" label="岗位" />
      <el-table-column prop="other" label="备注" />
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <!-- @click="handleEdit(scope.$index, scope.row) -->
          <el-button size="small" @click="dialogFormVisible = true; dialogFormVisibleEvent(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


  <el-dialog v-model="dialogFormVisible" center align-center modal title="修改信息">
    <el-form :model="dialogFormVisibleData">

      <el-form-item label="id" :label-width="formLabelWidth">
        <el-input v-model="dialogFormVisibleData.id" disabled placeholder="0" />
      </el-form-item>
      <!-- <el-form-item label="id" :label-width="formLabelWidth">
        <el-input v-model="dialogFormVisibleData.id" disabled placeholder="0" />
      </el-form-item> -->



      <el-form-item label="姓名" :label-width="formLabelWidth">
        <span class="required1">*</span>
        <el-input v-model="dialogFormVisibleData.name" width="10" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <span class="required1">*</span>
        <el-select v-model="dialogFormVisibleData.region" placeholder="男">
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
        <el-cascader :options="options" placeholder="选择岗位" @change="dj()" v-model="dialogFormVisibleData.post_name" />
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="dialogFormVisibleData.textarea" :rows="2" type="textarea" placeholder="备注" />
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
</template>
<script setup>
import { ref, watch, defineProps, getCurrentInstance, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router';
import { objectPick } from '@vueuse/shared';
// import { arrow } from '@popperjs/core';



const complete = () => {
  const requiredFields = ['id', 'name', 'region', 'birthday'];
  const requiredFieldsNotEmpty = requiredFields.every(field => dialogFormVisibleData[field] !== '' && dialogFormVisibleData[field] !== null);
  if (requiredFieldsNotEmpty) {
    const url = 'http://192.168.31.80:9999/modify'
    const params = { id: dialogFormVisibleData.id, name: dialogFormVisibleData.name, region: dialogFormVisibleData.region, birthday: dialogFormVisibleData.birthday, post_name: dialogFormVisibleData.post_name, textarea: dialogFormVisibleData.textarea}
    // console.log(dialogFormVisibleData.post_name[0]);
    axios.get(url, { params })
    .then((response) => {
      ElMessage({
            type: 'success',
            message: response.data.msg,
          })
    })
    .catch((error) => {
      console.log(error.response.data.msg);
      ElMessage({
        type: 'error',
        message: error.response.data.msg,
      })
    })
    dialogFormVisible.value = false
    
  } else {
    ElMessage({
        type: 'error',
        message: '参数不能为空',
      })
  }
}
// setInterval(()=>{
//   console.log(dialogFormVisibleData.post_name);
// },1000)
// 界面是否弹出的状态
const dialogFormVisible = ref(false)
const dialogFormVisibleEvent = (ListData) => {
  dialogFormVisibleData.id = ListData.id
  dialogFormVisibleData.name = ListData.name
  dialogFormVisibleData.region = ListData.sex
  dialogFormVisibleData.birthday = ListData.birthday
  dialogFormVisibleData.post_name = ListData.poid
  dialogFormVisibleData.textarea = ListData.other
  console.log(ListData.poid);

}
// 由于选定时返回的是对象，这里需要处理下不能是对象，要的是数字
const dj = () => {
  dialogFormVisibleData.post_name = dialogFormVisibleData.post_name[0]
}
const dialogFormVisibleData = reactive({
  id: 0,
  name: '',
  region: '',
  birthday: '',
  post_name: '',
  textarea: ''
}) 
const formLabelWidth = '140px'
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
// 岗位列表
const options = ref([])
// onMounted 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码
onMounted(() => {
  axios.get('http://192.168.31.80:9999/post')
    .then((req) => {
      options.value = req.data
      console.log(options.value);
    })
    .catch((error) => {
      ElMessage({
        type: 'error',
        message: error,
      })
    })
})



const route = useRoute();
// 调用axios，使用全局的axios
const internalInstance = getCurrentInstance();
const axios = internalInstance.appContext.config.globalProperties.$axios;

let tableData = ref([])






// 修改事件

const handleEdit = () => {

}















// 点击删除的事件          id=个人信息的id
const handleDelete = (id) => {
  ElMessageBox.confirm(
    '是否要永久删除该员工：' + id.name,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      // http://127.0.0.1:9999/delete?delete=
      axios.get('http://192.168.31.80:9999/delete?delete=' + id.id)
        .then((response) => {
          // 删除成功响应
          ElMessage({
            type: 'success',
            message: response.data.msg,
          })
          // 进行数据更新
          axios.get('http://192.168.31.80:9999/data?id=' + route.params.id,)
            .then(function (response) {
              // 处理成功情况
              tableData.value = response.data
              console.log(response.data);
            })
            .catch(function (error) {
              // 处理错误情况
              ElMessage({
                type: 'error',
                message: '数据更新失败',
              })
            })
        })
        .catch((error) => {
          ElMessage({
            type: 'error',
            message: '删除失败1',
          })
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })

}



// 接收父组件的内容
const props = defineProps({
  msg: {
    type: [Object, String],
    default: ''
  },
  post: {
    type: [Number, String],
    default: 0
  }
})



watch(
  () => props.post,
  (newVal) => {
    if (newVal === 0) {
      return tableData.value = props.msg
    }
    tableData.value = []
    props.msg.forEach(element => {
      if (element['poid'] === newVal) {
        tableData.value.push(element)
      }
    })
  }
)

// 更改列表的值
watch(
  () => props.msg,
  (newVal) => {
    tableData.value = newVal
    // console.log(tableData)
  }
)



</script>

<style scoped>
.body {
  background-color: #F5F5F5;
  height: 80%;
  margin-left: 3vw;
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