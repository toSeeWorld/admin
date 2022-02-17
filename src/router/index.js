import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const constantRouterMap = [
    {
        path:"/",
        redirect:"/home"
    },
    {
        path:'/home',
        component:()=>import("../views/home/index.vue"),
    },
    {
        path:'/preview',
        component:()=>import("../views/home/components/FilePreview.vue")
    }
]
export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
  })
  
