<template>
  <el-header>
    <i
      :class="asideBarActive ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="changeAsideBarActive"
      style="float: left; line-height: 50px;"
    />
    <breadcrumb style="float: left; line-height: 50px; margin-left: 8px;" />
    <span class="nav-welcome-message">
      {{ welcomeMsg }}
    </span>
    <el-link
      class="nav-safe-quit"
      type="primary"
      :underline="false"
      @click="handleLogout"
    >
      安全退出
    </el-link>
  </el-header>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NavBar',
  components: {
    Breadcrumb
  },
  computed: {
    ...mapState({
      asideBarActive: state => state.main.asideBarActive,
      userInfo: state => state.user.userInfo
    }),
    welcomeMsg () {
      return '欢迎 ' + this.userInfo.username
    }
  },
  methods: {
    ...mapActions({
      changeAsideBarActive: 'main/changeAsideBarActive',
      logout: 'user/logout'
    }),
    handleLogout () {
      this.logout().then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style scoped>
  .el-header {
    font-size: 25px;
    line-height: 50px;
    border-bottom: 1px solid #e6e6e6;
  }
  .nav-welcome-message {
    position: absolute;
    right: 100px;
    font-weight: 500;
    font-size: 14px;
  }
  .nav-safe-quit {
    position: absolute;
    right:30px
  }
</style>
