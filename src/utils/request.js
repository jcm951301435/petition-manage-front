import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    // for debug
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res instanceof Blob) {
      console.log(response)
      const headers = response.headers
      const disposition = headers['content-disposition']
      var fileName
      if (disposition) {
        fileName = disposition.substring(disposition.indexOf('fileName=') + 9, disposition.length)
        fileName = decodeURI(fileName)
      }
      let url = window.URL.createObjectURL(res)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      if (fileName) {
        link.setAttribute('download', fileName)
      }
      document.body.appendChild(link)
      link.click()
      return res
    }
    /**
    * code为非200是抛错 可结合自己业务进行修改
    */
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401 || res.code === 50014) {
        store.dispatch('user/frontLogOut').then(() => {
          location.reload()
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export function importService (url, option) {
  const formData = new FormData()
  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formData.append(key, option.data[key])
    })
  }
  formData.append(option.filename, option.file, option.file.name)
  return service({
    url: url,
    headers: {
      post: {
        'Content-Type': 'multipart/form-data'
      }
    },
    method: 'post',
    data: formData,
    timeout: 0
  })
}

export function exportService (config) {
  config.responseType = 'blob'
  config.timeout = 0
  return service(config)
}

export default service
