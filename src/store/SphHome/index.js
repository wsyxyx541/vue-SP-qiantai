import {
    reqCategoryList,
    reqGetBannerList,
    reqGetFloorList
} from '@/api'
//home 的小仓库
export default {
    namespaced: true,
    //仓库存储数据的地方
    state: {
        //state里面的默认初始值别瞎写，服务器返回对象，服务器返回数组
        //根据服务器的返回值初始化
        //home三级导航栏的数据
        categoryList: [],
        //轮播图的数据
        bannerList: [],
        //floor轮播图的数据
        floorList: []
    },
    //处理action，可以书写自己的业务逻辑，也可以处理异步
    actions: {
        //通过api里面的接口函数，向服务器发送请求，获取服务器数据
        async categoryList({
            commit
        }) {
            let result = await reqCategoryList()

            if (result.code === 200) {
                commit('CATEGORYLIST', result.data)
            }
        },
        //获取首页轮播图的数据
        async getBannerList({
            commit
        }) {
            let result = await reqGetBannerList();
            if (result.code === 200) {
                commit('BANNERLIST', result.data)
            }
        },
        async getFloorList({
            commit
        }) {
            let result = await reqGetFloorList()
            if (result.code === 200) {
                commit('FLOORLIST', result.data)
            }
        }
    },
    //修改state的唯一手段
    mutations: {
        //
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList
        },
        BANNERLIST(state, bannerList) {
            state.bannerList = bannerList
        },
        FLOORLIST(state, floorList) {
            state.floorList = floorList
        }
    },
    //理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
    getters: {

    }
}