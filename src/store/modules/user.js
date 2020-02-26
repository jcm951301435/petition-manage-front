import { getUserInfo, setUserInfo } from '@/utils/auth'
import userApi from '@/api/user'
import { isNotEmpty } from '@/utils/object'

const user = {
  namespaced: true,
  state: {
    userInfo: getUserInfo(),
    roles: [],
    permissions: []
  },
  getters: {
    hasUserInfo: state => {
      return state.userInfo && isNotEmpty(state.userInfo)
    }
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      setUserInfo(userInfo)
    },
    REMOVE_USERINFO: (state) => {
      state.userInfo = {}
      setUserInfo({})
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },
  actions: {
    login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        userApi.login(username, password).then(response => {
          const { data } = response
          const userInfo = { username: data }
          commit('SET_USERINFO', userInfo)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    logout ({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        userApi.logout().then(() => {
          commit('REMOVE_USERINFO')
          commit('SET_PERMISSIONS', [])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    frontLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('REMOVE_USERINFO')
        commit('SET_PERMISSIONS', [])
        resolve()
      })
    },

    getUserPermissions ({ commit }) {
      userApi.permissionList().then(response => {
        commit('SET_PERMISSIONS', response.data)
      })
    }

  }
}

export default user
