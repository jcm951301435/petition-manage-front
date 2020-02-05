import request from '@/utils/request'

export function add (params) {
  return request({
    url: '/trackingIntercept/create',
    method: 'post',
    params: params
  })
}

export function list (params) {
  return request({
    url: '/trackingIntercept/list',
    method: 'get',
    params: params
  })
}

export function deleteById (params) {
  return request({
    url: '/trackingIntercept/delete',
    method: 'post',
    params: params
  })
}

export default {
  add,
  list,
  deleteById
}
