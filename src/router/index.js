import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
  //   path: '/test',
  //   name: 'test',
  //   component: test
  // }, {
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
    path: '/petition',
    name: 'petition',
    component: Main,
    redirect: '/petition/contradiction',
    meta: { title: '上访管理', icon: 'cooperation' },
    children: [{
      path: 'company',
      name: 'company',
      component: () => import('@/views/company'),
      meta: { title: '企业管理', icon: 'cooperation', value: 'company:index' }
    }, {
      path: 'contradiction',
      name: 'contradiction',
      component: () => import('@/views/contradiction'),
      meta: { title: '信访矛盾', icon: 'cooperation', value: 'contradiction:index' }
    }, {
      path: 'contradictionAdd',
      name: 'contradictionAdd',
      component: () => import('@/views/contradiction/detail'),
      meta: { title: '新增信访矛盾', icon: 'cooperation' }
    }, {
      path: 'contradictionUpdate',
      name: 'contradictionUpdate',
      component: () => import('@/views/contradiction/detail'),
      meta: { title: '修改信访矛盾', icon: 'cooperation' }
    }, {
      path: 'contradictionDetail',
      name: 'contradictionDetail',
      component: () => import('@/views/contradiction/detail'),
      meta: { title: '信访矛盾明细', icon: 'cooperation' }
    }, {
      path: 'troubleshoot',
      name: 'troubleshoot',
      component: () => import('@/views/troubleshoot'),
      meta: { title: '矛盾排查', icon: 'cooperation', value: 'troubleshoot:index' }
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
      meta: { title: '用户管理', icon: 'cooperation', value: 'user:index' }
    }, {
      path: 'role',
      name: 'role',
      component: () => import('@/views/role'),
      meta: { title: '角色管理', icon: 'cooperation', value: 'role:index' }
    }, {
      path: 'permission',
      name: 'permission',
      component: () => import('@/views/permission'),
      meta: { title: '菜单管理', icon: 'cooperation', value: 'permission:index' }
    }, {
      path: 'list',
      name: 'list',
      component: () => import('@/views/list'),
      meta: { title: '列选管理', icon: 'cooperation', value: 'list:index' }
    }, {
      path: 'homeSetting',
      name: 'homeSetting',
      component: () => import('@/views/display/home'),
      meta: { title: '公告管理', icon: 'cooperation', value: 'homeSetting:index' }
    }, {
      path: 'loginSetting',
      name: 'loginSetting',
      component: () => import('@/views/display/login'),
      meta: { title: '登录页背景', icon: 'cooperation', value: 'loginSetting:index' }
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
    hidden: true,
    component: () => import('@/views/404')
  }]
})
