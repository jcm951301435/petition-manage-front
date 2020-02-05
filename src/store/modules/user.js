import { getToken, removeToken } from '@/utils/auth'

const user = {
  namespaced: true,
  state: {
    token: getToken()
  },
  getters: {
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    // user login
    // login ({ commit }, userInfo) {
    //   const { username, password } = userInfo
    //   return new Promise((resolve, reject) => {
    //     login({ username: username.trim(), password: password }).then(response => {
    //       const { data } = response
    //       commit('SET_TOKEN', data.token)
    //       setToken(data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // logout ({ commit, state, dispatch }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       removeToken()
    //       resetRouter()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    resetToken ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }

  }
}

export default user
