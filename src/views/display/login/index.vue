<template>
  <div class="home-div" :style="{backgroundImage: 'url(' + img + ')'}">
    <el-upload :disabled="!$checkMenuShow('loginSetting:image')" ref="uploadBtn" :action="fileListAction" :show-file-list="false" accept="image/jpeg"
               :http-request="importMainImage"
    >
      <el-button class="nav-safe-image-set" slot="trigger" type="primary" v-show="$checkMenuShow('loginSetting:image')">
        登录页图片设置
      </el-button>
    </el-upload>
    <!-- <login-view /> -->
  </div>
</template>

<script>
import fileApi from '@/api/file'
// import LoginView from '@/views/login'

export default {
  components: {
    // LoginView
  },
  data () {
    return {
      fileListAction: '',
      // backgroundImage : url('sysFile/showMainImage'),
      img: 'sysFile/showMainImage'
    }
  },
  methods: {
    importMainImage (option) {
      fileApi.uploadMainImage(option).then(response => {
        this.$message({
          message: response.data,
          type: 'success'
        })
        location.reload()
      })
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>

<style scoped>
.home-div {
  width: 100%;
  height: 100%;
  background-repeat: round;
}
</style>
