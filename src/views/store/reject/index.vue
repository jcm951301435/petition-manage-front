<template>
  <div>
    <el-row :gutter="20">
      <el-col
        :span="12"
        style="padding-top: 20px;"
      >
        <scan-part
          ref="scanPart"
          @scanBtnClick="scanBtnClick"
        />
      </el-col>
      <el-col
        :span="10"
        style="padding-top: 20px;"
      >
        <intercept-part ref="interceptPart" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ScanPart from './components/ScanPart'
import InterceptPart from './components/InterceptPart'

export default {
  components: {
    ScanPart,
    InterceptPart
  },
  data () {
    return {

    }
  },
  methods: {
    scanBtnClick () {
      this.$refs.interceptPart.getInterceptList()
    }
  }
}
</script>

<style scoped>

</style>
