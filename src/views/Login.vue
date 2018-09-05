<template>
  <div class="login">
    <div class="container">
      <img src="../assets/boduo.png" alt="" class="avatar">
      <el-form :model="loginForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"  prefix-icon="myicon myicon-user" placeholder="请输入用户名"  ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="myicon myicon-key" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitForm('ruleForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 引入api的login文件
import { login } from '@/api/index.js'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击提交
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          login(this.loginForm).then((res) => {
            if (res.meta.status === 200) {
              this.$message.success({
                message: res.meta.msg,
                duration: 1500
              })
              // 存起来token
              localStorage.setItem('mytoken', res.data.token)
              // 到home页面
              this.$router.push('users')
            } else {
              this.$message.error({
                message: res.meta.msg,
                duration: 1000
              })
            }
          })
        } else {
          this.$message.error('你填写格式有误')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 大盒子样式
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  // background:linear-gradient(to right top,rgb(174, 27, 204),#782bc0,rgb(31, 194, 194));
  background:url(../assets/loginbj.jpg) center center;
  // background-size: contain;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    border-radius: 50px;
    //  图片样式
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 5px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    // 按钮样式
    .login-btn {
      width: 100%;
      border-radius: 30px;
    }
  }
}
</style>
