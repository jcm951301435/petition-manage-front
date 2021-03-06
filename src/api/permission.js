import request from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/sysPermission/list',
    method: 'post',
    params: params
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

export default {
  fetchList,
  create,
  update,
  remove
}
