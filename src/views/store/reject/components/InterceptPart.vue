<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <span style="line-height: 40px;">
          提醒物流单号：
        </span>
      </el-col>
      <el-col :span="12">
        <el-input
          v-model="interceptCode"
          placeholder="请输入"
          clearable
          @keyup.enter.native="interceptBtnClick"
        />
      </el-col>
      <el-col :span="6">
        <el-button
          @click="interceptBtnClick"
        >
          确定
        </el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table
          :data="interceptList"
          border
          stripe
          highlight-current-row
          style="width: 100%"
          ref="interceptListTable"
          row-key="id"
        >
          <el-table-column
            type="index"
            width="50"
          />
          <el-table-column
            prop="trackingNum"
            label="物流号"
            width="150"
          />
          <el-table-column
            prop="interceptOn"
            label="登记拦截时间"
            width="160"
          />
          <el-table-column
            prop="interceptStatus"
            label="拦截状态"
            width="100"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.interceptStatus ? 'danger' : 'success'"
                disable-transitions
              >
                {{ scope.row.interceptStatus ? '已拦截到' : '未拦截到' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button
                @click="deleteBtnClick(scope.row)"
                type="text"
                size="small"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import interceptApi from '@/api/rejectIntercept'

export default {
  name: 'InterceptPart',
  data () {
    return {
      interceptCode: '',
      interceptList: [],
      interceptTotal: 0,
      pageObj: {
        pageNum: 1,
        pageSize: 2000
      }
    }
  },
  computed: {
    interceptQueryParams: function () {
      const { pageNum, pageSize } = this.pageObj
      return {
        pageNum,
        pageSize
      }
    }
  },
  mounted: function () {
    this.getInterceptList()
  },
  methods: {
    getInterceptList () {
      const params = this.interceptQueryParams
      interceptApi.list(params).then((response) => {
        const data = response.data
        const { list, total } = data
        this.interceptList = list
        this.interceptTotal = total
      })
    },
    addIntercept (data) {
      return new Promise((resolve, reject) => {
        interceptApi.add(data).then((response) => {
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    deleteIntercept (id) {
      return new Promise((resolve, reject) => {
        interceptApi.deleteById({
          id: id
        }).then((response) => {
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    interceptBtnClick () {
      const interceptCode = this.interceptCode
      if (interceptCode) {
        this.addIntercept({
          trackingNum: interceptCode
        }).then(() => {
          this.interceptCode = ''
          this.getInterceptList()
        }).catch(() => {
          this.interceptCode = ''
          this.getInterceptList()
        })
      }
    },
    deleteBtnClick (data) {
      const { id } = data
      this.deleteIntercept(id).then(() => {
        this.getInterceptList()
      }).catch(() => {
        this.getInterceptList()
      })
    }
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 10px;
  }
</style>
