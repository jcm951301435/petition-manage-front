import request from '@/utils/request'

export function login (username, password) {
  return request({
    url: '/sysUser/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function logout () {
  return request({
    url: '/sysUser/logout',
    method: 'post'
  })
}

export function fetchList (params) {
  return request({
    url: '/sysUser/list',
    method: 'post',
    params: params
  })
}

export function createUser (data) {
  return request({
    url: '/sysUser/create',
    method: 'post',
    data: data
  })
}

export default {
  login,
  logout,
  fetchList,
  createUser
}
