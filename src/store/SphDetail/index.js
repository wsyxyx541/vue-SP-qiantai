import {
    reqGetGoodsInfo,
    reqAddOrUpdateShopCart
} from '@/api/index'
//封装游客身份模块uuid--->生成一个随机字符串（不能再变了）
import {
    getUUID
} from "@/utils/uuid_token";
export default {
    namespaced: true,
    state: {
        goodInfo: {},
        //游客的临时身份
        uuid_token: getUUID(),
    },
    actions: {
        //获取产品信息的action
        async getGoodInfo({
            commit
        }, skuId) {
            let result = await reqGetGoodsInfo(skuId)
            if (result.code == 200) {
                commit('GOODINFO', result.data)
            }
        },
        async addOrUpdateShopCart({
            commit
        }, {
            skuId,
            skuNum
        }) {
            //加入购物车以后（发请求），前台将参数带给服务器
            //服务器写入数据成功。并没有返回其他的数据，知识返回code=200，代表这次操作成功
            //因为服务器没有返回其余的数据，因此不用再像以前的三连环一样存储数据
            let result = await reqAddOrUpdateShopCart(skuId, skuNum)
            //当前的这个函数如果执行的，那么返回的就是Promise
            //code=200 加入购物车成功
            if (result.code == 200) {
                return 'ok'
            } else {
                //代表加入购物车失败
                return Promise.reject(new Error('failed'))
            }
        }
    },
    mutations: {
        //
        GOODINFO(state, goodInfo) {
            state.goodInfo = goodInfo
        }
    },
    getters: {
        //路径导航简化的数据
        categoryView(state) {
            return state.goodInfo.categoryView || {}
        },
        //简化产品信息的数据
        skuInfo(state) {
            return state.goodInfo.skuInfo || {}
        },
        //产品售卖属性的简化
        spuSaleAttrList(state) {
            return state.goodInfo.spuSaleAttrList || []
        }

    }

}