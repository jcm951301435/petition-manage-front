import store from '@/store'

export function checkMenu (menuValue) {
  if (menuValue) {
    var findFlag = false
    const permissions = store.state.user.permissions
    for (let i in permissions) {
      const valueTemp = permissions[i].value
      if (valueTemp === menuValue) {
        findFlag = true
        break
      }
    }
    return findFlag
  }
  return false
}

export default {
  checkMenu
}
