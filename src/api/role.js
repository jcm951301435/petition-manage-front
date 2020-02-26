import request from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/sysRole/list',
    method: 'post',
    params: params
  })
}

export function create (data) {
  return request({
    url: '/sysRole/create',
    method: 'post',
    data: data
  })
}

export function update (data) {
  return request({
    url: '/sysRole/update',
    method: 'post',
    data: data
  })
}

export function remove (id) {
  return request({
    url: '/sysRole/delete/' + id,
    method: 'post'
  })
}

export function rolePermissionList (id) {
  return request({
    url: '/sysRole/rolePermissionList/' + id,
    method: 'post'
  })
}

export function roleAddPermissions (data) {
  return request({
    url: '/sysRole/roleAddPermissions',
    method: 'post',
    data: data
  })
}

export default {
  fetchList,
  create,
  update,
  remove,
  rolePermissionList,
  roleAddPermissions
}
