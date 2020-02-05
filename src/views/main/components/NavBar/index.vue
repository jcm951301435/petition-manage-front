<template>
  <el-header>
    <i
      :class="asideBarActive ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="changeAsideBarActive"
      style="float: left; line-height: 50px;"
    />
    <breadcrumb style="float: left; line-height: 50px; margin-left: 8px;" />
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
    ...mapState('main', {
      asideBarActive: state => state.asideBarActive
    })
  },
  methods: {
    ...mapActions('main', {
      changeAsideBarActive: 'changeAsideBarActive'
    })
  }
}
</script>

<style scoped>
  .el-header {
    font-size: 25px;
    line-height: 50px;
    border-bottom: 1px solid #e6e6e6;
  }
</style>
