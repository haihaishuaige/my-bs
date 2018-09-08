<template>
    <div class="right">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/" style="background:#fff;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 展示表格 -->
  <el-table
    ref="singleTable"
    :data="RightData"
    highlight-current-row
    @current-change="handleCurrentChange"
     border style="width:100%">
    <!-- 索引 -->
    <el-table-column
      type="index"
      width="60">
    </el-table-column>
    <!-- 权限 -->
    <el-table-column
      property="authName"
      label="权限"
      width="150">
    </el-table-column>
    <!-- 路径 -->
    <el-table-column
      property="path"
      label="路径"
      width="150">
    </el-table-column>
    <!-- 层级  property="level"-->
    <el-table-column
      label="层级" width="200">
       <template slot-scope="scope">
          <span>{{scope.row.level | filterLevel}}</span>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>

<script>
import { getRightData } from '@/api/index.js'
export default {
  data () {
    return {
      RightData: [],
      currentRow: null
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentRow = val
    }
  },
  mounted () {
    getRightData('list').then(res => {
      if (res.meta.status === 200) {
        this.RightData = res.data
      }
    })
  },
  filters: {
    filterLevel: (level) => {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  }
}
</script>

<style scoped>
.el-breadcrumb{
    margin-bottom:0;
    border-radius: 10px 10px 0 0 ;
}
.el-table{
    border:2px solid #ebeef5;
}
</style>
