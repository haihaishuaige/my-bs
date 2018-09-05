<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logoBox">
          <img class="logo" src="../assets/logo.png" alt="">
        </div>
        <el-menu default-active="users" class="el-menu-admin" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :unique-opened='true' :collapse='iscollapse' :router='true'>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item class="el-icon-menu" index="users">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item class="el-icon-menu" index="2-1">选项2</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn" @click='iscollapse = !iscollapse'></span>
          <h2 class="system-title">后台管理系统</h2>
          <div class="hello_users welcome">
            <span>你好:admin</span>
            <el-button size="mini" round @click="loginOut">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import { getAllUserData } from '../api/'
export default {
  data () {
    return {
      iscollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    // 退出登录
    loginOut () {
      // 删除token
      localStorage.removeItem('mytoken')
      this.$router.push({name: 'Login'})
    }
  },
  mounted () {
    // getAllUserData({query: '', pagenum: 1, pagesize: 10}).then((res) => {
    //   console.log(res)
    // })
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    overflow: hidden;
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logoBox{
    max-width:70px;
 .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  }

  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
