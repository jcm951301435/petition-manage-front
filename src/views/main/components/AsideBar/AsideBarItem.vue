<template>
  <div
    v-if="!item.hidden"
    class="menu-wrapper"
  >
    <!-- 显示当前级 或 显示子级 -->
    <template v-if="onlyShowChild || onlyShowCurrent">
      <router-link
        :to="routerLinkPath"
        class="router-link-cls"
      >
        <el-menu-item :index="routerLinkPath">
          <aside-bar-item-title
            :meta-value="routerMetaShow"
          />
        </el-menu-item>
      </router-link>
    </template>

    <!-- 显示当前级、子级 -->
    <template v-else>
      <el-submenu :index="routerLinkPath">
        <aside-bar-item-title
          slot="title"
          :meta-value="routerMetaShow"
        />
        <template v-if="childrenShow.length > 0">
          <aside-bar-item
            v-for="child in childrenShow"
            :key="child.path"
            :item="child"
            :parent-path="routerLinkPath"
          />
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import AsideBarItemTitle from './AsideBarItemTitle.vue'

export default {
  name: 'AsideBarItem',
  components: {
    AsideBarItemTitle
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    parentPath: {
      /** 用于获取本级路由全路径 */
      type: String,
      default: () => {
        return ''
      }
    }
  },
  computed: {
    childrenShow () {
      const children = this.item.children
      if (children) {
        const childrenShow = children.filter((child) => {
          if (child.hidden) {
            return false
          }
          return true
        })
        return childrenShow
      }
      return []
    },
    onlyShowChild () {
      if (this.childrenShow.length === 1 && this.item.path === '/') {
        return true
      }
      return false
    },
    onlyShowCurrent () {
      return this.childrenShow.length === 0
    },
    routerItemShow () {
      if (this.onlyShowChild) {
        // 1.当前级不显示 仅显示子级
        return this.childrenShow[0]
      }
      // 2.当前级 无子级  3.当前级 + 子级
      return this.item
    },
    routerMetaShow () {
      return this.routerMeta(this.routerItemShow)
    },
    routerLinkPath () {
      var parentPath = this.parentPath
      if (parentPath.indexOf('/') !== 0) {
        parentPath = '/' + parentPath
      }
      if (parentPath === '/') {
        parentPath = ''
      }
      var currentItemPath = this.routerItemShow.path
      if (currentItemPath.indexOf('/') !== 0) {
        currentItemPath = '/' + currentItemPath
      }
      if (currentItemPath === '/') {
        parentPath = ''
      }
      return parentPath + currentItemPath
    }
  },
  mounted: function () {
  },
  methods: {
    routerMeta (itemTemp) {
      return itemTemp.meta || {}
    }
  }
}
</script>

<style scoped>
  .router-link-cls {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }
</style>
