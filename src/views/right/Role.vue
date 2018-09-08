<template>
  <div class="role">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" style="background:#fff;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色 -->
    <div>
      <el-button type="success" plain @click="addRoleDialogFormVisible=true">添加角色</el-button>
    </div>
    <!-- 表格-->
    <template>
      <el-table :data="RoleData" border style="width: 100%;margin-top:15px">
        <!-- 展开箭头 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 栅格布局 -->
            <el-row v-for="one in scope.row.children" :key="one.id">
              <el-col :span="4">
                <el-tag closable type="warning" @close='delRole(scope.row,one.id)'>
                  {{one.authName}}
                </el-tag>
              </el-col>
              <el-col :span="20">
                <el-row v-for="two in one.children" :key="two.id">
                  <el-col :span='4'>
                    <el-tag closable type="success" @close='delRole(scope.row,two.id)'>
                      {{two.authName}}
                    </el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-tag closable type="danger" v-for="three in two.children" :key="three.id" @close='delRole(scope.row,three.id)'>
                      {{three.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='24' v-if="scope.row.children==0">他没有任何授权哦</el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引 -->
        <el-table-column type="index" width="50">
        </el-table-column>
        <!-- 姓名 -->
        <el-table-column prop="id" label="角色ID" width="180">
        </el-table-column>
        <!-- 邮箱 -->
        <el-table-column prop="roleName" label="角色名称" width="180">
        </el-table-column>
        <!-- 电话 -->
        <el-table-column prop="roleDesc" label="描述">
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <el-button type="primary" plain icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除用户" placement="bottom-end">
              <el-button type="primary" plain icon="el-icon-delete"></el-button>
              <el-button>右边</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="授权管理" placement="right">
              <el-button type="primary" plain icon="el-icon-check" @click="shouQuanRoleBtn(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 授权树状弹框 -->
    <el-dialog title="授权用户" :visible.sync="shouQuanRoleDialogFormVisible">
      <!-- data:接受一个数组渲染数据 show-checkbox：节点是否可以被选择 node-key：用来标识唯一的属性
            default-expanded-keys：默认展开的id（传入一个数组）default-checked-keys:默认勾选的节点数组
            default-expand-all:默认展开所有子节点-->
      <div class="scollTree">
        <el-tree ref="tree" :data="treeData" show-checkbox node-key="id" :default-checked-keys="defultChecked" :props="defaultProps" :default-expand-all='true'>
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shouQuanRoleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedRoleNodes">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色弹出框 -->
    <el-dialog title="添加角色" :visible.sync="addRoleDialogFormVisible">
      <el-form :model="AddRoleForm" :rules="rules">
        <el-form-item label="角色名称" label-width="150px" prop="roleName">
          <el-input v-model="AddRoleForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" label-width="150px" prop="roleDesc">
          <el-input v-model="AddRoleForm.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleData,
  delRoleData,
  getRightData,
  editRoleData
} from '@/api/index.js'
export default {
  data () {
    return {
      RoleData: [],
      // 授权管理树状下拉框
      shouQuanRoleDialogFormVisible: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 当前选中角色的id
      checkRoleId: '',
      // 默认勾选的数据
      defultChecked: [],
      // 添加角色
      addRoleDialogFormVisible: false,
      AddRoleForm: {
        roleName: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请对角色进行描述', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getAllRoleData()
  },
  methods: {
    getAllRoleData () {
      getRoleData().then(res => {
        this.RoleData = res.data
      })
    },
    // 删除角色权限
    delRole (row, rightId) {
      delRoleData(row.id, rightId).then(res => {
        if (res.meta.status === 200) {
          row.children = res.data
          this.$message({
            type: 'success',
            message: res.meta.msg,
            duration: 1000
          })
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg,
            duration: 1000
          })
        }
      })
    },
    // 授权树状
    shouQuanRoleBtn (row) {
      this.shouQuanRoleDialogFormVisible = true
      getRightData('tree').then(res => {
        this.treeData = res.data
      })
      // 动态赋值给上面的角色id  checkRoleId
      this.checkRoleId = row.id
      this.defultChecked = []
      // 获取底层默认选中的id  赋值给上面的数组
      if (row.children.length > 0) {
        row.children.forEach(one => {
          if (one.children.length > 0) {
            one.children.forEach(two => {
              if (two.children.length > 0) {
                two.children.forEach(therr => {
                  this.defultChecked.push(therr.id)
                })
              }
            })
          }
        })
      }
    },
    // 获取选中的数据
    getCheckedRoleNodes () {
      var checkTreeId = this.$refs.tree.getCheckedNodes()
      checkTreeId = checkTreeId.map(v => {
        return v.id + ',' + v.pid
      })
      checkTreeId = checkTreeId.join(',')
      checkTreeId = checkTreeId.split(',')
      checkTreeId = Array.from(new Set(checkTreeId))
      // console.log(checkTreeId) ["129", "111", "103", "134", "138"]  成功去除重复
      checkTreeId = checkTreeId.join(',')
      // console.log(checkTreeId)  成功转化字符串  发送请求
      editRoleData(this.checkRoleId, checkTreeId).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg,
            duration: 1000
          })
          this.shouQuanRoleDialogFormVisible = false
          this.getAllRoleData()
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg,
            duration: 1000
          })
        }
      })
    }
  },
  watch: {
    shouQuanRoleDialogFormVisible () {
      if (this.shouQuanRoleDialogFormVisible === false) {
        this.$refs.tree.setCheckedKeys([])
      }
    }
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-row {
  padding: 5px 0;
}
.el-tag {
  margin: 0 5px;
}
.scollTree {
  height: 400px;
  overflow: auto;
}
</style>
