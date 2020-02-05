import request from '@/utils/request'

export function add (params) {
  return request({
    url: '/trackingRejectScan/create',
    method: 'post',
    params: params
  })
}

export function list (params) {
  return request({
    url: '/trackingRejectScan/list',
    method: 'get',
    params: params
  })
}

export function recentCount (params) {
  return request({
    url: '/trackingRejectScan/recentCount',
    method: 'get',
    params: params
  })
}

export default {
  add,
  list,
  recentCount
}
