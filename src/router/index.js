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
    },
    {
        path:'/todo',
        component:()=>import("../views/todo/index.vue")
    },
    {
        path:'/comment',
        component:()=>import("../views/comment/index.vue")
    },
    {
        path:'/visitor',
        component:()=>import("../views/visitor/index.vue")
    },
    {
        path:'/blog',
        component:()=>import("../views/blog/index.vue")
    },
    {
        path:'/login',
        component:()=>import("../views/login/index.vue")
    },
    {
        path:'/register',
        component:()=>import("../views/register/index.vue")
    },
    {
        path:"*",
        redirect:"/home"
    }
]
export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
  })
  
