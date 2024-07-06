<template>
  <div style="margin: 0 2vw;text-align: center">
    <div style="margin-top: 8vh">
      <div style="font-size: 25px">注册新用户</div>
      <div style="font-size: 14px;color: grey;margin-top: 1vh">欢迎注册生物安全平台，请在下方填写相信息。</div>
    </div>
    <div style="margin-top: 4vh">
      <el-form :model="form" :rules="rules" @validate="onValidate" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model="form.username" type="text" placeholder="用户名">
            <template #prefix>
              <el-icon><user/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码">
            <template #prefix>
              <el-icon><lock/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password_repeat">
          <el-input v-model="form.password_repeat" type="password" placeholder="重复密码">
            <template #prefix>
              <el-icon><lock/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email" type="email" placeholder="电子邮箱">
            <template #prefix>
              <el-icon><message/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row style="width: 100%;margin: 0">
            <el-col :span="14">
              <el-input v-model="form.code" type="text" placeholder="请输入验证码">
                <template #prefix>
                  <el-icon><EditPen/></el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="10" style="padding: 0;text-align: right">
              <el-button type="success" @click="validateEmail" :disabled="!isEmailValid || coldTime > 0">
                {{coldTime > 0 ? "请稍后 "+ coldTime + "秒" : '获取验证码'}}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 8vh">
      <el-button style="width: 12vw" type="warning" plain @click="regeister">立即注册</el-button>
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
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {post} from "@/net";

const form =reactive({
  username:'',
  password:'',
  password_repeat:'',
  email:'',
  code:''
})

const validateUsername = (rules,value,callback)=>{
  if(value === ""){
    callback(new Error('请输入用户名'))
  }else if(!/^[\u4E00-\u9FA5A-Za-z]+$/.test(value)){
    callback(new Error('用户名不能包含特殊字符，只能是中文/英文'))
  }else {
    callback()
  }
}

const validatePassword = (rules,value,callback)=>{
  if(value === ""){
    callback(new Error('请再次输入密码'))
  }else if(value !== form.password){
    callback(new Error('两次输入的密码不一致'))
  }else {
    callback()
  }
}

const rules = {
  username:[
    { validator: validateUsername, trigger: ['blur','change'] },
    { min: 2, max: 8, message: '用户名长度必须在2-8个字符之间', trigger: ['blur','change'] },
  ],
  password:[
    {required: true,message: '请输入密码',trigger: 'blur'},
    { min: 6, max: 16, message: '密码长度必须在6-16个字符之间', trigger: ['blur','change'] },
  ],
  password_repeat:[
    { validator: validatePassword, trigger: ['blur','change'] },
  ],
  email:[
    {required: true,message: '请输入邮件地址',trigger: 'blur'},
    {type: 'email', message:'请输入合法的电子邮件地址',trigger: ['blur','change']}
  ],
  code:[
    {required: true,message: '请输入验证码',trigger: 'blur'},

  ]
}

const formRef = ref();
const isEmailValid = ref(false);
const coldTime = ref(0);

const onValidate = (prop, isValid)=>{
  if(prop ==='email'){
    isEmailValid.value = isValid;
  }
}

const regeister = ()=>{
  formRef.value.validate((isValid) => {
    if(isValid){
      post('/api/auth/register',{
        username: form.username,
        password: form.password,
        email: form.email,
        code: form.code
      },(message)=>{
        ElMessage.success(message)
        router.push("/")
      })
    }else {
      ElMessage.warning('请完整填写注册表单内容')
    }
  })
}

const validateEmail = () => {
  post('/api/auth/valid-email',{
    email:form.email
  },(message)=>{
    ElMessage.success(message)
    coldTime.value = 60
    setInterval(()=> coldTime.value--,1000)
  })
}
</script>

<style scoped>

</style>
