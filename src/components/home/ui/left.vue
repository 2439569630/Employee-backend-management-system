<template>
    <el-row class="tac">
    <el-col :span="12">
      <el-menu 
        background-color="#545c64"
        class="el-menu-vertical-demo width"
        default-active="2"
        text-color="#fff" 
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
<script setup>
import router from '../../../router';
import {ref} from 'vue'
const data = [
  {
    id: 1,
    name: "财务部",
    super: 0,
    sub: [
      {
        id: 4,
        name: "武汉财务部",
        super: 0
      },
      {
        id: 5,
        name: "武中财务部",
        super: 0
      },
    ],
  },
  {
    id: 2,
    name: "人事部",
    super: 0,
    sub: [
      {
        id: 6,
        name: "武汉人事部",
        super: 0
      },
      {
        id: 7,
        name: "武中人事部",
        super: 0
      },
    ],
  },
  {
    id: 3,
    name: "技术部",
    super: 0,
    sub: [
      {
        id: 8,
        name: "武汉技术部",
        super: 0
      },
      {
        id: 9,
        name: "武中技术部",
        super: 0
      },
    ],
  },
];

// const url = {
//   '1_1': '/whcwb',
//   '1_2': '/bjcwb',
//   '1_3': '/xzcwb',
//   '2_1': '/nccpb',
//   '2_2': '/xlcpb',
//   '3_1': '/szxsb'
// }
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