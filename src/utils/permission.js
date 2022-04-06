import router from '../router/index'
import { getToken } from './auth'
import store from '../store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
const whiteList = ['/home', '/todo', '/login', '/register', '/404']

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (whiteList.includes(to.path)) {
            next()
        }
        else {
            if (store.state.user.roles.length === 0) {
                await store.dispatch("user/getRoleList")
                if (hashPermission(to.meta.roles, store.state.user.roles)) {
                    next()
                }
                else {
                    next('/404')
                }
            }
            else {
                if (hashPermission(to.meta.roles, store.state.user.roles)) {
                    next()
                }
                else {
                    next('/404')
                }
            }
        }
    }
    else {
        if (whiteList.includes(to.path)) {
            next()
        }
        else {
            next('/login')
        }
    }
})
function hashPermission(roles, curRoles) {
    if (roles.length === 0) return true
    const names = curRoles.map((it) => it.name)
    return roles.some((it) => names.includes(it))
}
router.afterEach(() => {
    NProgress.done()
})