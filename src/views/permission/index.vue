<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>查询条件</span>
        <el-button style="float:right;margin-right: 15px" size="small" @click="handleResetSearch()">
          重置
        </el-button>
        <el-button :disabled="!$checkMenuShow('permission:list')" style="float:right" type="primary" size="small" @click="handleSearchList()">
          确认查询
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form ref="queryForm" :inline="true" :model="queryParams" size="small" label-width="140px">
          <el-form-item label="菜单名：">
            <el-input v-model="queryParams.name" class="input-width" placeholder="菜单名" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>菜单列表</span>
      <!-- <el-button type="primary" class="btn-add" @click="handleAdd()" style="margin-left: 20px">
        添加
      </el-button> -->
    </el-card>
    <div class="table-container">
      <!-- tree-props hasChildren 远程查询使用,若此处指定会导致无法显示树 -->
      <el-table :data="list" :tree-props="{children: 'childList'}"
                stripe highlight-current-row v-loading="listLoading" border
                style="width: 100%" ref="roleTable" row-key="id"
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="菜单名称" width="150" />
        <el-table-column prop="icon" label="图标" width="160" />
        <el-table-column prop="value" label="值" width="160" />
        <!-- <el-table-column prop="uri" label="地址" width="160" /> -->
        <!-- <el-table-column prop="type" label="类型" width="160" /> -->
        <el-table-column prop="insertOn" label="创建日期" width="160" />
        <el-table-column prop="insertByName" label="创建人" width="160" />
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button :disabled="!$checkMenuShow('permission:add')" @click="handleAddChild(scope.$index, scope.row)" type="primary" size="small">
              添加下级
            </el-button>
            <el-button :disabled="!$checkMenuShow('permission:update')" @click="handleUpdate(scope.$index, scope.row)" type="success" size="small">
              修改
            </el-button>
            <el-button :disabled="!$checkMenuShow('permission:delete')" @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="isEdit ? '修改菜单' : '添加菜单'" :visible.sync="permissionEditDialogVisible" :close-on-click-modal="false"
               width="40%" @open="handlerPermissionEditDialogOpen"
    >
      <el-form :model="permissionEdit" :rules="rules" ref="permissionEditForm" label-width="150px" size="small">
        <el-form-item label="上级菜单：" v-show="!isEdit" prop="pName">
          <el-input v-model="permissionEdit.pName" :disabled="true" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单名称：" prop="name">
          <el-input v-model="permissionEdit.name" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="值：" prop="value">
          <el-input v-model="permissionEdit.value" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图标：" prop="icon">
          <el-input v-model="permissionEdit.icon" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="地址：" prop="uri">
          <el-input v-model="permissionEdit.uri" style="width: 250px" autocomplete="off" />
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="permissionEditDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handlePermissionEditDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import permissionApi from '@/api/permission'

const defaultQueryParams = {
  name: ''
}
const defaultPermissionEdit = {
  id: '',
  pid: '',
  pName: '',
  name: '',
  value: '',
  icon: '',
  uri: ''
}

export default {
  components: {
  },
  data () {
    return {
      queryParams: Object.assign({}, defaultQueryParams),
      permissionEdit: Object.assign({}, defaultPermissionEdit),
      listLoading: false,
      list: [],
      permissionEditDialogVisible: false,
      isEdit: false,
      rules: {
        name: { required: true, message: '请输入菜单名称', trigger: 'blur' },
        value: { required: true, message: '请输入菜单值', trigger: 'blur' }
      }
    }
  },
  computed: {
    routerKey () {
      return this.$route.path
    },
    queryParamsTrans () {
      return this.queryParams
    }
  },
  created () {
    this.getList()
  },
  methods: {
    handleSearchList () {
      this.getList()
    },
    handleResetSearch () {
      this.queryParams = Object.assign({}, defaultQueryParams)
    },
    handleUpdate (index, row) {
      this.permissionEditDialogVisible = true
      this.isEdit = true
      this.permissionEdit = Object.assign({}, row)
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除此菜单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        permissionApi.remove(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    },
    handleAdd (index, row) {
      this.permissionEditDialogVisible = true
      this.isEdit = false
    },
    handleAddChild (index, row) {
      this.isEdit = false
      var permissionEdit = Object.assign({}, defaultPermissionEdit)
      permissionEdit.pid = row.id
      permissionEdit.pName = row.name
      this.permissionEdit = permissionEdit
      this.permissionEditDialogVisible = true
    },
    handlerPermissionEditDialogOpen () {
    },
    handlePermissionEditDialogConfirm () {
      this.$refs.permissionEditForm.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            permissionApi.update(this.permissionEdit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.permissionEditDialogVisible = false
              this.getList()
            })
          } else {
            permissionApi.create(this.permissionEdit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.permissionEditDialogVisible = false
              this.getList()
            })
          }
        } else {
          return false
        }
      })
    },
    getList () {
      this.listLoading = true
      permissionApi.fetchList(this.queryParamsTrans).then((response) => {
        this.listLoading = false
        const data = response.data
        this.list = data
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
</style>
