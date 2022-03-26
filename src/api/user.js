import request from '@/utils/request';
export function signup(data) {
    return request({
        url: '/signup',
        method: 'post',
        data
    })
}
export function getLoginInfo() {
    return request({
        url: '/getLoginInfo',
        method: 'get'
    })
}
export function signin(data) {
    return request({
        url: '/signin',
        method: 'post',
        data
    })
}
export function getRoles() {
    return request({
        url: '/getRoles',
        method: 'get',
    })
}
