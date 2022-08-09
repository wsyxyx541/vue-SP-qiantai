<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container">
        <!-- 事件委托|事件委派 -->
        <div @mouseleave="leaveIndex" @mouseenter="enterShow">
          <h2 class="all">全部商品分类</h2>
          <!-- 三级联动 -->
          <transition name="sort1">
            <div class="sort" v-show="show">
              <!-- 利用的事件的委派+编程式导航实现路由的跳转与传递参数 -->
              <div class="all-sort-list2" @click="goSearch">
                <div
                  class="item"
                  v-for="(c, index) in categoryList.slice(0, 15)"
                  :key="c.categoryId"
                  :class="{ cur: currentIndex == index }"
                >
                  <h3 @mouseenter="changeIndex(index)">
                    <a
                      :data-categoryName="c.categoryName"
                      :data-category1Id="c.categoryId"
                    >
                      {{ c.categoryName }}
                    </a>
                  </h3>
                  <!-- 二级、三级分类 -->
                  <div
                    class="item-list clearfix"
                    :style="{
                      display: currentIndex == index ? 'block' : 'none',
                    }"
                  >
                    <div
                      class="subitem"
                      v-for="c1 in c.categoryChild"
                      :key="c1.categoryId"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            :data-categoryName="c1.categoryName"
                            :data-category2Id="c1.categoryId"
                          >
                            {{ c1.categoryName }}
                          </a>
                        </dt>
                        <dd>
                          <em
                            v-for="c2 in c1.categoryChild"
                            :key="c2.categoryId"
                            :data-category3Id="c2.categoryId"
                          >
                            <a :data-categoryName="c2.categoryName">{{
                              c2.categoryName
                            }}</a>
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
//引入动画样式
import "animate.css";
import { mapState } from "vuex";
//引入方式：是吧lodash的全部功能引入
// import _ from "lodash";
//最好的引入方式，直接引入throttle
import throttle from "lodash/throttle";
export default {
  name: "SphTypeNav",
  data() {
    return {
      //存储用户鼠标移动哪一个一级分类
      currentIndex: -1,
      //根据show的值判断是否展示下拉框
      show: true,
    };
  },
  mounted() {
    //通知vuex发请求，获取数据，存储于仓库当中
    //当这个组件被多次调用的时候，请求会变得很多，但是我们只需要调用一次
    //然后就存储在仓库store里面了
    //这是就要看整个组件里面，有哪里只调用一次的
    //现在app组件是管理所有组件的，他只会被调用一次
    //所以在app组件被挂载的时候，就可以去请求消息，而不会多次请求了
    // this.$store.dispatch("home/categoryList");

    //当组件关在完毕，让show的值改变
    //在Home路由上的值依旧是true，其它路由上就会变成false
    if (this.$route.path != "/sphhome") {
      this.show = false;
    }
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性
    /* changeIndex(index) {
      //index:鼠标移动到某个一级分类的元素的索引值
      //正常情况：(用户慢慢的操作)：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
      //非正常情况：(用户操作很快)：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
      //就是由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能出现卡顿现象。
      this.currentIndex = index;
    }, */
    //节流写法
    //throttle函数别用箭头函数，可能出现上下文this指向错误
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 10),
    //一级分类鼠标移出的事件回调
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/sphhome") {
        this.show = false;
      }
    },
    goSearch(event) {
      //最好的解决方案：编程式导航 + 事件委派
      //利用事件委派存在一些问题：点击的一定是a标签 2:如何获取参数【1、2、3级分类的产品名字、id】
      //问题：事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父亲节点。
      //点击a标签的时候，才会进行路由跳转【怎么能确定点击的一定是a标签】
      //解决：把子节点当中的a标签，我加上自定义属性data-categoryName，其余的节点是没有的
      //存在另一个问题：即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签
      let e = event.target;
      //获取到当前触发这个事件的节点【h3、a、dt、dl】，这时候我们需要带有data-categoryName的标签【一定是a标签】
      //节点有一个属性dataset属性，可以获取节点的自定义属性和属性值
      let { categoryname, category1id, category2id, category3id } = e.dataset;
      //如果标签身上拥有categoryname属性，那么他一定是a标签
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "SphSearch" };
        let query = { categoryName: categoryname };

        //一级分类、二级分类、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        //判断：如果路由跳转的时候，带有params参数，捎带脚的带给服务器
        if (this.$route.params) {
          location.params = this.$route.params;
          //整理完参数
          location.query = query;
          //路由的跳转
          this.$router.push(location);
        }
      }
    },
    //当鼠标移入的时候，让商品列表显示
    enterShow() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过渡动画的样式
    .sort1-enter {
      height: 0px;
    }
    .sort1-enter-to {
      height: 461px;
    }
    .sort1-enter-active {
      transition: all 0.5s ease;
    }
  }
}
</style>