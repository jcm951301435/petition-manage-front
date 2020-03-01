import request from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/sysFile/list',
    method: 'post',
    params: params
  })
}

export function remove (id) {
  return request({
    url: '/sysFile/delete/' + id,
    method: 'post'
  })
}

export default {
  remove,
  fetchList
}
