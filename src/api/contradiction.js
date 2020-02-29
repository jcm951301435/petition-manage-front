import request from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/petitionContradiction/list',
    method: 'post',
    params: params
  })
}

export function create (data) {
  return request({
    url: '/petitionContradiction/create',
    method: 'post',
    data: data
  })
}

export function update (data) {
  return request({
    url: '/petitionContradiction/update',
    method: 'post',
    data: data
  })
}

export function remove (id) {
  return request({
    url: '/petitionContradiction/delete/' + id,
    method: 'post'
  })
}

export default {
  fetchList,
  create,
  update,
  remove
}
