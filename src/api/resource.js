import request from '@/utils/request';
export function getResouceList(params){
    return request({
        url:'/resource/getList',
        method:'get',
        params
    })
}
export function addResource(data){
    return request({
        url:'/resource/addResource',
        method:'post',
        data
    })
}
export function upload(data){
    return request({
        url:'/upload',
        method:'post',
        data
    })
}
export function updateDownload(data){
    return request({
        url:'/resource/updateDownload',
        method:'post',
        data
    })
}