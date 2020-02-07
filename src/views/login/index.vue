<template>
  <el-card class="login-form-layout">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
    >
      <h2 class="login-title">
        拾山远
      </h2>
      <el-form-item
        prop="username"
      >
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          autocomplete="off"
          prefix-icon="el-icon-user-solid"
        />
      </el-form-item>
      <el-form-item
        prop="password"
      >
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="loginForm.password"
          autocomplete="off"
          prefix-icon="el-icon-lock"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          style="width: 100%"
          type="primary"
          @click="handleLogin()"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('请输入用户名'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('请输入密码'))
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          validator: validateUsername,
          trigger: 'blur'
        }],
        password: [{
          validator: validatePassword,
          trigger: 'blur'
        }]
      },
      loading: false
    }
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'user/login'
    ]),
    handleLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this['user/login'](this.loginForm).then(() => {
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #545040;
  }

  .login-title {
    text-align: center;
  }
</style>
