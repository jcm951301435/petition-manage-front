/**
 *  登录、权限
 */
import router from '../router'
// import store from '../store'

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  next()
  // NProgress.start()
  // const token = getToken()
  // if (token) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     next()
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next('/login')
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done()
})
