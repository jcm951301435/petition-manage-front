<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>查询条件</span>
        <el-button style="float:right;margin-right: 15px" size="small" @click="handleResetSearch()">
          重置
        </el-button>
        <el-button :disabled="!$checkMenuShow('troubleshoot:list')" style="float:right" type="primary" size="small" @click="handleSearchList()">
          确认查询
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form ref="queryForm" :inline="true" :model="queryParams" size="small" label-width="140px">
          <el-form-item label="归口集团：">
            <el-autocomplete class="inline-input" v-model="queryParams.companyName" value-key="name" :fetch-suggestions="handleQueryCompanySearch" placeholder="归口集团" />
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="queryParams.status" clearable placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="矛盾级别:">
            <el-select v-model="queryParams.contradictionLevel" clearable placeholder="请选择">
              <el-option v-for="item in contradictionLevelOptions" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>公司列表</span>
      <el-button :disabled="!$checkMenuShow('troubleshoot:add')" type="primary" class="btn-add" @click="handleAdd()" style="margin-left: 20px">
        添加
      </el-button>
      <el-upload ref="uploadBtn" :before-upload="importExcelBeforeUpload" :show-file-list="false" :action="importExcelAction" :http-request="importExcelUpload"
                 style="display: inline-block; margin-left: 20px;"
      >
        <el-button :disabled="!$checkMenuShow('troubleshoot:import')" slot="trigger" type="success">
          导入Excel
        </el-button>
      </el-upload>
      <el-button :disabled="!$checkMenuShow('troubleshoot:export')" type="success" class="btn-add" @click="handleExport()" style="margin-left: 20px">
        导出查询结果
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border stripe highlight-current-row v-loading="listLoading"
                style="width: 100%" ref="troubleshootTable" row-key="id"
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="companyName" label="归口集团" width="120" />
        <el-table-column label="群体或个体" width="120">
          <template slot-scope="scope">
            {{ scope.row.teamPetitionState ? '群体' : '单体' }}
          </template>
        </el-table-column>
        <el-table-column prop="contradictionLevel" label="矛盾级别" width="100" />
        <el-table-column prop="teamPetitionCount" label="涉及人数" width="100" />
        <el-table-column prop="responsibleCompany" label="责任企业" width="160" />
        <el-table-column prop="content" label="信访主要诉求" width="160" />
        <el-table-column prop="contradictionType" label="矛盾类型" width="160" />
        <el-table-column prop="resolveProcess" label="主要措施" width="160" />
        <el-table-column prop="status" label="状态" width="100" />
        <el-table-column prop="remarks" label="备注" width="160" />
        <el-table-column prop="insertOn" label="创建日期" width="160" />
        <el-table-column prop="insertByName" label="创建人" width="160" />
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="!$checkMenuShow('troubleshoot:update')" @click="handleUpdate(scope.$index, scope.row)" type="success" size="small">
              修改
            </el-button>
            <el-button :disabled="!$checkMenuShow('troubleshoot:delete')" @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">
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
    <el-dialog :title="isEdit ? '修改记录' : '添加记录'" :visible.sync="editDialogVisible" :close-on-click-modal="false"
               width="40%" @open="handlerEditDialogOpen"
    >
      <el-form :model="edit" :rules="rules" ref="editForm" label-width="150px" size="small">
        <el-form-item label="公司名：" prop="companyId">
          <el-select v-model="edit.companyId" placeholder="请选择">
            <el-option v-for="item in companyOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="群体/个体：" prop="teamPetitionState">
          <el-switch v-model="edit.teamPetitionState" active-text="群体" inactive-text="个人" />
        </el-form-item>
        <el-form-item label="涉及人数：" prop="teamPetitionCount">
          <el-input-number v-model="edit.teamPetitionCount" :min="1" :max="10000" label="涉及人数" />
        </el-form-item>
        <el-form-item label="矛盾级别：" prop="contradictionLevel">
          <el-select v-model="edit.contradictionLevel" placeholder="请选择">
            <el-option v-for="item in contradictionLevelOptions" :key="item.id" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="责任企业：" prop="responsibleCompany">
          <el-input v-model="edit.responsibleCompany" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="信访主要诉求：" prop="content">
          <el-input type="textarea" :rows="5" v-model="edit.content" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="矛盾类型：" prop="contradictionType">
          <el-input v-model="edit.contradictionType" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="工作措施：" prop="resolveProcess">
          <el-input type="textarea" :rows="5" v-model="edit.resolveProcess" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="edit.status" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleEditDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import troubleshootApi from '@/api/troubleshoot'
