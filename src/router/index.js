import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const constantRouterMap = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: '/home',
        component: () => import("../views/home/index.vue"),
    },
    {
        path: '/preview',
        component: () => import("../views/home/components/FilePreview.vue")
    },
    {
        path: '/todo',
        component: () => import("../views/todo/index.vue")
    },
    {
        path: '/comment',
        component: () => import("../views/comment/index.vue"),
        meta: {
            roles: ['common_user', 'admin']
        }
    },
    {
        path: '/visitor',
        component: () => import("../views/visitor/index.vue"),
        meta: {
            roles: ['admin', 'common_user']
        }
    },
    {
        path: '/blog',
        component: () => import("../views/blog/index.vue"),
        meta: {
            roles: []
        },
    },
    {
        path: '/edit-blog',
        component: () => import("../views//blog/edit/index.vue"),
        meta: {
            roles: ['admin']
        },
    },
    {
        path: '/detail-blog/:id',
        component: () => import("../views//blog/detail.vue"),
        meta: {
            roles: []
        },
    },
    {
        path: '/login',
        component: () => import("../views/login/index.vue")
    },
    {
        path: '/register',
        component: () => import("../views/register/index.vue")
    },
    {
        path: '/404',
        component: () => import("../components/404.vue")
    },
    {
        path: "*",
        redirect: "/login"
    }
]
export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

