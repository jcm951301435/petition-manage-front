/**
 *  登录、权限
 */
import router from '../router'
import store from '../store'

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

// import { Message } from 'element-ui'

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  next()
  NProgress.start()
  const hasUserInfo = store.getters['user/hasUserInfo']
  if (hasUserInfo) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      NProgress.done()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
