//路由配置信息

/*
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
Vue Router 支持开箱即用的动态导入，这意味着你可以用动态导入代替静态导入：

// 将
// import UserDetails from './views/UserDetails'
// 替换成
const UserDetails = () => import('./views/UserDetails')

const router = createRouter({
  // ...
  routes: [{ path: '/users/:id', component: UserDetails }],
})

component (和 components) 配置接收一个返回 Promise 组件的函数，Vue Router 只会在第一次进入页面时才会获取这个函数，然后使用缓存数据。这意味着你也可以使用更复杂的函数，只要它们返回一个 Promise ：

const UserDetails = () =>
  Promise.resolve({
     组件定义
  })
  一般来说，对所有的路由都使用动态导入是个好主意。

*/

//路由配置信息
export default [
  {
    path: "/center",
    component: () => import("@/pages/Center"),
    name: "Center",
    meta: {
      isShow: false,
    },
    //二级路由组件
    children: [
      {
        path: "myorder",
        component: () => import("@/pages/Center/myOrder"),
      },
      {
        path: "grouporder",
        component: () => import("@/pages/Center/groupOrder"),
      },
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    name: "PaySuccess",
    meta: {
      isShow: false,
    },
  },
  {
    path: "/pay",
    component: () => import("@/pages/Pay"),
    name: "Pay",
    meta: {
      isShow: false,
    },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        alert("非法操作，电脑将于10秒后爆炸！！！");
        next(false);
      }
    },
  },
  {
    path: "/trade",
    component: () => import("@/pages/Trade"),
    name: "Trade",
    meta: {
      isShow: false,
    },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      let fromPath = from.path;
      if (fromPath == "/shopcart") {
        next();
      } else {
        alert("非法操作，电脑将于10秒后爆炸！！！");
        //如果手动修改了URL，或者是浏览器回退的话，url会重置到from的路由
        next(false);
      }
    },
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    name: "Login",
    meta: {
      isShow: false,
    },
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    name: "Register",
    meta: {
      isShow: false,
    },
  },
  {
    path: "/shopcart",
    component: () => import("@/pages/ShopCart"),
    name: "ShopCart",
    meta: {
      isShow: true,
    },
  },
  {
    path: "/sphhome",
    component: () => import("@/pages/SphHome"),
    name: "SphHome",
    meta: {
      isShow: true,
    },
  },
  {
    //如何指定一个params参数可传可不传，在path的后面的value表示传参的地方加上一个问号
    //如果没有写问号，那么点击调转的时候，参数前面的路径就会消失
    //问号在正则表达式里面表示的是0或者1的意思，就是可有可无。
    path: "/sphsearch/:keyword?",
    component: () => import("@/pages/SphSearch"),
    name: "SphSearch",
    meta: {
      isShow: true,
    },
    props({ params: { keyword } }) {
      return {
        keyword,
      };
    },
  },
  {
    path: "/sphdetail/:skuid?",
    component: () => import("@/pages/SphDetail"),
    name: "SphDetail",
    meta: {
      isShow: true,
    },
    props({ params: { skuid } }) {
      return skuid;
    },
  },
  {
    path: "/addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    name: "AddCartSuccess",
    meta: {
      isShow: true,
    },
  },
  //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
  {
    path: "*",
    redirect: "/sphhome",
  },
];
