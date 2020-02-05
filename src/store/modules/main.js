
const main = {
  namespaced: true,
  state: {
    asideBarActive: true
  },
  getters: {
  },
  mutations: {
    CHANGE_ASIDEBAR_ACTIVE: state => {
      state.asideBarActive = !state.asideBarActive
    }
  },
  actions: {
    changeAsideBarActive: ({ commit }) => {
      commit('CHANGE_ASIDEBAR_ACTIVE')
    }
  }
}

export default main
