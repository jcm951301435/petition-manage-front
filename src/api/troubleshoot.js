import request from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/petitionTroubleshoot/list',
    method: 'post',
    params: params
  })
}

export function create (data) {
  return request({
    url: '/petitionTroubleshoot/create',
    method: 'post',
    data: data
  })
}

export function update (data) {
  return request({
    url: '/petitionTroubleshoot/update',
    method: 'post',
    data: data
  })
}

export function remove (id) {
  return request({
    url: '/petitionTroubleshoot/delete/' + id,
    method: 'post'
  })
}

export default {
  fetchList,
  create,
  update,
  remove
}
