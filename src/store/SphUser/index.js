import {
    reqGetCode,
    reqUserRegister,
    reqUserLogin,
    reqUserInfo,
    reqLogOut
} from "@/api";
import {
    setToken,
    getToken,
    removeToken
} from "@/utils/token";
export default {
    namespaced: true,
    state: {
        token: getToken(),
        userInfo: {},

    },
    actions: {
        //获取验证码
        async getCode({
            commit
        }, phone) {
            let result = await reqGetCode(phone)
            if (result.code == 200) {
                console.log('验证码是' + result.data);
                return 'ok'
            } else {
                return Promise.reject(new Error('failed'))
            }
        },
        //用户注册
        async userRegister({
            commit
        }, user) {
            let result = await reqUserRegister(user)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('failed'))
            }
        },
        //用户登录[token]
        async userLogin({
            commit
        }, data) {
            let result = await reqUserLogin(data)
            //服务器下发token，用户的唯一标识符(uuid)
            //将来经常通过带token找服务器要用户信息
            if (result.code == 200) {
                //用户已经登录成功且获取到token
                commit('USERLOGIN', result.data.token)
                //持久化存储token
                setToken(result.data.token)
                return 'ok'
            } else {
                return Promise.reject(new Error('failed'))
            }
        },
        //获取用户信息
        async getUserInfo({
            commit
        }) {
            let result = await reqUserInfo()
            if (result.code == 200) {
                commit('GETUSERINFO', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('failed'))
            }
        },
        //退出登录
        async userLogOut({
            commit
        }) {
            //只是向服务器发送一次请求，通知服务器清除token
            let result = await reqLogOut()
            if (result.code == 200) {
                commit('CLEARUSERINFO')
                return 'ok'
            } else {
                return Promise.reject(new Error('failed'))
            }
        }
    },
    mutations: {
        USERLOGIN(state, token) {
            state.token = token
        },
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        //清除的本地数据
        CLEARUSERINFO(state) {
            //把仓库中相关的用户信息清空
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    },
    getters: {

    }
}