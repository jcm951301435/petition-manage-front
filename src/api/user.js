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

export function create (data) {
  return request({
    url: '/sysUser/create',
    method: 'post',
    data: data
  })
}

export function update (data) {
  return request({
    url: '/sysUser/update',
    method: 'post',
    data: data
  })
}

export function remove (id) {
  return request({
    url: '/sysUser/delete/' + id,
    method: 'post'
  })
}

export default {
  login,
  logout,
  fetchList,
  create,
  update,
  remove
}