import companyApi from '@/api/company'

const defaultQueryParams = {
  companyName: '',
  status: '',
  contradictionLevel: '',
  pageObj: {
    pageNum: 1,
    pageSize: 10
  }
}
const defaultEdit = {
  id: '',
  companyId: '',
  teamPetitionState: '',
  teamPetitionCount: 1,
  contradictionLevel: '',
  responsibleCompany: '',
  content: '',
  contradictionType: '',
  resolveProcess: '',
  status: ''
}

export default {
  components: {
  },
  data () {
    return {
      queryParams: Object.assign({}, defaultQueryParams),
      edit: Object.assign({}, defaultEdit),
      listLoading: false,
      list: [],
      listTotal: null,
      editDialogVisible: false,
      isEdit: false,
      rules: {
        name: { required: true, message: '请输入公司名称', trigger: 'blur' },
        contactName: { required: true, message: '请输入联系人', trigger: 'blur' },
        contactTelephone: { required: true, message: '请输入联系方式', trigger: 'blur' }
      },
      contradictionLevelOptions: [{
        id: '1', label: 'A', value: 'A'
      }, {
        id: '2', label: 'B', value: 'B'
      }, {
        id: '3', label: 'C', value: 'C'
      }],
      statusOptions: [{
        id: '1', label: '办结', value: '办结'
      }, {
        id: '2', label: '新增', value: '新增'
      }, {
        id: '3', label: '留存', value: '留存'
      }],
      companyOptions: [],
      importExcelAction: '/petitionTroubleshoot/import'
    }
  },
  computed: {
    routerKey () {
      return this.$route.path
    },
    queryParamsTrans () {
      const paramsTrans = {}
      const { companyName, status, contradictionLevel, pageObj } = this.queryParams
      if (companyName) {
        paramsTrans.companyName = companyName
      }
      if (status) {
        paramsTrans.status = status
      }
      if (contradictionLevel) {
        paramsTrans.contradictionLevel = contradictionLevel
      }
      paramsTrans.pageNum = pageObj.pageNum
      paramsTrans.pageSize = pageObj.pageSize
      return paramsTrans
    }
  },
  created () {
    this.getList()
    this.getCompanyList()
  },
  methods: {
    handleSearchList () {
      this.getList()
    },
    handleResetSearch () {
      this.queryParams = Object.assign({}, defaultQueryParams)
    },
    handleQueryCompanySearch (queryString, callBack) {
      this.getCompanyList(queryString, callBack)
    },
    handleUpdate (index, row) {
      this.editDialogVisible = true
      this.isEdit = true
      this.edit = Object.assign({}, row)
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除此记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        troubleshootApi.remove(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    },
    handleAdd () {
      this.editDialogVisible = true
      this.isEdit = false
      this.edit = Object.assign({}, defaultEdit)
    },
    handleExport () {
      troubleshootApi.exportExcel(this.queryParamsTrans)
    },
    handlerEditDialogOpen () {
    },
    handleEditDialogConfirm () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            troubleshootApi.update(this.edit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.editDialogVisible = false
              this.getList()
            })
          } else {
            troubleshootApi.create(this.edit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.editDialogVisible = false
              this.getList()
            })
          }
        } else {
          return false
        }
      })
    },
    importExcelUpload (option) {
      troubleshootApi.importExcel(option).then(response => {
        this.$message({
          message: response.data,
          type: 'success'
        })
        this.getList()
      })
    },
    importExcelBeforeUpload (file) {
      let isRightSize = file.size / 1024 / 1024 < 1024
      if (!isRightSize) {
        this.$message.error('文件大小超过 1024MB')
      }
      return isRightSize
    },
    getList () {
      this.listLoading = true
      troubleshootApi.fetchList(this.queryParamsTrans).then((response) => {
        this.listLoading = false
        const data = response.data
        const { list, total } = data
        this.list = list
        this.listTotal = total
      }).catch(() => {
        this.listLoading = false
      })
    },
    getCompanyList (queryString, callBack) {
      companyApi.fetchList({ name: queryString }).then(response => {
        this.companyOptions = response.data.list
        if (callBack) {
          callBack(response.data.list)
        }
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
