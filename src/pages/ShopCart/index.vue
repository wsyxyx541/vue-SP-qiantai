<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked == 1"
              @change="updateChecked(item, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price"> {{ item.skuPrice }} </span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('mins', -1, item)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="item.skuNum"
              @change="handler('change', $event.target.value * 1, item)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('plus', 1, item)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">
              {{ item.skuNum * item.skuPrice }}
            </span>
          </li>
          <li class="cart-list-con7">
            <a
              href="#none"
              class="sindelet"
              @click="deleteCartListById(item.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length >= 1"
          @change="changeAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deletAllCheckCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney"> {{ totalPrice }} </i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//最好的引入方式，直接引入throttle
import debounce from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getDate();
  },
  methods: {
    getDate() {
      //发请求的时候，服务器不知道你是谁。
      this.$store.dispatch("cart/getCartList");
    },
    //修改某个产品的个数
    handler: debounce(async function (type, disNum, item) {
      //type：是为了区分这三个元素
      //disNum：形参 + 变化量（1） - 变化（-1） input 最终的个数（并不是变化量）
      //cart：哪一个产品【身份】
      //向服务器发送请求，修改数量
      switch (type) {
        case "plus":
          //带给服务器变化的量
          disNum = 1;
          this.$store.dispatch;
          break;
        case "mins":
          //如果传给服务器的个数大于1，才可以传递服务器-1
          disNum = item.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          //用户输入进来的最终量是非法的，非法的（带有汉字|出现负数），带给服务器数字
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - item.skuNum;
          }
          break;
      }
      //派发aciton
      try {
        await this.$store.dispatch("detail/addOrUpdateShopCart", {
          skuId: item.skuId,
          skuNum: disNum,
        });
        //派发完成之后重新更新页面的数据
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),
    //删除某个商品
    async deleteCartListById(skuId) {
      try {
        await this.$store.dispatch("cart/deleteCartList", skuId);
        //如果删除成功再次发送请求
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改选中的某个商品的状态
    async updateChecked(item, e) {
      try {
        let checked = e.target.checked ? "1" : "0";
        await this.$store.dispatch("cart/updateChecked", {
          skuId: item.skuId,
          isChecked: checked,
        });
        //更改之后重新获取
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    },
    //改变全选按钮的值时，会跟着发生改变
    async changeAllChecked(event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        console.log(isChecked);
        //派发action
        await this.$store.dispatch("cart/changeAllChecked", isChecked);
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除全部选中的商品
    //这个回调函数没办法收集到一些有用的数据
    async deletAllCheckCart() {
      try {
        await this.$store.dispatch("cart/deleteAllCartList");
        //再发请求更新删除后的数据
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    },
    //跳转到结算页面
    async goTrade() {
      this.$router.push("/trade");
    },
  },
  computed: {
    ...mapGetters("cart", ["cartList"]),
    //计算购物车的数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //计算产品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((ele) => {
        if (ele.isChecked == 1) {
          sum += ele.skuNum * ele.skuPrice;
        }
      });
      return sum;
    },
    //判断底部复选框是否全部勾选
    isAllChecked() {
      return this.cartInfoList.every((ele) => ele.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>