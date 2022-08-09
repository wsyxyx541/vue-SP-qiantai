import {
    reqGetSearchInfo
} from "@/api";
//search 的小仓库
export default {
    namespaced: true,
    //仓库存储数据的地方
    state: {
        searchList: {}
    },
    //处理action，可以书写自己的业务逻辑，也可以处理异步
    actions: {
        async getSearchList({
            commit
        }, params = {}) {
            let result = await reqGetSearchInfo(params)
            if (result.code === 200) {
                commit('GETSEARCHLIST', result.data)
            }
        }
    },
    //修改state的唯一手段
    mutations: {
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList
        }
    },
    //理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
    //计算属性，在项目当中，为了简化仓库当中的数据而生
    //可以把我们将来在组件当中使用的数据简化一下【将来字啊组件中获取数据就很方便了】
    getters: {

        goodsList(state) {
            //如果网络不好，返回的数据没有获取到，那么state.searchList的数据就是undefined
            if (state.searchList.goodsList) {
                return state.searchList.goodsList
            }
            return []
        },
        trademarkList(state) {
            if (state.searchList.trademarkList) {
                return state.searchList.trademarkList
            }
            return []
        },
        attrsList(state) {
            if (state.searchList.attrsList) {
                return state.searchList.attrsList
            }
            return []
        }
    }
}