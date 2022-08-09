import {
    reqCartList,
    reqDeleteCart,
    reqCheckCart
} from "@/api";

export default {
    namespaced: true,
    state: {
        cartList: []
    },
    actions: {
        //获取购物车数据列表
        async getCartList({
            commit
        }) {
            let result = await reqCartList()
            console.log(result);
            if (result.code == 200) {
                commit('CARTLIST', result.data)
            }
        },
        //删除购物车某一个产品
        async deleteCartList({
            commit
        }, skuId) {
            let result = await reqDeleteCart(skuId)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('failed'))
            }
        },
        //修改购物车某一个产品的选中状态
        async updateChecked({
            commit
        }, {
            skuId,
            isChecked
        }) {
            let result = await reqCheckCart(skuId, isChecked)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('failed'))
            }
        },
        //删除全部勾选的产品
        deleteAllCartList({
            dispatch,
            getters,
        }) {
            //对context解构
            //context:小仓库，commit【提交mutation修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
            //获取购物车中全部的产品(是一个数组)
            let PromiseAll = []
            getters.cartList.cartInfoList.forEach(ele => {
                let promise = ele.isChecked == 1 ? dispatch('deleteCartList', ele.skuId) : ''
                //将每一次返回的promise添加到数组中
                PromiseAll.push(promise)

            });
            //只要删除掉的都返回promise对象，那么返回就为成功
            //只要其中任意一个失败，那么就返回失败
            return Promise.all(PromiseAll)
        },
        //修改全部产品的状态
        changeAllChecked({
            dispatch,
            state
        }, isChecked) {
            let PromiseAll = []
            state.cartList[0].cartInfoList.forEach(ele => {
                let promise = dispatch('updateChecked', {
                    skuId: ele.skuId,
                    isChecked: isChecked
                })
                PromiseAll.push(promise)
            })
            //最终返回的结果 return
            return Promise.all(PromiseAll)
        }
    },
    mutations: {
        CARTLIST(state, cartList) {
            state.cartList = cartList
        }
    },
    getters: {
        cartList(state) {
            return state.cartList[0] || {}
        },
    }
}