import request from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/sysList/list',
    method: 'post',
    params: params
  })
}

export function create (data) {
  return request({
    url: '/sysList/create',
    method: 'post',
    data: data
  })
}

export function update (data) {
  return request({
    url: '/sysList/update',
    method: 'post',
    data: data
  })
}

export function remove (id) {
  return request({
    url: '/sysList/delete/' + id,
    method: 'post'
  })
}

export default {
  fetchList,
  create,
  update,
  remove
}
