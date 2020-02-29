<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>查询条件</span>
        <el-button style="float:right;margin-right: 15px" size="small" @click="handleResetSearch()">
          重置
        </el-button>
        <el-button :disabled="!$checkMenuShow('user:list')" style="float:right" type="primary" size="small" @click="handleSearchList()">
          确认查询
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form ref="queryForm" :inline="true" :model="queryParams" size="small" label-width="140px">
          <el-form-item label="用户名：">
            <el-input v-model="queryParams.username" class="input-width" placeholder="用户名" />
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input v-model="queryParams.realName" class="input-width" placeholder="姓名" />
          </el-form-item>
          <el-form-item label="创建日期：">
            <el-date-picker v-model="queryParams.insertOnRange" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"
            />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>用户列表</span>
      <el-button :disabled="!$checkMenuShow('user:add')" type="primary" class="btn-add" @click="handleAdd()" style="margin-left: 20px">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border stripe highlight-current-row v-loading="listLoading"
                style="width: 100%" ref="userTable" row-key="id"
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="username" label="用户名" width="150" />
        <el-table-column prop="realName" label="姓名" width="160" />
        <el-table-column prop="roleName" label="角色" width="160" />
        <el-table-column prop="insertOn" label="创建日期" width="160" />
        <el-table-column prop="insertByName" label="创建人" width="160" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button :disabled="!$checkMenuShow('user:update')" @click="handleUpdate(scope.$index, scope.row)" type="success" size="small">
              修改
            </el-button>
            <el-button :disabled="!$checkMenuShow('user:delete')" @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">
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
    <el-dialog :title="isEdit ? '修改用户' : '添加用户'" :visible.sync="userEditDialogVisible" :close-on-click-modal="false"
               width="40%" @open="handlerUserEditDialogOpen"
    >
      <el-form :model="userEdit" :rules="rules" ref="userEditForm" label-width="150px" size="small">
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="userEdit.username" :disabled="isEdit" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="姓名：" prop="realName">
          <el-input v-model="userEdit.realName" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色：" prop="roleId">
          <!-- <el-input v-model="userEdit.roleName" style="width: 250px" autocomplete="off" /> -->
          <el-select v-model="userEdit.roleId" placeholder="请选择">
            <el-option v-for="item in roleIdOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="showEditPassword" label="修改密码">
          <el-switch v-model="editPassword" />
        </el-form-item>
        <div class="block">
          <el-form-item v-show="showOldPassword" label="原密码：" prop="oldPassword">
            <el-input v-model="userEdit.oldPassword" type="password" style="width: 250px" autocomplete="off" />
          </el-form-item>
          <el-form-item v-show="showPassword" label="密码：" prop="password">
            <el-input v-model="userEdit.password" type="password" style="width: 250px" autocomplete="off" auto-complete="new-password" />
          </el-form-item>
          <el-form-item v-show="showCheckPassword" label="确认密码：" prop="checkPassword">
            <el-input v-model="userEdit.checkPassword" type="password" style="width: 250px" autocomplete="off" />
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userEditDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleUserEditDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import userApi from '@/api/user'
import roleApi from '@/api/role'

const defaultQueryParams = {
  username: '',
  realName: '',
  insertOnRange: ['', ''],
  pageObj: {
    pageNum: 1,
    pageSize: 10
  }
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
    const validateUsername = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('请输入用户名'))
      }
    }
    const validateRealName = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('请输入姓名'))
      }
    }
    const validateRoleId = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('请选择角色'))
      }
    }
    const validateOldPassword = (rule, value, callback) => {
      if (this.showOldPassword && !value) {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (this.showPassword && !value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateCheckPassword = (rule, value, callback) => {
      if (this.showCheckPassword) {
        if (value) {
          if (value !== this.userEdit.password) {
            callback(new Error('俩次输入密码不一致'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请再次输入密码'))
        }
      } else {
        callback()
      }
    }
    return {
      queryParams: Object.assign({}, defaultQueryParams),
      userEdit: Object.assign({}, defaultUserEdit),
      listLoading: false,
      list: [],
      listTotal: null,
      userEditDialogVisible: false,
      isEdit: false,
      editPassword: false,
      roleIdOptions: [],
      rules: {
        username: [{
          validator: validateUsername,
          trigger: 'blur'
        }],
        realName: [{
          validator: validateRealName,
          trigger: 'blur'
        }],
        roleId: [{
          validator: validateRoleId,
          trigger: 'blur'
        }],
        oldPassword: [{
          validator: validateOldPassword,
          trigger: 'blur'
        }],
        password: [{
          validator: validatePassword,
          trigger: 'blur'
        }],
        checkPassword: [{
          validator: validateCheckPassword,
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    routerKey () {
      return this.$route.path
    },
    showEditPassword () {
      /** 仅修改时显示 */
      return this.isEdit
    },
    showOldPassword () {
      /** 仅修改 且 需要修改密码 */
      return this.isEdit && this.editPassword
    },
    showPassword () {
      /** 1.修改 且 需要修改密码 2.新增 */
      return this.editPassword || !this.isEdit
    },
    showCheckPassword () {
      /** 1.修改 且 需要修改密码 2.新增 */
      return this.editPassword || !this.isEdit
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
    this.getRoleIdOptions()
  },
  methods: {
    handleSearchList () {
      this.getList()
    },
    handleResetSearch () {
      this.queryParams = Object.assign({}, defaultQueryParams)
    },
    handleUpdate (index, row) {
      this.userEditDialogVisible = true
      this.isEdit = true
      this.userEdit = Object.assign({}, row)
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除此人员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userApi.remove(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    },
    handleAdd () {
      this.userEditDialogVisible = true
      this.isEdit = false
      this.userEdit = Object.assign({}, defaultUserEdit)
    },
    handlerUserEditDialogOpen () {
      // this.$refs.userEditForm.resetFields()
      // console.log(this.$refs)
    },
    handleUserEditDialogConfirm () {
      this.$refs.userEditForm.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            userApi.update(this.userEdit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.userEditDialogVisible = false
              this.getList()
            })
          } else {
            userApi.create(this.userEdit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.userEditDialogVisible = false
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
      userApi.fetchList(this.queryParamsTrans).then((response) => {
        this.listLoading = false
        const data = response.data
        const { list, total } = data
        this.list = list
        this.listTotal = total
      }).catch(() => {
        this.listLoading = false
      })
    },
    getRoleIdOptions () {
      roleApi.fetchList().then(response => {
        this.roleIdOptions = response.data.list
      })
    },
    handlePageCurrentChange (val) {
      this.queryParams.pageNum = val
      this.getList()
    }
  }
}
</script>

<style scoped>
</style>
