<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>查询条件</span>
        <el-button style="float:right;margin-right: 15px" size="small" @click="handleResetSearch()">
          重置
        </el-button>
        <el-button :disabled="!$checkMenuShow('company:list')" style="float:right" type="primary" size="small" @click="handleSearchList()">
          确认查询
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form ref="queryForm" :inline="true" :model="queryParams" size="small" label-width="140px">
          <el-form-item label="公司名：">
            <el-input v-model="queryParams.name" class="input-width" placeholder="公司名" />
          </el-form-item>
          <el-form-item label="联系人:">
            <el-input v-model="queryParams.contactName" class="input-width" placeholder="联系人" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>公司列表</span>
      <el-button :disabled="!$checkMenuShow('company:add')" type="primary" class="btn-add" @click="handleAdd()" style="margin-left: 20px">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border stripe highlight-current-row v-loading="listLoading"
                style="width: 100%" ref="companyTable" row-key="id"
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="公司名" width="150" />
        <el-table-column prop="contactName" label="联系人" width="160" />
        <el-table-column prop="contactTelephone" label="联系方式" width="160" />
        <el-table-column prop="insertOn" label="创建日期" width="160" />
        <el-table-column prop="insertByName" label="创建人" width="160" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button :disabled="!$checkMenuShow('company:update')" @click="handleUpdate(scope.$index, scope.row)" type="success" size="small">
              修改
            </el-button>
            <el-button :disabled="!$checkMenuShow('company:delete')" @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">
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
    <el-dialog :title="isEdit ? '修改公司' : '添加公司'" :visible.sync="companyEditDialogVisible" :close-on-click-modal="false"
               width="40%" @open="handlerCompanyEditDialogOpen"
    >
      <el-form :model="companyEdit" :rules="rules" ref="companyEditForm" label-width="150px" size="small">
        <el-form-item label="公司名：" prop="name">
          <el-input v-model="companyEdit.name" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系人：" prop="contactName">
          <el-input v-model="companyEdit.contactName" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系方式：" prop="contactTelephone">
          <el-input v-model="companyEdit.contactTelephone" style="width: 250px" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="companyEditDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleCompanyEditDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import companyApi from '@/api/company'

const defaultQueryParams = {
  name: '',
  contactName: '',
  pageObj: {
    pageNum: 1,
    pageSize: 10
  }
}
const defaultCompanyEdit = {
  id: '',
  name: '',
  contactName: '',
  contactTelephone: ''
}

export default {
  components: {
  },
  data () {
    return {
      queryParams: Object.assign({}, defaultQueryParams),
      companyEdit: Object.assign({}, defaultCompanyEdit),
      listLoading: false,
      list: [],
      listTotal: null,
      companyEditDialogVisible: false,
      isEdit: false,
      rules: {
        name: { required: true, message: '请输入公司名称', trigger: 'blur' },
        contactName: { required: true, message: '请输入联系人', trigger: 'blur' },
        contactTelephone: { required: true, message: '请输入联系方式', trigger: 'blur' }
      }
    }
  },
  computed: {
    routerKey () {
      return this.$route.path
    },
    queryParamsTrans () {
      const paramsTrans = {}
      const { name, contactName, contactTelephone, pageObj } = this.queryParams
      if (name) {
        paramsTrans.name = name
      }
      if (contactName) {
        paramsTrans.contactName = contactName
      }
      if (contactTelephone) {
        paramsTrans.contactTelephone = contactTelephone
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
    handleUpdate (index, row) {
      this.companyEditDialogVisible = true
      this.isEdit = true
      this.companyEdit = Object.assign({}, row)
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除此公司?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        companyApi.remove(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    },
    handleAdd () {
      this.companyEditDialogVisible = true
      this.isEdit = false
      this.companyEdit = Object.assign({}, defaultCompanyEdit)
    },
    handlerCompanyEditDialogOpen () {
    },
    handleCompanyEditDialogConfirm () {
      this.$refs.companyEditForm.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            companyApi.update(this.companyEdit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.companyEditDialogVisible = false
              this.getList()
            })
          } else {
            companyApi.create(this.companyEdit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.companyEditDialogVisible = false
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
      companyApi.fetchList(this.queryParamsTrans).then((response) => {
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
    }
  }
}
</script>

<style scoped>
</style>
