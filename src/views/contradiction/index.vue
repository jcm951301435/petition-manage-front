<template>
  <div style="margin: 20px">
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
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <el-tag>
                <i class="el-icon-more" />
                {{ activeNames.indexOf('1') > -1 ? '收起查询条件' : '展开查询条件' }}
              </el-tag>
              <!-- <i :class="activeNames.indexOf('1') > -1 ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" /> -->
            </template>
            <el-form ref="queryForm" :inline="true" :model="queryParams" size="small" label-width="140px">
              <el-form-item label="姓名：">
                <el-select v-model="queryParams.applyName" multiple filterable remote reserve-keyword
                           placeholder="请输入关键词" :remote-method="applyNameRemote" :loading="applyNameLoading" :collapse-tags="true"
                >
                  <el-option v-for="item in applyNameOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="性别:">
                <el-select v-model="queryParams.applySex" clearable placeholder="请选择">
                  <el-option v-for="item in applySexOptions" :key="item.id" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="责任单位：">
                <el-select v-model="queryParams.responsibleCompany" multiple filterable remote reserve-keyword
                           placeholder="请输入关键词" :remote-method="responsibleCompanyRemote" :loading="responsibleCompanyLoading"
                >
                  <el-option v-for="item in responsibleCompanyOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="核查终结">
                <el-switch v-model="queryParams.checkType" />
              </el-form-item>
              <el-form-item label="是否集访">
                <el-switch v-model="queryParams.teamPetitionState" />
              </el-form-item>
              <el-form-item label="是否完结">
                <el-switch v-model="queryParams.finished" />
              </el-form-item>
              <el-form-item label="易化解程度:">
                <el-select v-model="queryParams.resolveLevel" clearable placeholder="请选择">
                  <el-option v-for="item in resolveLevelOptions" :key="item.id" :label="item.listValue" :value="item.listKey" />
                </el-select>
              </el-form-item>
              <el-form-item label="信访类型:">
                <el-select v-model="queryParams.petitionTypes" multiple clearable placeholder="请选择">
                  <el-option v-for="item in petitionTypeOptions" :key="item.id" :label="item.listValue" :value="item.listKey" />
                </el-select>
              </el-form-item>
              <el-form-item label="目的分类:">
                <el-select v-model="queryParams.purposeType" clearable placeholder="请选择">
                  <el-option v-for="item in purposeTypeOptions" :key="item.id" :label="item.listValue" :value="item.listKey" />
                </el-select>
              </el-form-item>
              <el-form-item label="突出信访矛盾类别:">
                <el-select v-model="queryParams.contradictionType" clearable placeholder="请选择">
                  <el-option v-for="item in contradictionTypeOptions" :key="item.id" :label="item.listValue" :value="item.listKey" />
                </el-select>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
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
      <el-button @click="handleImportTemplate()" type="success" style="margin-left: 20px">
        Excel模板下载
      </el-button>
      <el-dropdown :disabled="!$checkMenuShow('contradiction:exportWord')" trigger="click" style="margin-left: 20px" @command="handleExportWord">
        <el-button type="success">
          导出(word)
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="'query'">
            按查询条件
          </el-dropdown-item>
          <el-dropdown-item :command="'select'">
            按勾选记录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown :disabled="!$checkMenuShow('contradiction:export')" trigger="click" style="margin-left: 20px" @command="handleExport">
        <el-button type="success">
          打印
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="'query'">
            按查询条件
          </el-dropdown-item>
          <el-dropdown-item :command="'select'">
            按勾选记录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
        <el-table-column label="操作" width="250" fixed="right">
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
import listApi from '@/api/list'
import companyApi from '@/api/company'

