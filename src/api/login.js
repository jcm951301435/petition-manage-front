import request from '@/utils/request'

export function login (username, password) {
  return request({
    url: '/sysUser/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export default {
  login
}
