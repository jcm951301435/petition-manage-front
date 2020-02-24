import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: Main,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  }, {
    path: '/sys',
    name: 'sys',
    component: Main,
    redirect: '/sys/user',
    meta: { title: '系统管理', icon: 'cooperation' },
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('@/views/user'),
      meta: { title: '用户管理', icon: 'cooperation' }
    }, {
      path: 'role',
      name: 'role',
      component: () => import('@/views/role'),
      meta: { title: '角色管理', icon: 'cooperation' }
    }, {
      path: 'permission',
      name: 'permission',
      component: () => import('@/views/permission'),
      meta: { title: '权限管理', icon: 'cooperation' }
    }]
  }, {
    path: '/login',
    component: () => import('@/views/login'),
    meta: { title: '登录', icon: 'cooperation' }
  // }, {
  //   path: '/store',
  //   name: 'store',
  //   component: Main,
  //   redirect: '/store/scan',
  //   meta: { title: '库存', icon: 'cooperation' },
  //   children: [{
  //     path: 'scan',
  //     name: 'scan',
  //     component: () => import('@/views/store/scan/index'),
  //     meta: { title: '库存扫描', icon: 'cooperation' }
  //   }, {
  //     path: 'reject',
  //     name: 'reject',
  //     component: () => import('@/views/store/reject/index'),
  //     meta: { title: '退包录入', icon: 'cooperation' }
  //   }]
  }, {
    path: '*',
    component: () => import('@/views/404')
  }]
})
