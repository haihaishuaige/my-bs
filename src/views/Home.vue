<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logoBox">
          <img class="logo" src="../assets/logo.png" alt="">
        </div>
        <el-menu style="background:#333" default-active="webCome" class="el-menu-admin" @open="handleOpen" @close="handleClose" background-color="#333"  text-color="#ff9400" active-text-color="#0094ff" :unique-opened='true' :collapse='iscollapse' :router='true'>
          <el-submenu :index="item.id+''" v-for="item in menusData" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item class="el-icon-menu" :index="twoItem.path" v-for="twoItem in item.children" :key="twoItem.id">{{twoItem.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn" @click='iscollapse = !iscollapse'></span>
          <h2 class="system-title">后台管理系统</h2>
          <div class="hello_users welcome">
            <span>你好:{{helloUsers}}</span>   <!-- {{helloUsers}} -->
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
import { getMenusData } from '../api/index.js'
export default {
  data () {
    return {
      iscollapse: false,
      helloUsers: '',
      menusData: []
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
    // 获取用户登录的数据 动态设置用户名
    var myData = JSON.parse(localStorage.getItem('mytoken'))
    this.helloUsers = myData.username
    // 获取左侧菜单数据
    getMenusData().then(res => {
      if (res.meta.status === 200) {
        this.menusData = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  background:url('../assets/1loginbj.jpg');
  background-size: cover;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    overflow: hidden;
    background:#333;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #545c64;
     background:#333;
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
