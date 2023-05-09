<template>
    <el-row class="tac">
    <el-col :span="12">
      <el-menu 
        background-color="#545c64"
        class="el-menu-vertical-demo width"
        default-active="2"
        text-color="#fff" 
      >
        <el-sub-menu index="1">
          <template #title>
            <span>财务部</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1_1" @click="click('1_1')">武汉财务部</el-menu-item>
            <el-menu-item index="1_2" @click="click('1_2')">徐州财务部</el-menu-item>
            <el-menu-item index="1_3" @click="click('1_3')">北京财务部</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <span>产品部</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2_1" @click="click('2_1')">南昌产品部</el-menu-item>
            <el-menu-item index="2_2" @click="click('2_2')">西凉产品部</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3"> 
          <template #title>
            <span>销售部</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3_1" @click="click('3_1')">深圳销售部</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script setup>
import router from '../../../router';
import {ref} from 'vue'
const data = ref([
  {
    id: 1,
    name: '财务部',
    super: 0
  },
  {
    id: 2,
    name: '产品部',
    super: 0
  },
  {
    id: 3,
    name: '销售部',
    super: 0
  },
  {
    id: 4,
    name: '财务部',
    super: 1
  },
])
const url = {
  '1_1': '/whcwb',
  '1_2': '/bjcwb',
  '1_3': '/xzcwb',
  '2_1': '/nccpb',
  '2_2': '/xlcpb',
  '3_1': '/szxsb'
}
const click = (i) => {
  router.push(url[i])
  console.log(url[i]);
}
</script>
<style scoped>
    .width {
        width: 20vw;
        height: 90vh;
    }
</style>