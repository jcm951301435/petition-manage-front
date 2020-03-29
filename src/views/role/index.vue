<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>查询条件</span>
        <el-button style="float:right;margin-right: 15px" size="small" @click="handleResetSearch()">
          重置
        </el-button>
        <el-button :disabled="!$checkMenuShow('role:list')" style="float:right" type="primary" size="small" @click="handleSearchList()">
          确认查询
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form ref="queryForm" :inline="true" :model="queryParams" size="small" label-width="140px">
          <el-form-item label="角色名：">
            <el-input v-model="queryParams.name" class="input-width" placeholder="用户名" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>角色列表</span>
      <el-button :disabled="!$checkMenuShow('role:add')" type="primary" class="btn-add" @click="handleAdd()" style="margin-left: 20px">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border stripe highlight-current-row v-loading="listLoading"
                style="width: 100%" ref="roleTable" row-key="id"
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="角色名" width="150" />
        <el-table-column prop="description" label="描述" width="160" />
        <el-table-column prop="insertOn" label="创建日期" width="160" />
        <el-table-column prop="insertByName" label="创建人" width="160" />
        <el-table-column label="姓名" width="150">
          <template slot-scope="scope">
            {{ scope.row.filterData ? '是': '否' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="!$checkMenuShow('role:addPermission')" @click="handlePemissionRelation(scope.$index, scope.row)" type="primary" size="small">
              授权菜单
            </el-button>
            <el-button :disabled="!$checkMenuShow('role:update')" @click="handleUpdate(scope.$index, scope.row)" type="success" size="small">
              修改
            </el-button>
            <el-button :disabled="!$checkMenuShow('role:delete')" @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :page-size="queryParams.pageObj.pageSize"
        :current-page.sync="queryParams.pageObj.pageNum"
        :total="listTotal"
        @current-change="handlePageCurrentChange"
      />
    </div>
    <el-dialog :title="isEdit ? '修改用户' : '添加用户'" :visible.sync="roleEditDialogVisible" :close-on-click-modal="false"
               width="40%" @open="handlerRoleEditDialogOpen"
    >
      <el-form :model="roleEdit" :rules="rules" ref="roleEditForm" label-width="150px" size="small">
        <el-form-item label="角色名：" prop="name">
          <el-input v-model="roleEdit.name" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述：" prop="description">
          <el-input v-model="roleEdit.description" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="数据过滤：" prop="teamPetitionState">
          <el-switch v-model="roleEdit.filterData" active-text="仅本公司" inactive-text="所有" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleEditDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleRoleEditDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-loading="pemissionListLoading" :title="'授权菜单'" :visible.sync="pemissionDialogVisible" :close-on-click-modal="false"
               width="40%"
    >
      <div style="height: 350px">
        <el-scrollbar class="role_scrollbar" style="height: 100%">
          <el-tree :props="pemissionProps" :data="pemissionList" node-key="id" :check-strictly="true"
                   show-checkbox :default-expand-all="true" :default-checked-keys="pemissionCheckId" ref="pemissionTree"
          />
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pemissionDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handlePemissionDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import roleApi from '@/api/role'

const defaultQueryParams = {
  name: '',
  pageObj: {
    pageNum: 1,
    pageSize: 10
  }
}
const defaultRoleEdit = {
  id: '',
  name: '',
  filterData: false,
  description: ''
}

export default {
  components: {
  },
  data () {
    return {
      queryParams: Object.assign({}, defaultQueryParams),
      roleEdit: Object.assign({}, defaultRoleEdit),
      listLoading: false,
      list: [],
      listTotal: null,
      roleEditDialogVisible: false,
      isEdit: false,
      editPassword: false,
      rules: {
        name: { required: true, message: '请输入角色名称', trigger: 'blur' }
      },
      pemissionProps: {
        label: 'name',
        children: 'childList'
      },
      roleIdSelect: null,
      pemissionListLoading: false,
      pemissionList: [],
      pemissionCheckId: [6770880564774830087],
      pemissionDialogVisible: false
    }
  },
  computed: {
    routerKey () {
      return this.$route.path
    },
    queryParamsTrans () {
      const paramsTrans = {}
      const { name, pageObj } = this.queryParams
      if (name) {
        paramsTrans.name = name
      }
      paramsTrans.pageNum = pageObj.pageNum
      paramsTrans.pageSize = pageObj.pageSize
      return paramsTrans
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
    handlePemissionRelation (index, row) {
      this.pemissionDialogVisible = true
      this.pemissionCheckId = []
      this.roleIdSelect = row.id
      roleApi.rolePermissionList(row.id).then((response) => {
        const data = response.data
        this.pemissionList = data.allList
        this.pemissionCheckId = data.checkId
      })
    },
    handleUpdate (index, row) {
      this.roleEditDialogVisible = true
      this.isEdit = true
      this.roleEdit = Object.assign({}, row)
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除此人员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        roleApi.remove(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    },
    handleAdd () {
      this.roleEditDialogVisible = true
      this.isEdit = false
      this.roleEdit = Object.assign({}, defaultRoleEdit)
    },
    handlerRoleEditDialogOpen () {
      // this.$refs.userEditForm.resetFields()
      // console.log(this.$refs)
    },
    handleRoleEditDialogConfirm () {
      this.$refs.roleEditForm.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            roleApi.update(this.roleEdit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.roleEditDialogVisible = false
              this.getList()
            })
          } else {
            roleApi.create(this.roleEdit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.roleEditDialogVisible = false
              this.getList()
            })
          }
        } else {
          return false
        }
      })
    },
    handlePemissionDialogConfirm () {
      const roleIdSelect = this.roleIdSelect
      const checkId = this.$refs.pemissionTree.getCheckedKeys()
      roleApi.roleAddPermissions({
        roleId: roleIdSelect,
        checkId: checkId
      }).then(response => {
        this.$message({
          message: response.data,
          type: 'success'
        })
        this.pemissionDialogVisible = false
      })
    },
    getList () {
      this.listLoading = true
      roleApi.fetchList(this.queryParamsTrans).then((response) => {
        this.listLoading = false
        const data = response.data
        const { list, total } = data
        this.list = list
        this.listTotal = total
      }).catch(() => {
        this.listLoading = false
      })
    },
    handlePageCurrentChange (val) {
      this.queryParams.pageNum = val
      this.getList()
    },
    loadPemission () {
    }
  }
}
</script>

<style scoped>
</style>
