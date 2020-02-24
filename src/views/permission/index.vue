<template>
  <el-container direction="horizontal">
    <p>123</p>
  </el-container>
</template>

<script>

export default {
  components: {
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
