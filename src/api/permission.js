import request from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/sysPermission/list',
    method: 'post',
    params: params
  })
}

export function rolePermissionList (id) {
  return request({
    url: '/sysPermission/rolePermissionList/' + id,
    method: 'post'
  })
}

export function create (data) {
  return request({
    url: '/sysPermission/create',
    method: 'post',
    data: data
  })
}

export function update (data) {
  return request({
    url: '/sysPermission/update',
    method: 'post',
    data: data
  })
}

export function remove (id) {
  return request({
    url: '/sysPermission/delete/' + id,
    method: 'post'
  })
}

export function roleAddPermissions (data) {
  return request({
    url: '/sysPermission/roleAddPermissions',
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
