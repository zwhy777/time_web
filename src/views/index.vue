<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <div class="title">
          <strong style="display: inline-block">行程</strong>

          <div style="float: right">
            <el-dropdown>
              <el-button
                :icon="More"
                size="default"
                style="background-color: #f2f6fc"
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div style="margin: 3%; height: 80vh; text-align: center; width: 80vw">
          <div style="width: 10vw; display: inline-block; margin-right: 60vw">
            <el-segmented
              v-model="tripType"
              :options="options"
              block
              @change="changeType()"
            />
          </div>
          <div style="display: inline-block">
            <el-button color="#c4d4ec" @click="dialogVisible = true">
              <label class="font">添加行程</label>
            </el-button>
          </div>
          <el-dialog
            v-model="dialogVisible"
            title="增加行程"
            width="1000"
            :before-close="handleClose"
          >
            <div
              style="
                padding: 20px 30px;
                margin: 10px 20px;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
              "
            >
              <el-form
                :model="form"
                label-width="auto"
                style="max-width: 800px"
              >
                <el-form-item>
                  <div class="font2">行程名：</div>
                  <el-input
                    placeholder="请输入行程名"
                    v-model="form.name"
                    style="width: 60%"
                  />
                </el-form-item>
                <el-form-item>
                  <div class="font2">行程类型：</div>
                  <el-select
                    v-model="form.type"
                    placeholder="请选择该行程类型"
                    style="width: 60%"
                  >
                    <el-option label="娱乐" value="娱乐" />
                    <el-option label="学习" value="学习" />
                    <el-option label="工作" value="工作" />
                    <el-option label="运动" value="运动" />
                    <el-option label="睡觉" value="睡觉" />
                    <el-option label="杂事" value="杂事" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <div class="font2">活动时间：</div>
                  <div style="width: 60%">
                    <el-date-picker
                      v-model="time"
                      type="datetimerange"
                      range-separator="To"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                    />
                  </div>
                </el-form-item>
                <el-form-item>
                  <div class="font2">备注：</div>
                  <el-input
                    placeholder="请输入备注"
                    v-model="form.remark"
                    style="width: 60%"
                  />
                </el-form-item>
              </el-form>
            </div>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addTrip">确认</el-button>
              </div>
            </template>
          </el-dialog>
          <div
            style="
              margin-top: 30px;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            "
          >
            <el-table :data="showData" stripe style="width: 100%; height: 70vh">
              <el-table-column prop="beginTime" label="日期" width="280" />
              <el-table-column prop="endTime" label="时间" width="400" />
              <el-table-column prop="name" label="行程名称" width="280" />
              <el-table-column prop="type" label="类型" width="180" />
              <el-table-column prop="id" label="操作" fixed="right">
                <template v-slot="{ row }">
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteLine(row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get, post } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from "../components/sideBar/SideBar.vue";
import { More } from "@element-plus/icons-vue";
import router from "@/router";
import { ref, reactive, onBeforeMount } from "vue";
// import { fr } from "element-plus/es/locale";

const options = ["所有行程", "每日行程"];
const tripType = ref("所有行程");
const tableData = ref([]);
const showData = ref([]);

const time = ref("");
onBeforeMount(() => {
  //显示在表格上
  post("/api/index/list_trip", {}, (data) => {
    // data.forEach((element) => {
    //   tableData.value.name = element.name;
    //   tableData.value.date = element.beginTime;
    //   tableData.value.time = element.endTime;
    //   console.log(element.name);
    //   console.log(element.beginTime);
    //   console.log(element.endTime - element.beginTime);
    //   console.log(element.type);
    // });
    tableData.value = data;
    tableData.value.forEach((element) => {
      element.endTime = calculateDuration(element.beginTime, element.endTime);
    });
    showData.value = tableData.value;
    // tableData.name = data.name;
    // console.log(data[0].name);
    // tableData.date = data.beginTime;
    // tableData.time = data.endTime - data.beginTime;
    // tableData.type = data.type;
    // console.log(data.name);
  });
});

//计算两个日期之间的时间差值
function calculateDuration(startDateStr, endDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  // 计算时间差值（单位为毫秒）
  const timeDiff = endDate - startDate;
  // 将毫秒转换为小时、分钟和秒
  const hours = Math.floor(timeDiff / 3600000);
  const minutes = Math.floor((timeDiff % 3600000) / 60000);
  const seconds = Math.floor((timeDiff % 60000) / 1000);

  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

const changeType = () => {
  if (tripType.value == "每日行程") {
    showData.value = [];
    let currentDate = new Date();
    tableData.value.forEach((element) => {
      let datetime = new Date(element.beginTime);
      if (
        datetime.getFullYear() == currentDate.getFullYear() &&
        datetime.getMonth() == currentDate.getMonth() &&
        datetime.getDate() == currentDate.getDate()
      ) {
        showData.value.push(element);
      }
    });
  } else {
    showData.value = tableData.value;
  }
};

const addTrip = () => {
  form.date = time.value[0];
  form.time = time.value[1];
  dialogVisible.value = false;
  //添加行程
  post(
    "/api/index/add_trip",
    {
      name: form.name,
      type: form.type,
      beginTime: form.date,
      endTime: form.time,
      notes: form.remark,
    },
    (message) => {
      ElMessage.success("新建成功");
      post("/api/index/list_trip", {}, (data) => {
        tableData.value = data;
        tableData.value.forEach((element) => {
          element.endTime = calculateDuration(
            element.beginTime,
            element.endTime
          );
        });
        showData.value = tableData.value;
      });
    },
    (message) => {}
  );
};

const logout = () => {
  get("/api/auth/logout", (message) => {
    ElMessage.success(message);
    router.push("/");
  });
  // router.push('/');
};

const deleteLine = (id) => {
  tableData.value = tableData.value.filter((item) => item.id != id);
  showData.value = tableData.value;
  post(
    "/api/index/delete_trip",
    {
      id: id,
    },
    (data) => {
      ElMessage.success(data);
    },
    (data) => {
      ElMessage.error(data);
    }
  );
};

const dialogVisible = ref(false);

const form = reactive({
  id: "",
  name: "",
  type: "",
  date: "",
  time: "",
  hour: "",
  minute: "",
  remark: "",
});
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #f2f6fc;
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
  height: 7vh;
  font-size: 22px;
  color: #303133;
  padding-top: 3vh;
  padding-right: 3vw;
  font-family: "微软雅黑" !important;
  text-align: center;
  border-bottom: 2px solid #303133;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.font {
  font-size: 15px;
  color: #303133;
  font-weight: 600;
}

.font2 {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  width: 100px;
}
</style>
