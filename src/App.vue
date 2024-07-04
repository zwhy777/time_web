<script setup>
import Sidebar from '@/components/sideBar/SideBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 在这里根据需要更新侧边栏的状态
  // 例如，可以根据当前路由来更新侧边栏菜单项的激活状态

  // 执行完逻辑后，继续导航
  next();
});
</script>

<template>
  <div>
    <Sidebar></Sidebar>
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
