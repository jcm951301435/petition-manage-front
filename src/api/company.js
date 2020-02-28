import request from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/petitionCompany/list',
    method: 'post',
    params: params
  })
}

export function create (data) {
  return request({
    url: '/petitionCompany/create',
    method: 'post',
    data: data
  })
}

export function update (data) {
  return request({
    url: '/petitionCompany/update',
    method: 'post',
    data: data
  })
}

export function remove (id) {
  return request({
    url: '/petitionCompany/delete/' + id,
    method: 'post'
  })
}

export default {
  fetchList,
  create,
  update,
  remove
}
