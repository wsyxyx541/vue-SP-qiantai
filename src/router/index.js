//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
//引入仓库
import store from "@/store";

//使用插件
Vue.use(VueRouter);
import Routes from "./routers";
import { removeToken } from "@/utils/token";
//把VueRouter原型对象的push方法，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push|replace方法
//第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call|apply区别
    //相同点，都可以调用函数一次，都可以篡改函数的上下文一次
    //不同点：call与apply传递参数：call传递参数要用逗号隔开，apply传递参数，要使用数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//配置路由
let router = new VueRouter({
  //配置路由
  routes: Routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    //y:0 路由跳转后，换轮滚动到页面顶部
    return {
      y: 0,
    };
  },
});

//全局守卫：前置守卫（在路由跳转之间判断）
router.beforeEach(async (to, from, next) => {
  //to：可以获取到你要跳转到哪个路由去
  //from：可以获取到你要从那个路由而来的信息
  //next：放行函数
  //用户登录了才会有token，未登录一定不会有token
  console.log(store);
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    //用户已经登录了还想去login，休想
    if (to.path == "/login") {
      next(false);
    } else {
      //如果用户名已有
      if (name) {
        next();
      } else {
        //没有用户信息，派发action让仓库存储用户
        try {
          await store.dispatch("user/getUserInfo");
          next();
        } catch (error) {
          //token失效了
          //清除token
          await store.dispatch("user/userLogOut");
          next("/login");
        }
      }
    }
  } else {
    //未登录：不能去交易相关的、不能去支付相关的[pay/paysuccess]、不能去个人中心
    //未登录的当他要去以上页面的时候，要提示他去登录页，并跳转到登录页
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/center") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/paysuccess") != -1
    ) {
      //弹出提示用户未登录的对话框
      alert("用户未登录，是否跳转到登录页面");
      //放行到登陆页面
      next("/login?redirect=" + toPath);
    } else {
      //如果未登录的状态，to.path不是指向的以上的路由，那么放行
      next();
    }
  }
});

export default router;
