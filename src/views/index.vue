<template>
  <div class="app">
<!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        欢迎进入生物安全系统
      </div>
      <div>
        <el-button @click="logout" type="danger" plain>退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from '../components/sideBar/SideBar.vue';
import router from "@/router";

const logout = () => {
  get('/api/auth/logout', (message) => {
    ElMessage.success(message);
    router.push('/');
  });
  // router.push('/');
};
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
