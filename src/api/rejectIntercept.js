import request from '@/utils/request'

export function add (params) {
  return request({
    url: '/trackingRejectIntercept/create',
    method: 'post',
    params: params
  })
}

export function list (params) {
  return request({
    url: '/trackingRejectIntercept/list',
    method: 'get',
    params: params
  })
}

export function deleteById (params) {
  return request({
    url: '/trackingRejectIntercept/delete',
    method: 'post',
    params: params
  })
}

export default {
  add,
  list,
  deleteById
}
