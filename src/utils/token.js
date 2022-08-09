//对外暴露一个函数
export const setToken = (token) => {
    let usertoken = localStorage.setItem('TOKEN', token)
    return usertoken
}
//获得token
export const getToken = () => {
    return localStorage.getItem('TOKEN')
}
//清除本地存储的token
export const removeToken = () => {
    return localStorage.removeItem('TOKEN')
}