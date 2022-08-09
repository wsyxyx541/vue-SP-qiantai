import {
    v4 as uuidv4
} from 'uuid';
export const getUUID = () => {
    //先从本地存储获取uuid（看一下本地存储是否含有）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有我就生成一个游客临时身份
    if (!uuid_token) {
        uuid_token = uuidv4()
        //生成游客身份之后，本地存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    //封装了函数，切记一定要有返回值，没有返回值的话，传过去的就是undefined
    return uuid_token
}