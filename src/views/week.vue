<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div class="border">
        <div class="header_center">
          <h2>
            <strong>{{user_name}}--时间管理系统</strong>
          </h2>
        </div>
        <el-button type="primary" style="margin-left: 150px;">主要按钮</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from "../components/sideBar/SideBar.vue";

const user_name = "";
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

.header_center {
  width: 30%;
  margin: 0px auto;
  color: black;
  text-align: center;
  height: 80px;
  /* background-image: url("./week_image/logoBg.png");
  background-size: 100% 100%; */
  font-family: "微软雅黑" !important;
  display: inline-block;
}
.border {
  border-bottom: 2px solid #000;
  text-align: center;
}
</style>
