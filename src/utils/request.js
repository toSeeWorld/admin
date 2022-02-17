import axios from 'axios';
import { Message } from 'element-ui'
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/' : 'http://101.43.124.26:6998',
    timeout: 1500
})
service.interceptors.request.use(config => {
    return config
}, (err) => {
    console.log(err);
    return Promise.reject(err)
})
service.interceptors.response.use(response => {
    const res = response.data;
    if (res.code !== 200) {
        Message({
            message: res.msg,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject('error')
    }
    else {
        return response.data
    }
}, err => {
    Message({
        message: err,
        type: 'error',
        duration: 2000
    })
    return Promise.reject(err)
})
export default service