<template>
    <div class="users">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: 'users' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="addData" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" plain>添加用户</el-button>
        </div>
        <!-- 表格-->
        <template>
            <el-table :data="tableData" border style="width: 100%;margin-top:15px">
                <!-- 索引 -->
                <el-table-column type="index" width="50">
                </el-table-column>
                <!-- 姓名 -->
                <el-table-column prop="username" label="姓名" width="180">
                </el-table-column>
                <!-- 邮箱 -->
                <el-table-column prop="email" label="邮箱" width="180">
                </el-table-column>
                <!-- 电话 -->
                <el-table-column prop="mobile" label="电话">
                </el-table-column>
                <!-- 状态 -->
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" plain icon="el-icon-edit"></el-button>
                        <el-button type="primary" plain icon="el-icon-delete"></el-button>
                        <el-button type="primary" plain icon="el-icon-check"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 分页 -->
        <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[1,2,3,4]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="4">
    </el-pagination>
  </div>
    </div>
</template>
<script>
// 引入api的index文件
import { getAllUserData } from '@/api/index.js'
export default {
  data () {
    return {
      addData: '',
      tableData: [ ],
      currentPage4: 1,
      pagenum: 1,
      pagetotal: 0
    }
  },
  // -----
  methods: {
    // 分页函数
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      getAllUserData({query: '', pagenum: this.pagenum, pagesize: `${val}`}).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.tableData = res.data.users
        }
      })
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = `${val}`
      getAllUserData({query: '', pagenum: this.pagenum, pagesize: 1}).then(res => {
        if (res.meta.status === 200) {
          this.tableData = res.data.users
        }
      })
    }
  },
  mounted () {
    // 页面加载完成，获取数据
    getAllUserData({query: '', pagenum: 1, pagesize: 1}).then(res => {
      console.log(res)
      if (res.meta.status === 200) {
        this.pagetotal = res.data.total
        this.tableData = res.data.users
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  background-color: #f5f5f5;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
  margin-bottom: 15px;
}
.input-with-select {
  width: 300px;
}
</style>
