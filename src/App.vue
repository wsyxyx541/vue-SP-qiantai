<template>
  <div>
    <SphHeader></SphHeader>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <SphFooter v-show="isShow"></SphFooter>
  </div>
</template>

<script>
import SphHeader from "./components/SphHeader";
import SphFooter from "./components/SphFooter";
export default {
  components: {
    SphHeader,
    SphFooter,
  },
  name: "App",
  computed: {
    isShow() {
      return this.$route.meta.isShow;
    },
  },
  mounted() {
    //派发请求，获取导航栏的数据
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style>
</style>
