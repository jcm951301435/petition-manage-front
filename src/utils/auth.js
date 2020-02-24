import Cookies from 'js-cookie'
import { toObj } from './object'

const UserInfoKey = 'PETITION_USER_INFO'

export function getUserInfo () {
  return toObj(Cookies.get(UserInfoKey))
}

export function setUserInfo (token) {
  return Cookies.set(UserInfoKey, token)
}

export function removeUserInfo () {
  return Cookies.remove(UserInfoKey)
}
