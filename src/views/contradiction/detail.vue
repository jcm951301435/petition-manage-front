<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="16">
        <el-row>
          <el-form ref="contradictionForm" :label-position="'right'" :model="contradictionForm" :rules="rules" size="medium"
                   label-width="100px"
          >
            <el-col :span="24">
              <el-form-item label-width="150px" label="突出信访矛盾类别" prop="contradictionType">
                <el-checkbox-group v-model="contradictionForm.contradictionType">
                  <el-checkbox v-for="item in contradictionTypeOptions" :key="item.listKey" :label="item.listKey">
                    {{ item.listValue }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-tag>
              基本信息
            </el-tag>
            <el-card>
              <el-col :span="8">
                <el-form-item label="姓名" prop="applyName">
                  <el-input v-model="contradictionForm.applyName" placeholder="请输入姓名" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别" prop="applySex">
                  <el-radio-group v-model="contradictionForm.applySex">
                    <el-radio :label="1">
                      男
                    </el-radio>
                    <el-radio :label="0">
                      女
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出生年月" prop="applyBirth">
                  <el-date-picker v-model="contradictionForm.applyBirth" type="month" placeholder="请输入出生年月" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="信访类型" prop="petitionType">
                  <el-checkbox-group v-model="contradictionForm.petitionType">
                    <el-checkbox v-for="item in petitionTypeOptions" :key="item.listKey" :label="item.listKey">
                      {{ item.listValue }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="政治面貌" prop="applyPoliticalStatus">
                  <el-select v-model="contradictionForm.applyPoliticalStatus" placeholder="请选择">
                    <el-option v-for="item in applyPoliticalStatusOptions" :key="item.id" :label="item.listValue" :value="item.listKey" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="目的分类" prop="purposeType">
                  <el-select v-model="contradictionForm.purposeType" placeholder="请选择">
                    <el-option v-for="item in purposeTypeOptions" :key="item.id" :label="item.listValue" :value="item.listKey" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="身份证号" prop="applyIdCard">
                  <el-input v-model="contradictionForm.applyIdCard" placeholder="请输入身份证号" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="常住地址" prop="applyAddress">
                  <el-input v-model="contradictionForm.applyAddress" placeholder="请输入常住地址" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="核查终结" prop="checkType">
                  <el-switch v-model="contradictionForm.checkType" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属派出所" prop="applyPoliceStation">
                  <el-input v-model="contradictionForm.applyPoliceStation" placeholder="请输入所属派出所" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属街道" prop="applyStreet">
                  <el-input v-model="contradictionForm.applyStreet" placeholder="请输入所属街道" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
            </el-card>
            <el-divider />
            <el-tag type="success">
              责任信息
            </el-tag>
            <el-card>
              <el-col :span="8">
                <el-form-item label="责任单位" prop="field113">
                  <el-select v-model="contradictionForm.companyId" filterable placeholder="请选择">
                    <el-option v-for="item in companyOptions" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="单位负责人" prop="responsibleContactName">
                  <el-input v-model="contradictionForm.responsibleContactName" placeholder="请输入单位负责人" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="120px" label="负责人手机号" prop="field115">
                  <el-input v-model="contradictionForm.responsibleContactTelephone" placeholder="请输入负责人手机号" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label-width="120px" label="近年进京情况" prop="field116">
                  <el-input v-model="contradictionForm.enterBeijingState" placeholder="请输入近年进京情况" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label-width="300px" label="附件上传（表格、文字、视频影音等）" prop="field117">
                  <!-- <el-upload ref="field117" :file-list="field117fileList" :action="field117Action" :before-upload="field117BeforeUpload">
                    <el-button size="small" type="primary" icon="el-icon-upload">
                      点击上传
                    </el-button>
                  </el-upload> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label-width="160px" label="是否集访、人数" prop="teamPetitionState">
                  <el-switch v-model="contradictionForm.teamPetitionState" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="" prop="teamPetitionCount">
                  <el-input-number v-model="contradictionForm.teamPetitionCount" />
                </el-form-item>
              </el-col>
            </el-card>
            <el-divider />
            <el-tag type="warning">
              信访内容
            </el-tag>
            <el-card>
              <el-col :span="8">
                <el-form-item label-width="120px" label="首次信访时间" prop="firstPetitionTime">
                  <el-date-picker v-model="contradictionForm.firstPetitionTime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" align="right" type="date" placeholder="请选择首次信访时间" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="120px" label="末次信访时间" prop="lastPetitionTime">
                  <el-date-picker v-model="contradictionForm.lastPetitionTime" align="right" type="date" placeholder="请选择末次信访时间" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="易化解程度" prop="resolveLevel">
                  <el-select v-model="contradictionForm.resolveLevel" placeholder="请选择易化解程度">
                    <el-option v-for="item in resolveLevelOptions" :key="item.id" :label="item.listValue" :value="item.listKey" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label-width="120px" label="信访人诉求概述" prop="field124">
                  <el-input v-model="contradictionForm.field124" type="textarea" placeholder="请输入信访人诉求概述"
                            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label-width="120px" label="化解过程简述" prop="field126">
                  <el-input v-model="contradictionForm.field126" type="textarea" placeholder="请输入化解过程简述"
                            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label-width="120px" label="化解推进方法" prop="resolveMethodSelf">
                  <el-checkbox v-model="contradictionForm.resolveMethodSelf">
                    立足自身解决：领导包案，包案领导姓名
                    <el-input class="jc_checkbox_input" v-model="contradictionForm.resolveMethodSelfName" placeholder="包案领导姓名" clearable :style="{width: '20%'}" />
                    职务
                    <el-input class="jc_checkbox_input" v-model="contradictionForm.resolveMethodSelfPosition" placeholder="包案领导职务" clearable :style="{width: '20%'}" />
                  </el-checkbox>
                  <el-checkbox v-model="contradictionForm.resolveMethodThird">
                    第三方参与化解：第三方单位
                    <el-input class="jc_checkbox_input" v-model="contradictionForm.resolveMethodThirdCompany" placeholder="第三方单位" clearable :style="{width: '20%'}" />
                    姓名
                    <el-input class="jc_checkbox_input" v-model="contradictionForm.resolveMethodThirdName" placeholder="姓名" clearable :style="{width: '20%'}" />
                  </el-checkbox>
                  <el-checkbox v-model="contradictionForm.resolveMethodState">
                    市国资系统推进：项目制，项目负责人姓名
                    <el-input class="jc_checkbox_input" v-model="contradictionForm.resolveMethodStateName" placeholder="姓名" clearable :style="{width: '20%'}" />
                    单位
                    <el-input class="jc_checkbox_input" v-model="contradictionForm.resolveMethodStateCompany" placeholder="单位" clearable :style="{width: '20%'}" />
                  </el-checkbox>
                  <el-checkbox class="jc_checkbox" v-model="contradictionForm.resolveMethodCity">
                    市级层面推进：
                    <el-checkbox style="display:block;" v-model="contradictionForm.resolveMethodCityLeader">
                      市领导接访：领导姓名
                      <el-input class="jc_checkbox_input" v-model="contradictionForm.resolveMethodCityLeaderName" placeholder="姓名" clearable :style="{width: '20%'}" />
                      职务
                      <el-input class="jc_checkbox_input" v-model="contradictionForm.resolveMethodCityLeaderPosition" placeholder="职务" clearable :style="{width: '20%'}" />
                    </el-checkbox>
                    <el-checkbox style="display:block;" v-model="contradictionForm.resolveMethodCityMeeting">
                      市信访稳定工作例会
                    </el-checkbox>
                    <el-checkbox style="display:block;" v-model="contradictionForm.resolveMethodCitySeparate">
                      市分级分责
                    </el-checkbox>
                  </el-checkbox>
                  <br>
                  <el-checkbox v-model="contradictionForm.resolveMethodCityOther">
                    其他
                  </el-checkbox>
                </el-form-item>
                <el-form-item v-show="contradictionForm.resolveMethodCityOther" label-width="120px" label="其他推进方法" prop="resolveMethodCityOtherContent">
                  <el-input v-model="contradictionForm.resolveMethodCityOtherContent" type="textarea" placeholder="请输入其他推进方法"
                            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label-width="120px" label="化解形式" prop="field129">
                  <el-checkbox-group v-model="contradictionForm.resolveForm">
                    <el-checkbox style="display:block;" v-for="item in resolveFormOptions" :key="item.listKey" :label="item.listKey">
                      {{ item.listValue }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item v-show="contradictionForm.resolveForm.indexOf('6') >= 0" label-width="120px" label="其他化解形式" prop="resolveFormOtherContent">
                  <el-input v-model="contradictionForm.resolveFormOtherContent" type="textarea" placeholder="请输入其他化解形式"
                            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"
                  />
                </el-form-item>
              </el-col>
            </el-card>
            <el-divider />
            <el-col :span="24">
              <el-form-item size="large">
                <el-button type="primary" @click="submitForm">
                  提交
                </el-button>
                <el-button @click="resetForm">
                  重置
                </el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import listApi from '@/api/list'
import companyApi from '@/api/company'
import contradictionApi from '@/api/contradiction'

const defaultContradictionForm = {
  contradictionType: [],
  petitionType: [],
  resolveForm: []
}

export default {
  components: {},
  props: [],
  data () {
    return {
      contradictionForm: Object.assign({}, defaultContradictionForm),
      contradictionTypeOptions: [],
      petitionTypeOptions: [],
      purposeTypeOptions: [],
      applyPoliticalStatusOptions: [],
      companyOptions: [],
      resolveLevelOptions: [],
      resolveFormOptions: [],
      rules: {}
    }
  },
  computed: {
    routerKey () {
      return this.$route.path
    },
    formatForm () {
      return {

      }
    }
  },
  watch: {},
  created () {
    this.getListByType('contradictionType').then(response => {
      this.contradictionTypeOptions = response.data.list || []
    })
    this.getListByType('petitionType').then(response => {
      this.petitionTypeOptions = response.data.list || []
    })
    this.getListByType('purposeType').then(response => {
      this.purposeTypeOptions = response.data.list || []
    })
    this.getListByType('politicalStatus').then(response => {
      this.applyPoliticalStatusOptions = response.data.list || []
    })
    this.getListByType('resolveLevel').then(response => {
      this.resolveLevelOptions = response.data.list || []
    })
    this.getListByType('resolveForm').then(response => {
      this.resolveFormOptions = response.data.list || []
    })
    this.getCompanyList()
  },
  mounted () {},
  methods: {
    submitForm () {
      this.$refs['contradictionForm'].validate(valid => {
        if (!valid) {
          return
        }
        contradictionApi.create(this.contradictionForm).then(response => {
          this.$message({
            message: response.data,
            type: 'success'
          })
        })
      })
    },
    resetForm () {
      this.$refs['elForm'].resetFields()
    },
    field117BeforeUpload (file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      return isRightSize
    },
    getListByType (type) {
      return listApi.fetchList({
        listType: type
      })
    },
    getCompanyList (queryString, callBack) {
      companyApi.fetchList({ name: queryString }).then(response => {
        this.companyOptions = response.data.list
        if (callBack) {
          callBack(response.data.list)
        }
      })
    }
  }
}

</script>
<style>
.jc_checkbox_input .el-input__inner {
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
}

.jc_checkbox>.el-checkbox__input{
  margin-top: -150px;
}

</style>
