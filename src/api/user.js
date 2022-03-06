import request from '@/utils/request';
export function signup(data) {
    return request({
        url: '/signup',
        method: 'post',
        data
    })
}
export function signin(data) {
    return request({
        url: '/signin',
        method: 'post',
        data
    })
}
