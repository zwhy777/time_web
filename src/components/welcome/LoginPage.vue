<template>
  <div style="margin: 0 2vw;text-align: center">
    <div style="margin-top: 10vh">
      <div style="font-size: 25px;margin-bottom: 10px;">Login</div>
      <div style="font-size: 14px;color: grey">Please log in before entering the system</div>
    </div>
    <div style="margin-top: 3.3vh">
      <el-input v-model="form.username" type="text" placeholder="Username/Email">
        <template #prefix>
          <el-icon><user/></el-icon>
        </template>
      </el-input>
      <el-input v-model="form.password" type="password" style="margin-top: 1vh" placeholder="Password">
        <template #prefix>
          <el-icon><lock/></el-icon>
        </template>
      </el-input>
    </div>
    <el-row style="margin-top: 1vh">
      <el-col :span="12" style="text-align: left">
        <el-checkbox v-model="form.remember" label="Remember"/>
      </el-col>
    </el-row>
    <div style="margin-top: 4vh; ">
      <el-button @click ="login()" style="width: 12vw" type="success" plain>Login</el-button>
    </div>
    <el-divider>
      <span style="color: grey;font-size: 13px">No account</span>
    </el-divider>
    <div style="margin-top: 2vh">
      <el-button style="width: 12vw" @click="router.push('/register')" type="warning" plain>Sign up</el-button>
    </div>
  </div>
</template>

<script setup>
import {Lock, User} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import {reactive} from "vue";
import {post} from "@/net";
import router from "@/router";

const form = reactive({
  username:'',
  password:'',
  remember:false
})

const login = () =>{
  // if(form.username == 111 && form.password == 111){
  //   router.push('/index')
  // }
  if(!form.username || !form.password){
    ElMessage.warning("Please fill in your username and password!")
  }else{
    post('/api/auth/login',{
      username:form.username,
      password:form.password,
      remember:form.remember
    },(message)=>{
      ElMessage.success(message),
          router.push('/index')
    })
    // router.push('/index')
  }
}
</script>

<style scoped>

</style>
