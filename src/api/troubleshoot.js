import request, { importService, exportService } from '@/utils/request'

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

export function exportExcel (data, dataType) {
  return exportService({
    url: '/petitionTroubleshoot/export',
    method: 'post',
    data: data,
    params: {
      dataType: dataType
    }
  })
}

export function importExcel (option) {
  return importService('/petitionTroubleshoot/import', option)
}

export default {
  fetchList,
  create,
  update,
  remove,
  exportExcel,
  importExcel
}
