<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>查询条件</span>
        <el-button style="float:right;margin-right: 15px" size="small" @click="handleResetSearch()">
          重置
        </el-button>
        <el-button :disabled="!$checkMenuShow('placard:list')" style="float:right" type="primary" size="small" @click="handleSearchList()">
          确认查询
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form ref="queryForm" :inline="true" :model="queryParams" size="small" label-width="140px">
          <el-form-item label="名称：">
            <el-input v-model="queryParams.placardTitle" class="input-width" placeholder="名称" />
          </el-form-item>
          <el-form-item label="内容：">
            <el-input v-model="queryParams.placardContent" class="input-width" placeholder="内容" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>公告列表</span>
      <el-button :disabled="!$checkMenuShow('placard:add')" type="primary" class="btn-add" @click="handleAdd()" style="margin-left: 20px">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border stripe highlight-current-row v-loading="listLoading"
                style="width: 100%" ref="placardTable" row-key="id"
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="placardTitle" label="名称" width="150" />
        <el-table-column prop="insertOn" label="创建日期" width="160" />
        <el-table-column prop="insertByName" label="创建人" width="160" />
        <el-table-column label="操作" width="300" fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="!$checkMenuShow('placard:update')" @click="handleUpdate(scope.$index, scope.row)" type="success" size="small">
              修改
            </el-button>
            <el-button :disabled="!$checkMenuShow('placard:delete')" @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">
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
    <el-dialog :title="isEdit ? '修改公告' : '添加公告'" :visible.sync="listEditDialogVisible" :close-on-click-modal="false"
               width="40%" @open="handlerListEditDialogOpen"
    >
      <el-card style="height: 400px">
        <el-form :model="listEdit" :rules="rules" ref="listEditForm" label-width="150px" size="small">
          <el-form-item label="名称：" prop="placardTitle">
            <el-input v-model="listEdit.placardTitle" style="width: 250px" autocomplete="off" />
          </el-form-item>
          <quill-editor v-model="listEdit.placardContent" ref="placardContentEditor" style="height: 200px" :options="editorOption" />
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="listEditDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleListEditDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import placardApi from '@/api/placard'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/styles/editor.css'

const defaultQueryParams = {
  placardTitle: '',
  pageObj: {
    pageNum: 1,
    pageSize: 10
  }
}
const defaultListEdit = {
  id: '',
  placardTitle: '',
  placardContent: ''
}

export default {
  components: {
    quillEditor
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
        placardTitle: { required: true, message: '请输入标题', trigger: 'blur' }
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']
          ]
        },
        placeholder: '请输入内容'
      }
    }
  },
  computed: {
    routerKey () {
      return this.$route.path
    },
    queryParamsTrans () {
      const paramsTrans = {}
      const { placardTitle, pageObj } = this.queryParams
      if (placardTitle) {
        paramsTrans.placardTitle = placardTitle
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
        placardApi.remove(row.id).then(response => {
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
    handlerListEditDialogOpen () {
    },
    handleListEditDialogConfirm () {
      this.$refs.listEditForm.validate((valid) => {
        console.log(valid)
        if (valid) {
          if (this.isEdit) {
            placardApi.update(this.listEdit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.listEditDialogVisible = false
              this.getList()
            })
          } else {
            placardApi.create(this.listEdit).then(response => {
              this.$message({
                message: response.data,
                type: 'success'
              })
              this.listEditDialogVisible = false
              this.getList()
            })
          }
        }
      })
    },
    getList () {
      this.listLoading = true
      placardApi.fetchList(this.queryParamsTrans).then((response) => {
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
