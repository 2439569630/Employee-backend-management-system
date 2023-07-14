<template>
  <div class="top">
    <div class="topImg">
      <el-avatar
        shape="circle"
        class="topImgImg"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <el-text class="mx-1" size="large" truncated type="primary">{{ personalInformation.name }}</el-text>
      <el-text v-if="personalInformation.limitsOfAuthority === 2" size="small" class="mx-1" type="warning">超级管理员</el-text>
      <el-text v-if="personalInformation.limitsOfAuthority === 1" size="small" class="mx-1" type="warning">管理员</el-text>
      <el-text v-if="personalInformation.limitsOfAuthority === 0" size="small" class="mx-1" type="success">普通用户</el-text>
      <el-text v-if="personalInformation.limitsOfAuthority === null" size="small" class="mx-1" type="danger">null</el-text>
    </div>
  </div>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu background-color="#545c64"  :unique-opened="true" class="el-menu-vertical-demo width" default-active="2" text-color="#fff"
        v-loading="loading" element-loading-background="rgba(122, 122, 122, 0.8)" element-loading-text="加载中...">
        <el-sub-menu :index=iten.id.toString() v-for="iten in data">
          <template #title> 
            <span>{{ iten.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index=iten_sub.id.toString() v-for="iten_sub in iten.sub" @click="click(iten_sub.id)">{{
              iten_sub.name }}</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
  <el-affix  position="bottom" :offset="0" widht="12vw">
    <el-popconfirm title="是否退出登录?" @confirm="logonExit()">
    <template #reference>
      <el-button class="bottom" type="danger" >退出登录</el-button>
    </template>
  </el-popconfirm>
  </el-affix>
</template>
<script  setup>
import router from '../../../router';
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'
import { reactify } from '@vueuse/shared';
import url from './../../../db/db'
// 加载动画
const loading = ref(true)

// 调用axios，使用全局的axios
const internalInstance = getCurrentInstance();
const instance = internalInstance.appContext.config.globalProperties.$axios;


const data = ref([])
// 注册一个回调函数，在组件挂载完成后执行。
onMounted(() => {
  instance.get(url.url + '/list')
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

  instance.get(url.url + '/ues/logon/uesrdata')
    .then(res => {
      console.log(res.data)
      
      personalInformation.limitsOfAuthority = res.data.uesrdata.permission
      personalInformation.name = res.data.uesrdata.name
    })
    .catch(error => {
      console.error(error)
      personalInformation.limitsOfAuthority = null
      personalInformation.name = 'null'
    })
})

const click = (i) => {
  router.push('/uesdata/' + i)
}

/**
 * 这个方法用于用户退出。
 */
const logonExit = () => {
  instance.get(url.url + '/ues/logon/exit')
    .then(res => {
    })
    .catch(error => console.error(error))
    .finally(() => {
      document.cookie = 'session-id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      router.push('/logon')
    });
}

/**
 * 个人信息对象。
 * @property {string} name - 用户名。
 * @property {number} limitsOfAuthority - 用户的权限。
 */
const personalInformation = reactive({
  name: 'admin',
  limitsOfAuthority: 0
})

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