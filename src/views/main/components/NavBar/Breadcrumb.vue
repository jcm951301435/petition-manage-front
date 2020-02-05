<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbItems"
        :key="item.path"
      >
        <span
          v-if="item.redirect === 'noredirect' || index === breadcrumbItems.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <router-link
          v-else
          :to="item.redirect || item.path"
        >
          {{ item.meta.title }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    breadcrumbItems () {
      let matched = this.$route.matched.filter(item => {
        return item.name
      })
      const first = matched[0]
      if (first && first.name !== 'home') {
        matched = [{
          path: '/home', meta: { title: '首页' }
        }].concat(matched)
      }
      return matched
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>

</style>
