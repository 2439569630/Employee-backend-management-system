<template>
  <div class="body">
    <el-table :data="tableData" scrollbar-always-on height="100%" show-header stripe style="width: 100%"
    v-loading="loading"
    >
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
          <el-button size="small" type="danger"  @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


  <el-dialog v-model="dialogFormVisible" center align-center modal title="修改信息">
    <el-form :model="dialogFormVisibleData">
      <el-form-item label="id" :label-width="formLabelWidth">
        <el-input v-model="dialogFormVisibleData.id" disabled placeholder="0" />
      </el-form-item>
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
</template>
<script setup>

import { ref, watch, defineProps, getCurrentInstance, reactive, onMounted, defineEmits } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router';
import { objectPick } from '@vueuse/shared';
// import { arrow } from '@popperjs/core';
import { ElLoading } from 'element-plus'
import urlconfig from './../../../../db/db'

// 加载动画
const loading = ref()


// 接收父组件的内容
const props = defineProps({
  // msg是表的数据
  msg: {
    type: [Object, String],
    default: ''
  },
  // 这里表示要筛选显示哪个岗位
  post: {
    type: [Number, String],
    default: 0
  },
  search_for: {
    type: [Number, String, Object],
    default: 0
  },
  loadingState: {
    type: [Number, String], 	
    default: '',
  }
})






const emit = defineEmits(['update'])


const complete = () => {
  loading.value = true
  const requiredFields = ['id', 'name', 'region', 'birthday'];
  const requiredFieldsNotEmpty = requiredFields.every(field => dialogFormVisibleData[field] !== '' && dialogFormVisibleData[field] !== null);
  if (requiredFieldsNotEmpty) {
    const url = urlconfig.url + '/modify'
    const params = { id: dialogFormVisibleData.id, name: dialogFormVisibleData.name, region: dialogFormVisibleData.region, birthday: dialogFormVisibleData.birthday, post_name: dialogFormVisibleData.post_name, textarea: dialogFormVisibleData.textarea }
    // console.log(dialogFormVisibleData.post_name[0]);
    axios.get(url, { params })
      .then((response) => {
        // 提示父组件更新数据
        emit('update', 200)
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
  axios.get(urlconfig.url + '/post')
    .then((req) => {
      options.value = req.data
      console.table(options.value)
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
      loading.value = true
      axios.get(urlconfig.url + '/delete?delete=' + id.id)
        .then((response) => {
          // 删除成功响应
          ElMessage({
            type: 'success',
            message: response.data.msg,
          })
          // 提示父组件更新数据
          emit('update', 200)
        })
        .catch((error) => {
          console.log(error);
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

watch(
  () => props.loadingState,
  (newVal) => {
    // 加载中
    if (newVal === true) {
      loading.value = true
    }
    else {
      loading.value = false
    }
  }
)




// 岗位的筛选
watch(
  () => props.post,
  (newVal) => {
    if (newVal === 0) {
      // 这里的等于0代表着显示全部并不需要筛选就直接给数据就好
      return tableData.value = props.msg
    }
    else {
      // 这里代表着需要筛选
      tableData.value = []
      // 这里继续判断这次筛选看看搜索框里是否有内容，如果有那就把搜索框要搜索的姓名也加上
      if (props.search_for['text']) {
        console.log('搜索框有内容')
        props.msg.forEach((element) => {
          // 先判断是否有这个员工的名称，在判断有没有这个岗位
          if (element['name'].includes(props.search_for['text'])) {
            if (element['poid'] === newVal) {
              tableData.value.push(element)
            }
          }
        })
      }
      else {
        props.msg.forEach(element => {
          if (element['poid'] === newVal) {
            tableData.value.push(element)
          }
        })
      }
    }

  }
)

// 监听 props.msg 的变化，根据岗位和搜索框的内容对数据进行筛选
// 更新 tableData.value 数组中的数据
watch(
  () => props.msg,
  (newVal) => {
    // 清空 tableData.value 数组
    tableData.value = []
    // 如果岗位为全部，不需要按岗位筛选
    if (props.post === 0) {
      if (props.search_for['text']) {
        // 如果搜索框有内容，只保留名称中包含搜索框内容的元素
        console.log('岗位为全部，搜索框筛选')
        props.msg.forEach((element) => {
          if (element['name'].includes(props.search_for['text'])) {
            // 把符合条件的元素添加到 tableData.value 数组中
            tableData.value.push(element)
          }
        })
      }
      else {
        // 如果搜索框为空，直接把 props.msg 的所有元素添加到 tableData.value 数组中
        tableData.value = props.msg
      }
    }
    else {
      // 如果岗位不为全部，需要按岗位筛选
      if (props.search_for['text']) {
        // 如果搜索框有内容，需要同时按名称和岗位筛选
        props.msg.forEach(element => {
          if (element['name'].includes(props.search_for['text'])) {
            // 如果名称包含搜索框内容，再判断岗位是否相同
            if (element['poid'] === props.post) {
              // 如果岗位相同，把符合条件的元素添加到 tableData.value 数组中
              tableData.value.push(element)
            }
          }
        })
      }
      else {
        // 如果搜索框为空，只按岗位筛选
        props.msg.forEach(element => {
          if (element['poid'] === props.post) {
            // 如果岗位相同，把符合条件的元素添加到 tableData.value 数组中
            tableData.value.push(element)
          }
        })
      }
    }
  }
)































// search_for
// 这里是处理要搜索框要搜索的
watch(
  () => props.search_for,
  (newVal) => {
    // 提示父组件更新数据
    emit('update', 200)
    // 打印出搜索框的内容
    console.log(newVal['text'])
    // 先清空表数据
    tableData.value = []
    if (newVal['text'] === null) {
      // 如果搜索框为空，不需要按名称筛选
      if (props.post === 0) {
        // 如果岗位为全部，直接把 props.msg 的所有元素添加到 tableData.value 数组中
        tableData.value = props.msg
      }
      else {
        // 如果岗位不为全部，只按岗位筛选
        props.msg.forEach((element) => {
          if (element['poid'] === props.post) {
            // 如果岗位相同，把符合条件的元素添加到 tableData.value 数组中
            tableData.value.push(element)
          }
        })
      }
    }
    else {
      // 如果搜索框有内容，需要按名称筛选
      console.log('搜索框有内容，岗位为全部');
      if (props.post === 0) {
        // 如果岗位为全部，不需要按岗位筛选
        props.msg.forEach((element) => {
          if (element['name'].includes(newVal['text'])) {
            // 如果名称包含搜索框内容，把符合条件的元素添加到 tableData.value 数组中
            tableData.value.push(element)
          }
        })
      }
      else {
        // 如果岗位不为全部，需要同时按名称和岗位筛选
        props.msg.forEach((element) => {
          if (element['poid'] === props.post) {
            // 如果岗位相同，再判断名称是否包含搜索框内容
            if (element['name'].includes(newVal['text'])) {
              // 如果名称包含搜索框内容，把符合条件的元素添加到 tableData.value 数组中
              tableData.value.push(element)
            }
          }
        })
      }
    }
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