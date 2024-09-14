<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div class="border">
        <div class="header_center">
          <strong>Time management system</strong>
        </div>
      </div>
      <div class="upshow">
        <el-card style="width: 33%; margin: 10px; text-align: center; height: 13vh">
          <div class="showTime">
            <div class="beginTime">
              <span style="flex: 1; margin-bottom: 10px">Start time</span>
              <span style="flex: 1">{{ beginTime }}</span>
            </div>
            <div class="endTime">
              <span style="flex: 1; margin-bottom: 10px">End time</span>
              <span style="flex: 1">{{ endTime }}</span>
            </div>
          </div>
        </el-card>
        <el-card style="width: 33%; margin: 10px; text-align: center; height: 13vh">
          <div class="showTime">
            <div class="beginTime">
              <span style="flex: 1; margin-bottom: 10px">Working hours</span>
              <span style="flex: 1">{{ worktime }}</span>
            </div>
            <div class="endTime">
              <span style="flex: 1; margin-bottom: 10px">Studying hours</span>
              <span style="flex: 1">{{ studytime }}</span>
            </div>
          </div>
        </el-card>
        <el-card style="width: 33%; margin: 10px; text-align: center; height: 13vh">
          <div class="showTime">
            <div class="beginTime">
              <span style="flex: 1; margin-bottom: 10px">Sports(times)</span>
              <span style="flex: 1">{{ sporttime }}</span>
            </div>
            <div class="endTime">
              <span style="flex: 1; margin-bottom: 10px">Amusement(times)</span>
              <span style="flex: 1">{{ playtime }}</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="pieShow">
        <el-card
          style="
            width: 45%;
            height: 70vh;
            flex: 1;
            margin: 10px;
            text-align: center;
          "
        >
          <div style="margin-bottom: 30px; text-align: center">Summary of various types of time</div>
          <div ref="myChart1" id="myChart1" style="width: 100%; height: 55vh"></div>
        </el-card>

        <el-card
          style="
            width: 45%;
            height: 70vh;
            flex: 1;
            margin: 10px;
            text-align: center;
          "
        >
          <div style="margin-bottom: 50px; text-align: center">All kinds of time proportion</div>
          <div ref="myChart" id="myChart" style="width: 100%; height: 55vh"></div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get, post } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from "../components/sideBar/SideBar.vue";
import * as echarts from "echarts";
import { ref, reactive } from "vue";

import { getCurrentInstance, onBeforeMount, onMounted } from "vue";

const beginTime = ref("");
const endTime = ref("");
const worktime = ref("");
const studytime = ref("");
const sporttime = ref("");
const playtime = ref("");
const rawData = ref([]);

onBeforeMount(() => {
  post(
    "/api/index/show_pieChart",
    {
      type: 3,
    },
    (data) => {
      var chartDom = document.getElementById("myChart");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: data[0], name: "chores" },
              { value: data[1], name: "sport" },
              { value: data[2], name: "sleep" },
              { value: data[3], name: "study" },
              { value: data[4], name: "work" },
              { value: data[5], name: "amusement" },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    }
  );

  post(
    "/api/index/show_histogram",
    {
      type: 3,
    },
    (data) => {
      rawData.value = data;
      console.log(rawData.value);

      let currentDate = new Date();
      let currentDay = currentDate.getDay();
      let diff =
        currentDate.getDate() - currentDay + (currentDay == 0 ? -6 : 1); // 计算本周周一的日期
      let monday = new Date(currentDate.setDate(diff));

      //console.log(formatDate(monday));
      beginTime.value = formatDate(monday);

      let sunday = new Date(currentDate.setDate(diff + 6)); // 计算本周周末的日期
      //console.log(formatDate(sunday));
      endTime.value = formatDate(sunday);

      const currentYear = currentDate.getFullYear();
      // 获取当前年份的第一天（1月1日）
      const firstDate = new Date(currentYear, 0, 1);
      // 获取当前年份的最后一天（12月31日）
      const lastDate = new Date(currentYear, 11, 31);
      beginTime.value = formatDate(firstDate);
      endTime.value = formatDate(lastDate);

      post(
        "/api/index/show_week",
        {
          begin: beginTime.value,
          end: endTime.value,
        },
        (data) => {
          worktime.value = data[0];
          studytime.value = data[1];
          sporttime.value = data[3];
          playtime.value = data[2];
        }
      );

      var chartDom1 = document.getElementById("myChart1");
      var myChart1 = echarts.init(chartDom1);
      var option;

      const totalData = [];
      for (let i = 0; i < rawData.value[0].length; ++i) {
        let sum = 0;
        for (let j = 0; j < rawData.value.length; ++j) {
          sum += rawData.value[j][i];
        }
        totalData.push(sum);
      }
      const grid = {
        left: 100,
        right: 100,
        top: 50,
        bottom: 50,
      };
      const series = [
        "chores",
        "sport",
        "sleep",
        "study",
        "work",
        "amusement",
      ].map((name, sid) => {
        return {
          name,
          type: "bar",
          stack: "total",
          barWidth: "60%",
          label: {
            show: true,
            formatter: (params) => Math.round(params.value * 1000) / 10 + "%",
          },
          data: rawData.value[sid].map((d, did) =>
            totalData[did] <= 0 ? 0 : d / totalData[did]
          ),
        };
      });
      option = {
        legend: {
          selectedMode: false,
        },
        grid,
        yAxis: {
          type: "value",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        series,
      };

      option && myChart1.setOption(option);
    }
  );
});

//将Date格式的日期转换为2024-07-08的格式
const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
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
  margin-left: 200px; /* 与侧边栏宽度对应 */
  /* 添加其他样式，如内容区域的填充等 */
}

.header_center {
  height: 7vh;
  padding-top: 3vh;
  padding-right: 3vw;
  font-size: 22px;
  width: 30%;
  margin: auto;
  color: black;
  text-align: center;
  /* background-image: url("./week_image/logoBg.png");
  background-size: 100% 100%; */
  font-family: "微软雅黑" !important;
  display: inline-block;
}
.border {
  height: 10vh;
  border-bottom: 2px solid #000;
  text-align: center;
}

.upshow {
  display: flex;
  flex-direction: row;
}

.showTime {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
}
.beginTime {
  flex: 1;
  height: 100%;
  width: 50%;
  /* background-color: aqua; */
  margin: 5px 10px 10px 10px;
  display: flex;
  flex-direction: column;
}

.endTime {
  flex: 1;
  width: 50%;
  /* background-color: blueviolet; */
  margin: 5px 10px 10px 10px;
  display: flex;
  flex-direction: column;
}

.pieShow {
  display: flex;
  flex-direction: row;
}
</style>
