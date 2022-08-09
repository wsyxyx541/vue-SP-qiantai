import {
    reqAddressInfo,
    reqOrderInfo
} from "@/api";
export default {
    namespaced: true,
    state: {
        addressInfo: [],
        orderInfo: {}
    },
    actions: {
        //获取用户地址信息
        async getUserAddress({
            commit
        }) {
            let result = await reqAddressInfo()
            if (result.code == 200) {
                commit('GETUSERADDRESS', result.data)
            }
        },
        //获取商品清单的数据
        async getOrderInfo({
            commit
        }) {
            let result = await reqOrderInfo()
            if (result.code == 200) {
                commit('GETOREDERINFO', result.data)
            }
        }
    },
    mutations: {
        GETUSERADDRESS(state, address) {
            state.addressInfo = address
        },
        GETOREDERINFO(state, orderInfo) {
            state.orderInfo = orderInfo
        }
    },
    getters: {

    }
}