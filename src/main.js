
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import axios from "axios";

// 引入 echarts
import * as echarts from 'echarts'

const app = createApp(App)
// 全局挂载 echarts
app.config.globalProperties.$echarts = echarts
axios.defaults.baseURL = 'http://localhost:8080'

app.use(createPinia())
app.use(router)

app.mount('#app')
