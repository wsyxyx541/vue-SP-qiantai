<template>
  <div>
    <div class="swiper-container" ref="floor1Swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in List" :key="item.id">
          <img :src="item.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["List"],
  watch: {
    List: {
      //立即监听：不管你的数据有没有变化，我上来就立即监听一次
      //为什么watch监听不到list：因为list是父组件传来的数据，给的是一个对象，里面的数据都是有的
      immediate: true,
      handler() {
        //只能监听到数据已经有了，但是v-for动态渲染的数据我们还是没有办法确定的，因此还是要用到nextTick
        this.$nextTick(function () {
          new Swiper(this.$refs.floor1Swiper, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>