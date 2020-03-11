import request, { importService } from '@/utils/request'

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

export function exportExcel (data, type) {
  return request({
    url: '/petitionContradiction/export',
    method: 'post',
    data: data,
    params: { type: type },
    responseType: 'blob'
  })
}

export function importExcel (option) {
  return importService('/petitionContradiction/import', option)
}

export default {
  fetchList,
  create,
  update,
  remove,
  exportExcel,
  importExcel
}
