import Vue from "vue";

import App from "./App.vue";
//三级联动组件---全局组件
import SphTypeNav from "@/components/SphTypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
//第一个参数是全局组件的名字 第二个参数：哪一个组件
Vue.component(SphTypeNav.name, SphTypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

//引入路由
import router from "./router";

//引入仓库
import store from "./store";

//引入mockServe.js --- mock数据
import "@/mock/mockServe";
//引入Swiper样式
import "swiper/css/swiper.css";
//引入Element uI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//引入vue-lazyload
import VueLazyload from "vue-lazyload";
import loadimage from "@/assets/1.gif";
import errorimage from "@/assets/errorimg.gif";
//使用VueLazyload
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1,
});
//使用Element uI
Vue.use(ElementUI);
Vue.config.productionTip = false; //关闭生产提示
//开启vue开发者工具
Vue.config.devtools = true;
import "swiper";
//统一接口api文件夹里面全部请求函数
import * as API from "@/api";

//引入自定义插件
import MyPlugins from "@/plugins/myplugins";
Vue.use(MyPlugins);

//引入表单验证插件
import "@/plugins/validate";
new Vue({
  render: (h) => h(App),
  router,
  store,
  //全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
}).$mount("#app");
