
const state = () => ({
    name: ''
})
const mutations = {
    setUserName(state, name) {
        state.name = name;
    }
}
export default {
    namespaced:true,
    state,
    mutations
}