const defaultQueryParams = {
  applyName: [],
  responsibleCompany: [],
  applySex: '',
  checkType: false,
  teamPetitionState: false,
  resolveLevel: null,
  petitionTypes: null,
  purposeType: null,
  contradictionType: null,
  finished: false,
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
      responsibleCompanyLoading: false,
      responsibleCompanyOptions: [],
      resolveLevelOptions: [],
      petitionTypeOptions: [],
      purposeTypeOptions: [],
      contradictionTypeOptions: [],
      applySexOptions: [{
        id: '1', label: '男', value: '1'
      }, {
        id: '0', label: '女', value: '0'
      }],
      importExcelAction: '',
      activeNames: ['1']
    }
  },
  computed: {
    routerKey () {
      return this.$route.path
    },
    queryParamsTrans () {
      const paramsTrans = {}
      const {
        applyName,
        responsibleCompany,
        applySex,
        checkType,
        teamPetitionState,
        resolveLevel,
        petitionTypes,
        purposeType,
        contradictionType,
        finished,
        pageObj
      } = this.queryParams
      if (applyName) {
        paramsTrans.applyName = applyName
      }
      if (responsibleCompany) {
        paramsTrans.responsibleCompany = responsibleCompany
      }
      if (applySex) {
        paramsTrans.applySex = applySex
      }
      if (checkType != null) {
        paramsTrans.checkType = checkType
      }
      if (teamPetitionState != null) {
        paramsTrans.teamPetitionState = teamPetitionState
      }
      if (resolveLevel) {
        paramsTrans.resolveLevel = resolveLevel
      }
      if (petitionTypes) {
        paramsTrans.petitionTypes = petitionTypes
      }
      if (purposeType) {
        paramsTrans.purposeType = purposeType
      }
      if (contradictionType) {
        paramsTrans.contradictionType = contradictionType
      }
      if (finished) {
        paramsTrans.finished = finished
      }
      const params = {}
      params.pageNum = pageObj.pageNum
      params.pageSize = pageObj.pageSize
      return {
        data: paramsTrans,
        params: params
      }
    }
  },
  created () {
    this.getList()
    this.getListByType('resolveLevel').then(response => {
      this.resolveLevelOptions = response.data.list || []
    })
    this.getListByType('petitionType').then(response => {
      this.petitionTypeOptions = response.data.list || []
    })
    this.getListByType('purposeType').then(response => {
      this.purposeTypeOptions = response.data.list || []
    })
    this.getListByType('contradictionType').then(response => {
      this.contradictionTypeOptions = response.data.list || []
    })
    this.responsibleCompanyRemote()
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
      this.$confirm('是否要删除此记录?', '提示', {
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
    handleExport (dataType) {
      this.basicExportFile('pdf', dataType)
    },
    handleExportWord (dataType) {
      this.basicExportFile('doc', dataType)
    },
    basicExportFile (exportType, dataType) {
      const params = Object.assign({}, this.queryParamsTrans)
      if (dataType === 'select') {
        const selectTion = this.$refs['contradictionTable']['selection']
        if (selectTion && selectTion.length > 0) {
          var idList = []
          for (var i in selectTion) {
            const idTemp = selectTion[i].id
            if (idTemp) {
              idList.push(idTemp)
            }
          }
          params.data.idList = idList
          contradictionApi.exportFile(params, exportType, dataType)
        } else {
          this.$message({
            message: '请先勾选数据',
            type: 'warning'
          })
        }
      } else {
        contradictionApi.exportFile(params, exportType, dataType)
      }
    },
    handleImportTemplate () {
      contradictionApi.importTemplate('contradictionTemplate')
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
    getListByType (type) {
      return listApi.fetchList({
        listType: type
      })
    },
    applyNameRemote (query) {
      if (query !== '') {
        this.applyNameLoading = true
        contradictionApi.applyNameList(query).then((response) => {
          const data = response.data
          const options = []
          for (var i in data) {
            options.push({
              label: data[i],
              value: data[i]
            })
          }
          this.applyNameOptions = options
          this.applyNameLoading = false
        }).catch(() => {
          this.applyNameLoading = false
        })
      }
    },
    responsibleCompanyRemote (query) {
      this.responsibleCompanyLoading = true
      companyApi.fetchList({ name: query }).then(response => {
        const options = []
        const list = response.data.list
        for (var i in list) {
          options.push({
            label: list[i].name,
            value: list[i].id
          })
        }
        this.responsibleCompanyOptions = options
        this.responsibleCompanyLoading = false
      }).catch(() => {
        this.responsibleCompanyLoading = false
      })
    }
  }
}
</script>

<style scoped>
</style>
