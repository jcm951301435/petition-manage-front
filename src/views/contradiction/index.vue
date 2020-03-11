<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>查询条件</span>
        <el-button style="float:right;margin-right: 15px" size="small" @click="handleResetSearch()">
          重置
        </el-button>
        <el-button :disabled="!$checkMenuShow('contradiction:list')" style="float:right" type="primary" size="small" @click="handleSearchList()">
          确认查询
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form ref="queryForm" :inline="true" :model="queryParams" size="small" label-width="140px">
          <el-form-item label="姓名：">
            <!-- <el-input v-model="queryParams.applyName" class="input-width" placeholder="姓名" /> -->
            <el-select v-model="queryParams.applyName" multiple filterable remote reserve-keyword
                       placeholder="请输入关键词" :remote-method="applyNameRemote" :loading="applyNameLoading"
            >
              <el-option v-for="item in applyNameOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="责任单位：">
            <el-input v-model="queryParams.responsibleCompany" class="input-width" placeholder="责任单位" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>信访列表</span>
      <el-button :disabled="!$checkMenuShow('contradiction:add')" type="primary" class="btn-add" @click="handleAdd()" style="margin-left: 20px">
        添加
      </el-button>
      <el-upload ref="uploadBtn" :before-upload="importExcelBeforeUpload" :show-file-list="false" :action="importExcelAction" :http-request="importExcelUpload"
                 style="display: inline-block; margin-left: 20px;"
      >
        <el-button :disabled="!$checkMenuShow('contradiction:import')" slot="trigger" type="success">
          导入Excel
        </el-button>
      </el-upload>
      <el-button :disabled="!$checkMenuShow('contradiction:exportWord')" type="success" class="btn-add" @click="handleExportWord()" style="margin-left: 20px">
        导出查询结果(word)
      </el-button>
      <el-button :disabled="!$checkMenuShow('contradiction:export')" type="success" class="btn-add" @click="handleExport()" style="margin-left: 20px">
        打印查询结果
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border stripe highlight-current-row v-loading="listLoading"
                style="width: 100%" ref="contradictionTable" row-key="id"
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column type="index" width="50" />
        <el-table-column label="姓名" width="150">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleToDetail(scope.$index, scope.row)">
              {{ scope.row.applyName }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" label="责任单位" width="160" />
        <el-table-column prop="resolveLevelName" label="易化解程度" width="160" />
        <!-- <el-table-column prop="petitionType" label="信访类型" width="160" /> -->
        <el-table-column prop="purposeName" label="目的分类" width="160" />
        <el-table-column prop="insertOn" label="创建日期" width="160" />
        <el-table-column prop="insertByName" label="创建人" width="160" />
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="handleToDetail(scope.$index, scope.row)" type="primary" size="small">
              查看
            </el-button>
            <el-button :disabled="!$checkMenuShow('contradiction:update')" @click="handleUpdate(scope.$index, scope.row)" type="success" size="small">
              修改
            </el-button>
            <el-button :disabled="!$checkMenuShow('contradiction:delete')" @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">
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
  </div>
</template>

<script>
import contradictionApi from '@/api/contradiction'

const defaultQueryParams = {
  applyName: '',
  responsibleCompany: '',
  pageObj: {
    pageNum: 1,
    pageSize: 10
  }
}

export default {
  components: {
  },
  data () {
    return {
      queryParams: Object.assign({}, defaultQueryParams),
      listLoading: false,
      list: [],
      listTotal: null,
      applyNameLoading: false,
      applyNameOptions: [],
      importExcelAction: ''
    }
  },
  computed: {
    routerKey () {
      return this.$route.path
    },
    queryParamsTrans () {
      const paramsTrans = {}
      const { applyName, responsibleCompany, pageObj } = this.queryParams
      if (applyName) {
        paramsTrans.applyName = applyName
      }
      if (responsibleCompany) {
        paramsTrans.responsibleCompany = responsibleCompany
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
    handleToDetail (index, row) {
      this.$router.push({ path: '/petition/contradictionDetail', query: { id: row.id } })
    },
    handleUpdate (index, row) {
      this.$router.push({ path: '/petition/contradictionUpdate', query: { id: row.id } })
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除此人员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        contradictionApi.remove(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    },
    handleAdd () {
      this.$router.push({ path: '/petition/contradictionAdd' })
    },
    handleExport () {
      contradictionApi.exportExcel(this.queryParamsTrans, 'pdf')
    },
    handleExportWord () {
      contradictionApi.exportExcel(this.queryParamsTrans, 'doc')
    },
    importExcelUpload (option) {
      contradictionApi.importExcel(option).then(response => {
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
      contradictionApi.fetchList(this.queryParamsTrans).then((response) => {
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
    applyNameRemote (query) {
      if (query !== '') {
          this.applyNameLoading = true
          
          this.applyNameLoading = false
      }
    }
  }
}
</script>

<style scoped>
</style>
