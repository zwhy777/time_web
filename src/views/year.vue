<template>
  <div class="app">
<!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        检验鉴定模块
      </div>
    </div>
  </div>
</template>

<script setup>
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from '../components/sideBar/SideBar.vue';


</script>

<style scoped>
.app {
  display: flex;
}

.content {
  flex: 1;
  margin-left: 200px; /* 与侧边栏宽度对应 */
  /* 添加其他样式，如内容区域的填充等 */
}
</style>
