<template>
  <div class="top">
    <div class="topImg">
      <el-avatar shape="circle" class="topImgImg"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-text class="mx-1" size="large" truncated type="primary">{{ usestore.name }}</el-text>
      <el-text v-if="usestore.limitsOfAuthority === 2" size="small" class="mx-1" type="warning">超级管理员</el-text>
      <el-text v-else-if="usestore.limitsOfAuthority === 1" size="small" class="mx-1" type="warning">管理员</el-text>
      <el-text v-else-if="usestore.limitsOfAuthority === 0" size="small" class="mx-1" type="success">普通用户</el-text>
      <el-text v-else="usestore.limitsOfAuthority === null" size="small" class="mx-1"
        type="danger">null</el-text>
    </div>
  </div>

  <el-row class="tac">
    <el-col :span="12">
      <el-menu background-color="#545c64" :unique-opened="true" class="el-menu-vertical-demo width" default-active="2"
        text-color="#fff" v-loading="loading" element-loading-background="rgba(122, 122, 122, 0.8)"
        element-loading-text="加载中...">
        
        <el-sub-menu :index=iten.index v-for="iten in menuData">
          <template #title> 
            <span>{{ iten.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index=subMenu.index v-for="subMenu in iten.subMenu"
            @click="handleMenuItemClick(subMenu.push)"
            >
              {{ subMenu.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>



  <el-affix position="bottom" :offset="0" widht="12vw">
    <el-popconfirm title="是否退出登录?" @confirm="logonExit()">
      <template #reference>
        <el-button class="bottom" type="danger">退出登录</el-button>
      </template>
    </el-popconfirm>
  </el-affix>
</template>
<script setup>
import router from '../../../router';
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'
import { reactify } from '@vueuse/shared';
import url from './../../../db/db'
import { ElMessage } from 'element-plus'

// 读取全局个人信息pinia
import {useStore} from './../../../store/index'
// 调用useStore函数来获取 store 实例
const usestore = useStore()




// 加载动画
const loading = ref(true)

// 调用axios，使用全局的axios
const internalInstance = getCurrentInstance();
const axios = internalInstance.appContext.config.globalProperties.$axios;



/**
 * 菜单
 */
const menuData = [
  {
    name: '员工信息管理', // 菜单名称
    index: '1', // 索引
  },
  {
    name: '考勤管理', // 菜单名称
    index: '2', // 索引
    subMenu:[
      {
        name: '考勤记录', // 菜单名称
        index: '2-1', // 索引
        push: 'attendanceRecordRoute' // 路由
      },
      {
        name: '加班管理', // 菜单名称
        index: '2-2', // 索引
        push: 'setupOvertimeManagementRouter'
      },
      {
        name: '出差管理', // 菜单名称
        index: '2-3', // 索引
        push: 'setupBusinessTripManagementRouter'
      },
      {
        name: '请假管理', // 菜单名称
        index: '2-4', // 索引
        push: 'setupLeaveManagementRouter'
      },
    ]
    
  },
  {
    name: '薪资管理', // 菜单名称
    index: '3', // 索引
    subMenu:[
      {
        name: '薪资标准管理', // 菜单名称
        index: '3-2', // 索引
      },
      {
        name: '薪资结构管理', // 菜单名称
        index: '3-3', // 索引
      },
      {
        name: '薪资计算', // 菜单名称
        index: '3-4', // 索引
      },
      {
        name: '薪资发放', // 菜单名称
        index: '3-5', // 索引
      },
    ]
  },
  {
    name: '绩效考核', // 菜单名称
    index: '8', // 索引
    subMenu:[
      {
        name: '绩效目标管理', // 菜单名称
        index: '8-1', // 索引
      },
      {
        name: '绩效考核标准管理', // 菜单名称
        index: '8-2', // 索引
      },
      {
        name: '绩效考核方法管理', // 菜单名称
        index: '8-3', // 索引
      },
      {
        name: '绩效考核', // 菜单名称
        index: '8-4', // 索引
      },
      {
        name: '绩效反馈', // 菜单名称
        index: '8-5', // 索引
      },
    ]
  }
]

const handleMenuItemClick = (path)=> {
  if (path) {
    router.push(`/uesdata/${path}`)
  }
}



const data = ref([])
// 注册一个回调函数，在组件挂载完成后执行。
onMounted(() => {
  axios.get(url.url + '/list')
    .then(function (response) {
      // 处理成功情况
      // console.log(response.data);
      if (response.status === 200) {
        data.value = response.data
        loading.value = false
      }
      else {
        // 抛出一个异常
        console.error('获取数据失败!');
      }
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });

    axios.get(url.url + '/ues/logon/uesrdata')
    .then(res => {
      usestore.name = res.data.uesrdata.name
      usestore.limitsOfAuthority = res.data.uesrdata.permission
    })
    .catch(error => {
      console.error(error)
      ElMessage({
        type: 'error',
        message: '加载数据失败！',
      })
      router.push('/logon')
    })
})

const click = (i) => {
  router.push('/uesdata/' + i)
}

/**
 * 这个方法用于用户退出。
 */
const logonExit = () => {
  axios.get(url.url + '/ues/logon/exit')
    .then(res => {
    })
    .catch(error => console.error(error))
    .finally(() => {
      document.cookie = 'session-id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      router.push('/logon')
    });
}




// data.push()

</script>
<style scoped>
.width {
  width: 12vw;
  height: 90vh;
}

.bottom {
  width: 12vw;
}

.top {
  width: 12vw;
  height: 20vh;
  background-color: #545c64;
  margin-bottom: 1px;
  padding-top: 10px;

}

.topImg {
  width: 5vw;
  height: 10vh;
  /* background-color: aliceblue; */
  margin: 0 auto;
}

.topImgImg {
  width: 5vw;
  height: 10vh;
}

.mx-1 {
  text-align: center;
  width: 5vw;
  display: block;
}
</style>