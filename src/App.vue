<template>
  <div class="max">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>



<script setup>
</script>
<style>
  /* .max {
    /* width: 100vw;
    height: 100vh; */
    /* background-color: #000000; */
  /* } */
  html,body {
    margin: 0;
    padding: 0;
  }
</style>