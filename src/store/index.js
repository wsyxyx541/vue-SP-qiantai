import Vue from 'vue'
import Vuex from 'vuex'
//需要使用插件一次
Vue.use(Vuex)

//引入小仓库
import SphHome from './SphHome'
import SphSearch from './SphSearch'
import SphDetail from './SphDetail'
import SphShopCart from './SphShopCart'
import SphUser from './SphUser'
import SphTrade from './SphTrade'
//对外暴露一个Store类的一个实例
export default new Vuex.Store({
    modules: {
        home: SphHome,
        search: SphSearch,
        detail: SphDetail,
        cart: SphShopCart,
        user: SphUser,
        trade: SphTrade
    }
})