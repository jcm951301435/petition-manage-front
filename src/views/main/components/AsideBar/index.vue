<template>
  <el-aside
    style="background-color: #304156;"
    :class="asideBarActive ? 'aside-bar-opened' : 'aside-bar-closed'"
  >
    <el-menu
      :default-active="activeMenu"
      :collapse="menuCollapse"
      :show-timeout="200"
      :collapse-transition="false"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <aside-bar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
      />
      <!-- <aside-bar-item /> -->
    </el-menu>
  </el-aside>
</template>

<script>
import AsideBarItem from './AsideBarItem.vue'
import { mapState } from 'vuex'

export default {
  components: {
    AsideBarItem
  },
  computed: {
    ...mapState('main', {
      asideBarActive: state => state.asideBarActive
    }),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    menuCollapse () {
      return !this.asideBarActive
    },
    routes () {
      return this.$router.options.routes
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>
  .aside-bar-opened {
    width: 200px!important;
  }
  .aside-bar-closed {
    width: 50px!important;
  }
  .el-menu {
    border: none;
  }
</style>
