<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/webcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="addData" class="input-with-select" @keyup.native.enter="filterTab">
        <el-button slot="append" icon="el-icon-search" @click="filterTab"></el-button>
      </el-input>
      <el-button type="success" plain @click="addDialogFormVisible=true">添加用户</el-button>
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
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="switchStat(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <el-button type="primary" plain icon="el-icon-edit" @click="editUsersData(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除用户" placement="bottom-end">
              <el-button type="primary" plain icon="el-icon-delete" @click="delUsersData(scope.row.id)"></el-button>
              <el-button>右边</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="授权管理" placement="right">
              <el-button type="primary" plain icon="el-icon-check" @click="guanLiUsers(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination style="background:#fff;margin-top:5px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10,20,30,40,50]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pagetotal">
    </el-pagination>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item prop="username" label="用户名" label-width="100px">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" label-width="100px">
          <el-input type="password" v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" label-width="100px">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="电话" label-width="100px">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUsersData('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog title="修改用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item prop="username" label="用户名" label-width="100px">
          <el-input v-model="editForm.username" auto-complete="off" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" label-width="100px">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="电话" label-width="100px">
          <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUsersForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 授权用户 -->
    <el-dialog title="授权管理" :visible.sync="guanLiDialogFormVisible">
      <el-form :model="guanLiForm" ref="guanLiForm">
        <el-form-item label="用户名:" label-width="100px">
          <el-input v-model="guanLiForm.username" auto-complete="off" disabled="disabled" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="角色:" label-width="100px">
            <el-select v-model="guanLiForm.rid" placeholder="请选择">
              <el-option v-for="item in guanLiOption" :key="item.id" :label="item.roleName" :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="guanLiDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="guanLiUsersForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 引入api的index文件
import { getAllUserData, addUsers, editUsers, delUsers, statUsers, getGuanLiUserData, UsersJueSe } from '@/api/index.js'
export default {
  data () {
    return {
      addData: '',
      tableData: [],
      currentPage: 1,
      pagenum: 1,
      pagetotal: 0,
      pagesize: 10,
      // 修改用户
      editDialogFormVisible: false,
      editForm: {
        id: '',
        email: '',
        mobile: '',
        username: ''
      },
      // 添加用户
      addDialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 授权管理
      guanLiDialogFormVisible: false,
      guanLiForm: {
        username: '',
        id: '',
        rid: ''
      },
      // 授权管理下拉框
      guanLiOption: [ ],
      // guanLiValue: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度不少于6位不高于15位',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号码为11位', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // 页面加载完成，获取数据
    this.getAllUser()
  },
  // -----
  methods: {
    // ，获取用户数据
    getAllUser () {
      getAllUserData({
        query: '',
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        if (res.meta.status === 200) {
          this.pagetotal = res.data.total
          this.tableData = res.data.users
        }
      })
    },
    // 分页函数
    handleSizeChange (val) {
      this.pagesize = `${val}` - 1 + 1
      this.getAllUser()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = `${val}`
      this.getAllUser()
    },
    // 过滤搜索内容
    filterTab () {
      this.tableData = this.tableData.filter(v => {
        return v.username.indexOf(this.addData) !== -1
      })
      this.pagetotal = this.tableData.length
    },
    // 添加用户
    addUsersData (addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          addUsers(this.addForm).then(res => {
            if (res.meta.status === 201) {
              this.addDialogFormVisible = false
              this.$message({
                message: res.meta.msg,
                type: 'success',
                duration: 1000
              })
              this.$refs[addForm].resetFields()
              this.getAllUser()
            } else {
              this.$message({
                message: res.meta.msg,
                type: 'error',
                duration: 1000
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改用户弹框跳出
    editUsersData (row) {
      // console.log(row) editForm
      this.editDialogFormVisible = true
      this.editForm.id = row.id
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
      this.editForm.username = row.username
    },
    // 确定修改用户
    editUsersForm (editForm) {
      this.$refs[editForm].validate(valid => {
        if (valid) {
          editUsers(this.editForm).then(res => {
            if (res.meta.status === 200) {
              this.editDialogFormVisible = false
              this.$message({
                message: res.meta.msg,
                type: 'success',
                duration: 1000
              })
              this.getAllUser()
            } else {
              this.$message({
                message: res.meta.msg,
                type: 'error',
                duration: 1000
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除用户
    delUsersData (delId) {
      this.$confirm(`此操作将永久删除该id为${delId}的数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(row)
          delUsers(delId).then(res => {
            if (res.meta.status === 200) {
              this.$message({
                message: res.meta.msg,
                type: 'success',
                duration: 1000
              })
              this.getAllUser()
            } else {
              this.$message({
                message: res.meta.msg,
                type: 'error',
                duration: 1000
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取用户角色
    guanLiUsers (row) {
      this.guanLiDialogFormVisible = true
      this.guanLiForm.username = row.username
      this.guanLiForm.id = row.id
      // 发送请求渲染下拉菜单
      getGuanLiUserData().then(res => {
        if (res.meta.status === 200) {
          this.guanLiOption = res.data
        }
      })
      // 页面一开始就赋值显示当前的角色
      this.guanLiForm.rid = row.role_name
    },
    // 状态
    switchStat (row) {
      statUsers(row).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: 'success',
            duration: 1000
          })
          this.getAllUser()
        } else {
          this.$message({
            message: res.meta.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    // 点击提交角色授权
    guanLiUsersForm (row) {
      // 如果没有选到角色就不发送请求
      if (this.guanLiForm.rid === '') {
        this.$message({
          message: '你没有选中需要分配的角色呢',
          type: 'error',
          duration: 1000
        })
        return
      }
      UsersJueSe(this.guanLiForm).then(res => {
        if (res.meta.status === 200) {
          // this.guanLiValue = ''
          this.guanLiDialogFormVisible = false
          this.$message({
            message: res.meta.msg,
            type: 'success',
            duration: 1000
          })
          this.getAllUser()
        } else {
          this.$message({
            message: res.meta.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    }
  },
  watch: {
    // 监听到输入框没有值之后，就返回原来的数据
    addData () {
      if (this.addData === '') {
        getAllUserData({
          query: '',
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }).then(res => {
          if (res.meta.status === 200) {
            this.pagetotal = res.data.total
            this.tableData = res.data.users
          }
        })
      }
    }
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
