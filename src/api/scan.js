import request from '@/utils/request'

export function add (params) {
  return request({
    url: '/trackingScan/create',
    method: 'post',
    params: params
  })
}

export function list (params) {
  return request({
    url: '/trackingScan/list',
    method: 'get',
    params: params
  })
}

export function recentCount (params) {
  return request({
    url: '/trackingScan/recentCount',
    method: 'get',
    params: params
  })
}

export default {
  add,
  list,
  recentCount
}
