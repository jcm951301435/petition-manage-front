<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>查询条件</span>
        <el-button style="float:right;margin-right: 15px" size="small" @click="handleResetSearch()">
          重置
        </el-button>
        <el-button :disabled="!$checkMenuShow('list:list')" style="float:right" type="primary" size="small" @click="handleSearchList()">
          确认查询
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form ref="queryForm" :inline="true" :model="queryParams" size="small" label-width="140px">
          <el-form-item label="类别名：">
            <el-input v-model="queryParams.listName" class="input-width" placeholder="类别名" />
          </el-form-item>
          <el-form-item label="键:">
            <el-input v-model="queryParams.listKey" class="input-width" placeholder="键" />
          </el-form-item>
          <el-form-item label="值:">
            <el-input v-model="queryParams.listValue" class="input-width" placeholder="值" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>列选项列表</span>
      <el-button :disabled="!$checkMenuShow('list:add')" type="primary" class="btn-add" @click="handleAdd()" style="margin-left: 20px">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border stripe highlight-current-row v-loading="listLoading"
                style="width: 100%" ref="listTable" row-key="id"
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="listType" label="类别" width="150" />
        <el-table-column prop="listName" label="类型名" width="150" />
        <el-table-column prop="listKey" label="键" width="120" />
        <el-table-column prop="listValue" label="值" width="160" />
        <el-table-column prop="insertOn" label="创建日期" width="160" />
        <el-table-column prop="insertByName" label="创建人" width="160" />
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button :disabled="!$checkMenuShow('list:add')" @click="handleAddSame(scope.$index, scope.row)" type="primary" size="small">
              添加同类别
            </el-button>
            <el-button :disabled="!$checkMenuShow('list:update')" @click="handleUpdate(scope.$index, scope.row)" type="success" size="small">
              修改
            </el-button>
            <el-button :disabled="!$checkMenuShow('list:delete')" @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">
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
    <el-dialog :title="isEdit ? '修改列选项' : '添加列选项'" :visible.sync="listEditDialogVisible" :close-on-click-modal="false"
               width="40%" @open="handlerListEditDialogOpen"
    >
      <el-form :model="listEdit" :rules="rules" ref="listEditForm" label-width="150px" size="small">
        <el-form-item label="类别：" prop="listType">
          <el-input v-model="listEdit.listType" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类别名：" prop="listName">
          <el-input v-model="listEdit.listName" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="键：" prop="listKey">
          <el-input v-model="listEdit.listKey" style="width: 250px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="值：" prop="listValue">
          <el-input v-model="listEdit.listValue" style="width: 250px" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="listEditDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleListEditDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import listApi from '@/api/list'

const defaultQueryParams = {
  listName: '',
  listKey: '',
  listValue: '',
  pageObj: {
    pageNum: 1,
    pageSize: 10
  }
}
const defaultListEdit = {
  id: '',
  listType: '',
  listName: '',
  listKey: '',
  listValue: ''
}

export default {
  components: {
  },
  data () {
    return {
      queryParams: Object.assign({}, defaultQueryParams),
      listEdit: Object.assign({}, defaultListEdit),
      listLoading: false,
      list: [],
      listTotal: null,
      listEditDialogVisible: false,
      isEdit: false,
      rules: {
        listType: { required: true, message: '请输入类别', trigger: 'blur' },
        listName: { required: true, message: '请输入类别名', trigger: 'blur' },
        listKey: { required: true, message: '请输入选项键', trigger: 'blur' },
        listValue: { required: true, message: '请输入选项值', trigger: 'blur' }
      }
    }
  },
  computed: {
    routerKey () {
      return this.$route.path
    },
    queryParamsTrans () {
      const paramsTrans = {}
      const { listName, listKey, listValue, pageObj } = this.queryParams
      if (listName) {
        paramsTrans.listName = listName
      }
      if (listKey) {
        paramsTrans.listKey = listKey
      }
      if (listValue) {
        paramsTrans.listValue = listValue
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
      this.listEditDialogVisible = true
      this.isEdit = true
      this.listEdit = Object.assign({}, row)
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除此选项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        listApi.remove(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    },
    handleAdd () {
      this.listEditDialogVisible = true
      this.isEdit = false
      this.listEdit = Object.assign({}, defaultListEdit)
    },
    handleAddSame (index, row) {
      this.listEditDialogVisible = true
      this.isEdit = false
      console.log(row)
      var listEdit = Object.assign({}, defaultListEdit)
      listEdit = Object.assign(listEdit, { listType: row.listType, listName: row.listName })
      this.listEdit = listEdit
    },
    handlerListEditDialogOpen () {
    },
    handleListEditDialogConfirm () {
      this.$refs.listEditForm.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            listApi.update(this.listEdit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.listEditDialogVisible = false
              this.getList()
            })
          } else {
            listApi.create(this.listEdit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.listEditDialogVisible = false
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
      listApi.fetchList(this.queryParamsTrans).then((response) => {
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
