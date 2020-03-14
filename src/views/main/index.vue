<template>
  <el-container direction="horizontal">
    <aside-bar />
    <el-container direction="vertical" style="width: 100%">
      <nav-bar />
      <el-main>
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view :key="routerKey" />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { AsideBar, NavBar } from './components'

export default {
  components: {
    AsideBar,
    NavBar
  },
  data () {
    return {
    }
  },
  computed: {
    routerKey () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
</style>
