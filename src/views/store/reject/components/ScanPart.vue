<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-input
          v-model="scanCode"
          placeholder="请扫描"
          clearable
          @keyup.enter.native="scanBtnClick"
        />
      </el-col>
      <el-col :span="1">
        <el-button
          type="primary"
          @click="scanBtnClick"
        >
          扫描
        </el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input
          v-model="scanCodeFound"
          placeholder="单号"
          clearable
          @keyup.enter.native="searchBtnClick"
        />
      </el-col>
      <el-col :span="12">
        <el-date-picker
          v-model="dateTimeRange"
          type="datetimerange"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          @change="handleDateRangeChange"
        />
      </el-col>
      <el-col :span="1">
        <el-button
          type="success"
          @click="searchBtnClick"
        >
          搜索
        </el-button>
      </el-col>
    </el-row>

    <el-row />

    <el-row>
      <el-col :span="20">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :page-size="pageObj.pageSize"
          :current-page.sync="pageObj.pageNum"
          :total="scanTotal"
          @current-change="handlePageCurrentChange"
        />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="20">
        <el-table
          :data="scanList"
          :row-class-name="tableRowClassName"
          border
          stripe
          highlight-current-row
          height="500"
          style="width: 100%"
          ref="scanListTable"
          row-key="id"
          @current-change="handleTableCurrentChange"
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
            prop="scanOn"
            label="扫描时间"
            width="180"
          />
        </el-table>
      </el-col>
    </el-row>

    <el-row style="font-size: 16px; font-weight: bolder;">
      <el-col :span="20">
        <span style="padding-left: 20px;">
          数量统计：
        </span>
        <span style="padding-left: 20px;">
          今天
        </span>
        <span style="color: red; padding-left: 20px; font-weight: 500;">
          {{ recentCount.today }}
        </span>
        <span style="padding-left: 20px;">
          昨天
        </span>
        <span style="color: red; padding-left: 20px; font-weight: 500;">
          {{ recentCount.yesterday }}
        </span>
        <span style="padding-left: 20px;">
          前天
        </span>
        <span style="color: red; padding-left: 20px; font-weight: 500;">
          {{ recentCount.beforeYesterday }}
        </span>
      </el-col>
    </el-row>
    <audio
      :src="scanAudioSrc"
      ref="scanAudio"
    />
    <audio
      :src="interceptSrc"
      ref="interceptAudio"
    />
  </div>
</template>

<script>
import scanApi from '@/api/rejectScan'
import dateUtils from '@/utils/date'
import scanWav from '@/assets/wav/scan.wav'
import interceptWav from '@/assets/wav/intercept.wav'

export default {
  name: 'ScanPart',
  data () {
    return {
      scanCode: '',
      scanCodeFound: '',
      dateTimeRange: ['', ''],
      pageObj: {
        pageNum: 1,
        pageSize: 20
      },
      scanTotal: 0,
      scanList: [],
      recentCount: {
        today: 0,
        yesterday: 0,
        beforeYesterday: 0
      },
      tableCurrent: 1,
      scanAudioSrc: scanWav,
      interceptSrc: interceptWav
    }
  },
  computed: {
    scanQueryParams: function () {
      const dateTimeRange = this.dateTimeRange
      var scanOnBefore = ''
      var scanOnEnd = ''
      if (dateTimeRange) {
        scanOnBefore = dateTimeRange[0]
        scanOnEnd = dateTimeRange[1]
      }
      const { pageNum, pageSize } = this.pageObj
      return {
        trackingNum: this.scanCodeFound,
        scanOnBefore,
        scanOnEnd,
        pageNum,
        pageSize
      }
    }
  },
  mounted: function () {
    this.initDateTimeRange()
    this.getScanList()
    this.getRecentCount()
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'select-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    initDateTimeRange () {
      var endDateTime = dateUtils.dateAddDays(dateUtils.today(), 1)
      var beginDateTime = dateUtils.dateAddDays(endDateTime, -3)
      this.dateTimeRange = [dateUtils.formatDate(beginDateTime), dateUtils.formatDate(endDateTime)]
    },
    getScanList () {
      const params = this.scanQueryParams
      scanApi.list(params).then((response) => {
        const data = response.data
        const { list, total } = data
        this.scanList = list
        this.scanTotal = total
      })
    },
    addScan (data) {
      return new Promise((resolve, reject) => {
        scanApi.add(data).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    getRecentCount () {
      scanApi.recentCount().then((response) => {
        const data = response.data
        this.recentCount = data
      })
    },
    scanAudioPlay () {
      this.$refs.scanAudio.load()
      this.$refs.scanAudio.play()
    },
    interceptAudioPlay () {
      this.$refs.interceptAudio.load()
      this.$refs.interceptAudio.play()
    },
    scanBtnClick () {
      const scanCode = this.scanCode
      if (scanCode) {
        this.addScan({
          trackingNum: scanCode
        }).then((response) => {
          this.scanCode = ''
          this.pageObj.pageNum = 1
          this.getScanList()
          if (response.data > 0) {
            this.interceptAudioPlay()
            this.$emit('scanBtnClick')
          } else {
            this.scanAudioPlay()
          }
        }).catch(() => {
          this.scanAudioPlay()
          this.scanCode = ''
          this.pageObj.pageNum = 1
          this.getScanList()
        })
      }
    },
    searchBtnClick () {
      this.getScanList()
    },
    handleDateRangeChange () {
      this.getScanList()
    },
    handlePageCurrentChange () {
      this.getScanList()
    },
    handleTableCurrentChange (currentRow) {
    }
  }
}
</script>

<style scoped>
</style>
