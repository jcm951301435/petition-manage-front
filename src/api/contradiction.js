import request, { importService, exportService } from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/petitionContradiction/list',
    method: 'post',
    data: params.data,
    params: params.params
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

export function applyNameList (applyName) {
  return request({
    url: '/petitionContradiction/applyNameList/' + applyName,
    method: 'post'
  })
}

export function exportFile (data, type) {
  return exportService({
    url: '/petitionContradiction/export',
    method: 'post',
    data: data,
    params: { type: type }
  })
}

export function importTemplate (name) {
  return exportService({
    url: '/petitionContradiction/importTemplate/' + name,
    method: 'post'
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
  applyNameList,
  exportFile,
  importExcel,
  importTemplate
}
