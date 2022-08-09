//当前这个模块：API进行统一管理
import requests from "./ajax";
import mockRequests from "./mockAjax";
//三级联动接口
///api/product/getBaseCategoryList get 无参数
export const reqCategoryList = () =>
  requests({
    url: "/product/getBaseCategoryList",
    method: "get",
  });
//获取首页banner（Home首页轮播图的接口）
export const reqGetBannerList = () => mockRequests.get("/banner");
//获取floor的数据
export const reqGetFloorList = () => mockRequests.get("/floor");

//获取搜索模块的数据 地址：/api/list  请求的方式：post 参数：需要带参数
//当前这个函数需要接收外部传递参数
//当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) =>
  requests({
    url: "/list",
    method: "post",
    data: params,
  });

//获取产品信息的详细接口  URL：/api/item/{skuId} 请求方式 get
export const reqGetGoodsInfo = (skuId) =>
  requests({
    url: `/item/${skuId}`,
    method: "get",
  });

//将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });

//获取购物车列表的数据接口
//url:"/api/cart/cartList"  method:get
export const reqCartList = () =>
  requests({
    url: "/cart/cartList",
    method: "get",
  });

//删除购物车里面的数据
//url："/api/cart/deleteCart/{skuId}" method: delete
export const reqDeleteCart = (skuId) =>
  requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });

//切换商品的选中状态
//url:"/api/cart/checkCart/{skuId}/{isChecked}" method:'get'
export const reqCheckCart = (skuId, isChecked) =>
  requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });

//获取验证码
// URL:/api/user/passport/sendCode/{phone} method：get
export const reqGetCode = (phone) =>
  requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });

//注册
// url:/api/user/passport/register   method:post   phone,code,password
export const reqUserRegister = (data) =>
  requests({
    url: "/user/passport/register",
    method: "post",
    data: data,
  });

//登陆
// url：/api/user/passport/login  method:post   phone,password
export const reqUserLogin = (data) =>
  requests({
    url: "/user/passport/login",
    data,
    method: "post",
  });

//获取用户的信息【需要带着用户的token，向服务器要用户信息】
//url:/api/user/passport/auth/getUserInfo  method：get
export const reqUserInfo = () =>
  requests({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  });

//退出登录
// url:/api/user/passport/logout  method:get
export const reqLogOut = () =>
  requests({
    url: "/user/passport/logout",
    method: "get",
  });

//获取用户地址信息
// url：/api/user/userAddress/auth/findUserAddressList   method:get
export const reqAddressInfo = () =>
  requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });

//获取订单页的商品清单
// url:/api/order/auth/trade method:get
export const reqOrderInfo = () =>
  requests({
    url: "/order/auth/trade",
    method: "get",
  });

//提交订单
//url：/api/order/auth/submitOrder?tradeNo={tradeNo} method：post
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data,
  });

//获取订单支付信息
// url:/api/payment/weixin/createNative/{orderId} method:get
export const reqPayInfo = (orderId) =>
  requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });

//查询支付订单状态
//url:/api/payment/weixin/queryPayStatus/{orderId} method:get
export const reqPayStatus = (orderId) =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });

//获取个人中心的数据
// /api/order/auth/{page}/{limit} 请求方式GET
export const reqMyOrderList = (page, limit) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  });
