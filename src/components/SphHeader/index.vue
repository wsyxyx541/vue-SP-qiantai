<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 没有登陆的时候 -->
          <p v-if="!userInfo.name">
            <span>请</span>
            <router-link
              :to="{
                name: 'Login',
              }"
              >登录</router-link
            >
            <router-link
              :to="{
                name: 'Register',
              }"
              class="register"
              >免费注册</router-link
            >
          </p>
          <!-- 登陆了 -->
          <p v-else>
            <a>{{ userInfo.name }}</a>
            <a class="register" @click="loginOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <a @click="goShopCart">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link
          class="logo"
          :to="{
            name: 'SphHome',
          }"
        >
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="value"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="DianSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SphHeader",
  data() {
    return {
      value: "",
    };
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  methods: {
    /* 如果a标签的跳转的话，建议使用声明式导航，
    如果给a标签使用编程式导航的话，鼠标点击的样式可能不太好看，
    如果是button标签或者其他标签的话，建议用编程式导航 */
    //点击搜索按钮跳转到SphSearch界面
    DianSearch() {
      /* 
      传递参数有两种方法，一种params，一种是query
      还有就是query传递参数比较灵活所以动态的数据一般使用query传递，
      静态的数据使用params传递
      特别注意使用params传递参数的时候，不能使用path，必须使用name跳转
      */
      /* push方法实际上是vue-router引入的Promise实现的 */
      // this.$router.push({
      //   name: "SphSearch",
      //   params: {
      //     value: this.value || undefined,
      //   },
      // });
      if (this.$route.query) {
        let location = {
          name: "SphSearch",
          params: { keyword: this.value || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    goShopCart() {
      this.$router.push({
        name: "ShopCart",
      });
    },
    async loginOut() {
      //1.需要发请求通知服务器退出登录【清除一些数据】
      //2.清除项目当中的数据【userInfo、token】
      try {
        this.$store.dispatch("user/userLogOut");
        this.$router.push("/home");
      } catch (error) {
        alert(error.message);
      }
    },
  },
  mounted() {
    //通过全局事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.value = "";
    });
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
