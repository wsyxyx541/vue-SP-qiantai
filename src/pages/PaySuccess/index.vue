<template>
  <div class="paysuccess">
    <div class="success">
      <h3>
        <img src="./images/right.png" width="48" height="48" />
        恭喜您，支付成功啦！
      </h3>
      <div class="paydetail">
        <p class="button">
          <router-link class="btn-look" to="/center">查看订单</router-link>
          <router-link class="btn-goshop" to="/">继续购物</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { from } from "qrcode/lib/core/error-correction-level";

export default {
  name: "PaySuccess",
  //组件内守卫(很少使用:一般，一个组件使用动态参数才会使用这个守卫)
  beforeRouteEnter(to, from, next) {
    //在渲染该组件的对应路由被confirm前调用
    //注意在这里是获取不到vc实例的，this是无法被调用的
    console.log(from.path);
    if (from.path == "/pay") {
      next();
    } else {
      alert("非法操作，电脑将与10秒后自爆！！！");
      next(false);
    }
  },
  beforeRouteUpdate(to, from, next) {
    //在路由改变，但是组件被复用时调用
    //比如，一个组件他可能会带有参数，就像商品的详情页面一样，会带有参数，多跳转几次他仍然是这个组件，只是参数变了
    //这时候这个路由守卫才会起作用，
  },
  beforeRouteLeave(to, from, next) {
    //在离开路由前会调用
    //可以访问到this，因为这里还没有离开这个组件，这时就可以进行一些操作。
    next();
  },
};
</script>

<style lang="less" scoped>
.paysuccess {
  margin: 20px auto;
  padding: 25px;
  border: 1px solid rgb(211, 211, 211);
  width: 1200px;
  width: 1148px;

  .success {
    width: 500px;
    margin: 0 auto;

    h3 {
      margin: 20px 0;
      font-weight: 700;
      font-size: 20px;
      line-height: 30px;

      img {
        max-width: 100%;
        vertical-align: middle;
        border: 0;
        margin-right: 14px;
      }
    }

    .paydetail {
      margin-left: 66px;
      font-size: 15px;

      .button {
        margin: 30px 0;
        line-height: 26px;

        a {
          display: inline-block;
          box-sizing: border-box;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          border-radius: 2px;
          user-select: none;
          font-size: 18px;
          padding: 4px 20px;
          line-height: 22px;
          text-decoration: none;

          &.btn-look {
            margin-right: 13px;
            color: #fff;
            background-color: #e1251b;
            border: 1px solid #e1251b;
          }

          &.btn-goshop {
            color: #666;
            background-color: #eee;
            border: 1px solid #e1e1e1;
          }
        }
      }
    }
  }
}
</style>
