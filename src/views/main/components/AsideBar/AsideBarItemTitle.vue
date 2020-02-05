<template>
  <div>
    <i :class="'el-icon-s-' + metaValue.icon" />
    <span slot="title">
      {{ metaValue.title }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'AsideBarItemTitle',
  props: {
    metaValue: {
      type: Object,
      default: () => {
        return {
          icon: '',
          title: ''
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
