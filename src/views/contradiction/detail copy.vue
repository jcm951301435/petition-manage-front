<template>
  <div>
    <el-form :model="contradictionForm" :rules="rules" ref="contradictionForm" label-width="150px" size="small">
      <el-form-item label="突出信访矛盾类别" prop="contradictionType">
        <el-checkbox-group v-model="contradictionForm.contradictionType">
          <el-checkbox v-for="item in contradictionTypeOptions" :key="item.listKey" :label="item.listValue" > {{ item.listValue }} </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="突出矛盾基本信息" /> -->
      <el-form-item label="姓名" prop="applyName">
        <el-input v-model="contradictionForm.applyName" style="width: 120px" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" prop="applyName">
        <el-input v-model="contradictionForm.applyName" style="width: 120px" autocomplete="off" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import contradictionApi from '@/api/contradiction'
import listApi from '@/api/list'

const defaultContradictionForm = {
  contradictionType: []
}

export default {
  components: {
  },
  data () {
    return {
      contradictionForm: Object.assign({}, defaultContradictionForm),
      rules: {},
      contradictionTypeOptions: []
    }
  },
  computed: {
    routerKey () {
      return this.$route.path
    }
  },
  created () {
    this.getListByType('contradictionType').then(response => {
      this.contradictionTypeOptions = response.data.list
    })
  },
  methods: {
    getListByType (type) {
      return listApi.fetchList({
        listType: type
      })
    }
  }
}
</script>

<style scoped>
</style>
