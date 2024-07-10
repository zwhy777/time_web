<template>
  <div style="width: 100vw;height: 100vh;overflow: hidden;display: flex">
    <div style="flex: 1;background-color: dodgerblue">
      <el-image style="width: 100%;height: 100%" fit="cover"
                src="https://ts1.cn.mm.bing.net/th/id/R-C.d0bd3565ac8ba1be161ed4924a3ecd4c?rik=ETrP2K0UNpL6TQ&riu=http%3a%2f%2fimage.uokon.cn%2f1872-time.jpg&ehk=DN%2fOsw8tkEm5smMflOOY728iXf2NYEIdnVsukPvhG2A%3d&risl=&pid=ImgRaw&r=0"></el-image>
    </div>
    <div class="welcome-title">
      <div style="font-size: 30px;font-weight: bold" :style="{ width: `${windowWidth - 350}px` }">Welcome to the Time Management System</div>
      <div style="font-size: 18px;margin-top: 1vh" :style="{ width: `${windowWidth - 350}px` }">With this system, you can fully manage and allocate your time and improve efficiency</div>
    </div>
    <div style="width: 20vw;min-width: 300px">
      <router-view v-slot="{Component}">
        <transition mode="out-in" name="el-fade-in-linear">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.welcome-title{
  position: absolute;
  bottom: 3vh;
  left: 2vw;
  color: white;
  text-shadow: 0 0 10px black;
}
</style>
