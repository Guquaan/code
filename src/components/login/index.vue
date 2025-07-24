<template>
<el-row class="login-container" justify="center" :align="'middle'">
    <el-card style="width: 30%;height: 30%;">
      <el-form ref="loginFormRef" :model="loginForm"  class="demo-ruleForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" :prefix-icon="UserFilled" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码" :prefix-icon="Lock" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :style="{ width: '100%' }" @click="submitFrom(loginFormRef)">
           {{ '登陆' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>


<script setup>
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { ref, reactive, toRaw, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {login} from '../../api/index'
import { useRouter } from 'vue-router'

const router = useRouter()
//登陆数据
const loginFormRef = ref()

const loginForm = reactive({
  username: '',
  password: '',
})

//校验规则
//用户名校验
const validateUser = (rule,value,callback)=>{
    if (!value) {
        callback(new Error('请输入用户名'))
    } else {
        callback()
    }
}
//密码校验
const validatePass = (rule,value,callback)=>{
    if (!value) {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}
const rules = reactive({
  username: [{required:true, validator: validateUser, trigger: 'blur' }],
  password: [{required:true, validator: validatePass, trigger: 'blur' }]
})

//表单提交
const submitFrom = async (formEl)=>{
    if(!formEl) return 
    await formEl.validate((valid,fields)=>{
      console.log(valid)
      if(valid){
        //登陆校验
        login({username:loginForm.username,password:loginForm.password}).then(({data})=>{
          console.log("登陆页面通过接口返回的解构data",data)
          if(data.code === 200)
        {
          ElMessage.success('登陆成功')
          //将获取的token缓存到浏览器
          localStorage.setItem('token',data.data.token)
          //用户信息缓存到浏览器
          localStorage.setItem('userInfo.username',loginForm.username)
          localStorage.setItem('userInfo.password',loginForm.password)
          router.push('/')
        }
        })
      }
    })
    
}

</script>

<style scoped>
.login-container{
    height: 100vh;
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    .demo-ruleForm{
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    
}
@media screen and (max-width: 768px) {
  .login-container {
    width: 100%;
    height: 100%;
  }
  
}
</style>