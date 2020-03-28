import request from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/sysPlacard/list',
    method: 'post',
    params: params
  })
}

export function create (data) {
  return request({
    url: '/sysPlacard/create',
    method: 'post',
    data: data
  })
}

export function update (data) {
  return request({
    url: '/sysPlacard/update',
    method: 'post',
    data: data
  })
}

export function remove (id) {
  return request({
    url: '/sysPlacard/delete/' + id,
    method: 'post'
  })
}

export function first () {
  return request({
    url: '/sysPlacard/first',
    method: 'post'
  })
}

export default {
  fetchList,
  create,
  update,
  remove,
  first
}
