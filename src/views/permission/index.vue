<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>查询条件</span>
        <el-button style="float:right;margin-right: 15px" size="small" @click="handleResetSearch()">
          重置
        </el-button>
        <el-button style="float:right" type="primary" size="small" @click="handleSearchList()">
          确认查询
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="queryParams" size="small" label-width="140px">
          <el-form-item label="权限名：">
            <el-input v-model="queryParams.name" class="input-width" placeholder="权限名" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>权限列表</span>
      <el-button type="primary" class="btn-add" @click="handleAdd()" style="margin-left: 20px">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <!-- tree-props hasChildren 远程查询使用,若此处指定会导致无法显示树 -->
      <el-table :data="list" :tree-props="{children: 'childList'}"
                stripe highlight-current-row v-loading="listLoading" border
                style="width: 100%" ref="roleTable" row-key="id"
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="权限名称" width="150" />
        <el-table-column prop="value" label="值" width="160" />
        <el-table-column prop="icon" label="图标" width="160" />
        <el-table-column prop="uri" label="地址" width="160" />
        <el-table-column prop="type" label="类型" width="160" />
        <el-table-column prop="insertOn" label="创建日期" width="160" />
        <el-table-column prop="insertByUsername" label="创建人" width="160" />
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button @click="handleAddChild(scope.$index, scope.row)" type="text" size="small">
              添加
            </el-button>
            <el-button @click="handleUpdate(scope.$index, scope.row)" type="text" size="small">
              修改
            </el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import permissionApi from '@/api/permission'

const defaultQueryParams = {
  name: ''
}
const defaultUserEdit = {
  id: '',
  username: '',
  realName: '',
  roleId: '',
  roleName: '',
  oldPassword: '',
  password: '',
  checkPassword: ''
}

export default {
  components: {
  },
  data () {
    return {
      queryParams: Object.assign({}, defaultQueryParams),
      userEdit: Object.assign({}, defaultUserEdit),
      listLoading: false,
      list: [],
      isEdit: false,
      rules: {
      }
    }
  },
  computed: {
    routerKey () {
      return this.$route.path
    },
    queryParamsTrans () {
      const paramsTrans = {}
      const { username, realName, insertOnRange, pageObj } = this.queryParams
      var insertOnFrom = ''
      var insertOnTo = ''
      if (insertOnRange) {
        insertOnFrom = insertOnRange[0]
        insertOnTo = insertOnRange[1]
      }
      if (username) {
        paramsTrans.username = username
      }
      if (realName) {
        paramsTrans.realName = realName
      }
      if (insertOnFrom) {
        paramsTrans.insertOnFrom = insertOnFrom
      }
      if (insertOnTo) {
        paramsTrans.insertOnTo = insertOnTo
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

    },
    handleUpdate (index, row) {
      // this.userEditDialogVisible = true
      // this.isEdit = true
      // this.userEdit = Object.assign({}, row)
    },
    handleDelete () {
      // this.$confirm('是否要删除此人员?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      // })
    },
    handleAdd () {
      // this.userEditDialogVisible = true
      // this.isEdit = false
      // this.userEdit = Object.assign({}, defaultUserEdit)
    },
    handlerUserEditDialogOpen () {
      // this.$refs.userEditForm.resetFields()
      // console.log(this.$refs)
    },
    handleUserEditDialogConfirm () {
      // this.$refs.userEditForm.validate((valid) => {
      //   if (valid) {
      //     if (this.isEdit) {
      //       userApi.updateUser(this.userEdit).then(response => {
      //         this.$message({
      //           message: response.data,
      //           type: 'success'
      //         })
      //         this.userEditDialogVisible = false
      //         this.getUserList()
      //       })
      //     } else {
      //       userApi.createUser(this.userEdit).then(response => {
      //         this.$message({
      //           message: response.data,
      //           type: 'success'
      //         })
      //         this.userEditDialogVisible = false
      //         this.getUserList()
      //       })
      //     }
      //   } else {
      //     return false
      //   }
      // })
    },
    getList () {
      this.listLoading = true
      permissionApi.fetchList().then((response) => {
        this.listLoading = false
        const data = response.data
        this.list = data
      }).catch(() => {
        // this.listLoading = false
      })
      // children: 'childList', hasChildren: 'hasChild'

      // this.list = [{
      //   id: 1,
      //   name: '角色管理',
      //   value: '',
      //   icon: '',
      //   uri: '',
      //   type: '',
      //   insertOn: '',
      //   insertBy: ''
      // }, {
      //   id: 2,
      //   name: '权限管理',
      //   value: '',
      //   icon: '',
      //   uri: '',
      //   type: '',
      //   insertOn: '',
      //   insertBy: ''
      // }, {
      //   id: 3,
      //   name: '用户管理',
      //   value: '',
      //   icon: '',
      //   uri: '',
      //   type: '',
      //   insertOn: '',
      //   insertBy: '',
      //   childList: [{
      //     id: 4,
      //     name: '新增角色',
      //     value: '',
      //     icon: '',
      //     uri: '',
      //     type: '',
      //     insertOn: '',
      //     insertBy: ''
      //   }, {
      //     id: 5,
      //     name: '修改角色',
      //     value: '',
      //     icon: '',
      //     uri: '',
      //     type: '',
      //     insertOn: '',
      //     insertBy: ''
      //   }]
      // }]
      // this.listLoading = false
    }
  }
}
</script>

<style scoped>
</style>
