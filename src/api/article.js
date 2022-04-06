import request from '@/utils/request';
export function getArticleList(params) {
    return request({
        url: '/getArticleList',
        method: 'get',
        params
    })
}
export function addArticle(data) {
    return request({
        url: '/addArticle',
        method: 'post',
        data
    })
}
export function getArticleDetail(params) {
    return request({
        url: '/getArticleDetail',
        method: 'get',
        params
    })
}