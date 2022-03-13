
const state = () => ({
    name: '',
    isAdmin: false,
    isLogin:false
})
const mutations = {
    setUserName(state, name) {
        state.name = name;
    },
    setUserAdmin(state,admin){
        state.isAdmin = admin
    },
    setUserLogin(state,payload){
        state.isLogin = payload
    }
}
export default {
    namespaced: true,
    state,
    mutations
}