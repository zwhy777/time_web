<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <div class="title">
          <div style="display: inline-block;">
            每日行程
          </div>
          <div style="float: right;">
            <el-dropdown>
              <el-button :icon="More" size="default" style="background-color: #F2F6FC;"></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div style="margin: 3%; height: 80vh;">
          <div style="text-align: right;">
            <el-button color="#c4d4ec"><label class="font">添加行程</label></el-button>
          </div>
          <div style="margin-top: 30px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
            <el-table :data="tableData" stripe style="width: 100%; height: 70vh;">
              <el-table-column prop="date" label="日期" width="280" />
              <el-table-column prop="time" label="时间" width="400" />
              <el-table-column prop="name" label="行程名称" width="280" />
              <el-table-column prop="type" label="类型" width="180" />
              <el-table-column prop="name" label="操作" />
            </el-table>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from '../components/sideBar/SideBar.vue';
import { More } from '@element-plus/icons-vue'
import router from "@/router";


const logout = () => {
  get('/api/auth/logout', (message) => {
    ElMessage.success(message);
    router.push('/');
  });
  // router.push('/');
};

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    time: 'No. 189, Grove St, Los Angeles',
    type: ''
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    time: 'No. 189, Grove St, Los Angeles',
    type: ''
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    time: 'No. 189, Grove St, Los Angeles',
    type: ''
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    time: 'No. 189, Grove St, Los Angeles',
    type: ''
  },
]
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #F2F6FC;

}

.content {
  flex: 1;
  margin-left: 200px;
  /* 与侧边栏宽度对应 */
  /* 添加其他样式，如内容区域的填充等 */
  height: 100%;
  width: 100%;

}

.title {
  font-size: 22px;
  color: #303133;
  font-weight: 800;
  padding: 20px;
  border-bottom: 2px solid #303133;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.font {
  font-size: 15px;
  color: #303133;
  font-weight: 600;
}
</style>
