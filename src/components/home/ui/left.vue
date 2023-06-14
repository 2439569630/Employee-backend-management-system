<template>
    <el-row class="tac">
    <el-col :span="12">
      <el-menu 
        background-color="#545c64"
        class="el-menu-vertical-demo width"
        default-active="2"
        text-color="#fff"
        v-loading="loading"
        element-loading-background="rgba(122, 122, 122, 0.8)"
        element-loading-text="加载中..."
      >
        <el-sub-menu :index=iten.id.toString() v-for="iten in data">
          <template #title>
            <span>{{ iten.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index=iten_sub.id.toString() v-for="iten_sub in iten.sub" @click="click(iten_sub.id)">{{ iten_sub.name }}</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script  setup>
import router from '../../../router';
import {ref, getCurrentInstance, onMounted} from 'vue'
import { reactify } from '@vueuse/shared';
import url from './../../../db/db' 
// 加载动画
const loading = ref(true)

// 调用axios，使用全局的axios
const internalInstance = getCurrentInstance();
const axios = internalInstance.appContext.config.globalProperties.$axios;
const data = ref([])
// 注册一个回调函数，在组件挂载完成后执行。
onMounted(() => {
  axios.get(url.url + '/list',)
        .then(function (response) {
            // 处理成功情况
            // console.log(response.data);
            console.dir(response)
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
})

const click = (i) => {
  router.push('/uesdata/' + i)
}
</script>
<style scoped>
    .width {
        width: 20vw;
        height: 90vh;
    }
</style>