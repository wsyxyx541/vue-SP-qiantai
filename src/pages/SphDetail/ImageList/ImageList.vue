<template>
  <div class="swiper-container" ref="reference">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in skuImageList"
        :key="item.id"
      >
        <!-- 这里有一个bug，当点击切换轮播图的按钮的时候,刚好到第二组循环的时候，往左边点不行了，
        只能右边点才能切换图片，所以把loop这个选项给取消掉，避免这个bug-->
        <img
          :src="item.imgUrl"
          :class="{ active: index == current }"
          @click="changeCurrent(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      current: 0,
    };
  },
  watch: {
    //监听数据：可以保证数据一定ok，但是不能保证v-for遍历结构是否完事
    skuImageList(newValue, oldValue) {
      this.$nextTick(function () {
        new Swiper(this.$refs.reference, {
          // loop: true, // 循环模式选项
          //设置slider容器能够同时显示的slides数量(carousel模式)。
          slidesPerView: 3,
          //在carousel mode下定义slides的数量多少为一组。
          //slidesPerGroup : 3,
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
  },
  methods: {
    changeCurrent(index) {
      //修改响应式数据
      this.current = index;
      //通知兄弟是第几张照片被选中了
      this.$bus.$emit("getIndex", this.current);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;
  .swiper-wrapper {
    margin-left: 30px;
    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>