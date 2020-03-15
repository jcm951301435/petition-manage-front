import request, { importService, exportService } from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/sysFile/list',
    method: 'post',
    params: params
  })
}

export function remove (id) {
  return request({
    url: '/sysFile/delete/' + id,
    method: 'post'
  })
}

export function download (file) {
  return exportService({
    url: '/sysFile/download/' + file.id,
    method: 'post',
    data: file
  })
}
export function uploadMainImage (option) {
  return importService('/sysFile/uploadMainImage', option)
}

export default {
  remove,
  fetchList,
  download,
  uploadMainImage
}
