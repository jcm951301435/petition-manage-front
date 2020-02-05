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
    path: '/store',
    name: 'store',
    component: Main,
    redirect: '/store/scan',
    meta: { title: '库存', icon: 'cooperation' },
    children: [{
      path: 'scan',
      name: 'scan',
      component: () => import('@/views/store/scan/index'),
      meta: { title: '库存扫描', icon: 'cooperation' }
    }, {
      path: 'reject',
      name: 'reject',
      component: () => import('@/views/store/reject/index'),
      meta: { title: '退包录入', icon: 'cooperation' }
    }]
  }, {
    path: '*',
    component: () => import('@/views/404')
  }]
})
