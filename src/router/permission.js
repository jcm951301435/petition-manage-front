/**
 *  登录、权限
 */
import router from '../router'
import store from '../store'

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

import { Message } from 'element-ui'

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  const hasUserInfo = store.getters['user/hasUserInfo']
  const permissions = store.state.user.permissions
  if (hasUserInfo) {
    if (to.path === '/login') {
      nextRouter(next, '', '/')
    } else {
      if (permissions.length <= 0) {
        store.dispatch('user/getUserPermissions').then(res => {
          nextRouter(next, '', '', to)
        }).catch(err => {
          store.dispatch('user/frontLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            nextRouter(next, '', '/')
          })
        })
      } else {
        nextRouter(next, '', '', to)
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      nextRouter(next, '', '', to)
    } else {
      nextRouter(next, '/login')
    }
  }
})

function nextRouter (next, uri, path, to) {
  if (uri) {
    next(uri)
  } else if (path) {
    next({ path: path })
  }
  if (to && to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
  NProgress.done()
}

router.afterEach(() => {
  NProgress.done()
})
