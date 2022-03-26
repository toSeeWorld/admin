import cookie from 'js-cookie'
const prefix = 'ririxue'
export function getToken(){
    return cookie.get(`rauth`)
}
export function setToken(token){
    return cookie.set(`rauth`,token)
}