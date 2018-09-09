<template>
    <div class="categories">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/" style="background:#fff;">
            <el-breadcrumb-item :to="{ path: '/webcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加角色 -->
        <div>
            <el-button type="success" plain round @click="addCategoriesData">添加分类</el-button>
        </div>
        <!-- 表格组件 treeStructure:true ：设置为树状结构 columns：columns 数据显示（数组）
    dataSource：数据来源  deleteCate：删除商品分类 editCate：编辑商品分类-->
        <tree-grid :treeStructure="true" :columns="columns" :data-source="dataSource" @deleteCate="deleteCategory" @editCate="editCategory">
        </tree-grid>
        <!-- 添加分类弹出框 -->
        <el-dialog title="添加商品分类" :visible.sync="addDialogFormVisible">
            <el-form :model="addForm">
                <el-form-item label="分类名称" label-width='100px'>
                    <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级名称" label-width='100px'>
                    <el-cascader :props="props" v-model="selectedOptions" :options="checkedCateData" change-on-select></el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitCate">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getCategoriesData } from '@/api/index.js'
import TreeGrid from '@/components/TreeGrid/TreeGrid'
export default {
  data () {
    return {
      dataSource: [],
      columns: [
        {
          text: '分类名称',
          dataIndex: 'cat_name',
          width: ''
        },
        {
          text: '是否有效',
          dataIndex: 'cat_deleted',
          width: ''
        },
        {
          text: '排序',
          dataIndex: 'cat_level',
          width: ''
        }
      ],
      // 添加分类弹出框数据
      addDialogFormVisible: false,
      addForm: {
        cat_name: ''
      },
      checkedCateData: [],
      selectedOptions: [],
      props: {
        children: 'children',
        value: 'cat_id',
        label: 'cat_name'
      }
    }
  },
  // 在components中写入子组件
  components: { 'tree-grid': TreeGrid },
  methods: {
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    },
    // 添加分类
    addCategoriesData () {
      this.addDialogFormVisible = true
      getCategoriesData(2).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.checkedCateData = res.data
        }
      })
    },
    // 点击确定
    submitCate () {
      if (this.addForm.cat_name === '') {
        this.$message({
          type: 'error',
          message: '名称还没有写呢'
        })
        return false
      }
      console.log('我符合标准啦')
    }
  },
  mounted () {
    getCategoriesData(3).then(res => {
      //   console.log(res)
      if (res.meta.status === 200) {
        this.dataSource = res.data
      } else {
        this.$message({
          type: 'error',
          message: res.meta.msg
        })
      }
    })
  }
}
</script>

<style scoped>
</style>
