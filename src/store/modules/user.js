import { getRoles } from '../../api/user'
const state = () => ({
    name: '',
    isAdmin: false,
    isLogin: false,
    roles: []
})
const actions = {
    async getRoleList({ commit }) {
        const { result } = await getRoles()
        commit('setUserAuth', result)
    }
}
const mutations = {
    setUserName(state, name) {
        state.name = name;
    },
    setUserAdmin(state, admin) {
        state.isAdmin = admin
    },
    setUserLogin(state, payload) {
        state.isLogin = payload
    },
    setUserAuth(state, roles) {
        state.roles = roles
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}