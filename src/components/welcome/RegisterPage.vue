<template>
  <div style="margin: 0 2vw;text-align: center">
    <div style="margin-top: 8vh">
      <div style="font-size: 25px">注册新用户</div>
      <div style="font-size: 14px;color: grey;margin-top: 1vh">欢迎注册生物安全平台，请在下方填写相信息。</div>
    </div>
    <div style="margin-top: 4vh">
      <el-input v-model="form.username" type="text" placeholder="用户名">
        <template #prefix>
          <el-icon><user/></el-icon>
        </template>
      </el-input>
      <el-input v-model="form.password" type="password" placeholder="密码" style="margin-top: 1vh">
        <template #prefix>
          <el-icon><lock/></el-icon>
        </template>
      </el-input>
      <el-input v-model="form.password_repeat" type="password" placeholder="重复密码" style="margin-top: 1vh">
        <template #prefix>
          <el-icon><lock/></el-icon>
        </template>
      </el-input>
      <el-input v-model="form.email" type="email" placeholder="电子邮箱" style="margin-top: 1vh">
        <template #prefix>
          <el-icon><message/></el-icon>
        </template>
      </el-input>
    </div>
    <div style="margin-top: 1vh">
      <el-row style="width: 100%;margin: 0">
        <el-col :span="14">
          <el-input v-model="form.code" type="text" placeholder="请输入验证码">
            <template #prefix>
              <el-icon><EditPen/></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="10" style="padding: 0;text-align: right">
          <el-button type="success">获取验证码</el-button>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 8vh">
      <el-button style="width: 12vw" type="warning" plain>立即注册</el-button>
    </div>
    <div style="margin-top: 2vh">
      <span style="font-size: 14px;color: grey">已有帐号？</span>
      <el-link type="primary" style="translate: 0 -2px" @click="router.push('/')">立即登录</el-link>
    </div>
  </div>
</template>

<script setup>

import {EditPen, Lock, Message, User} from "@element-plus/icons-vue";
import router from "@/router";
import {reactive} from "vue";

const form =reactive({
  username:'',
  password:'',
  password_repeat:'',
  email:'',
  code:''
})
</script>

<style scoped>

</style>
