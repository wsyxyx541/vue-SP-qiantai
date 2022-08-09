<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，所以这里就不用引入了 -->
    <SphTypeNav></SphTypeNav>
    <SphListContainer></SphListContainer>
    <SphRecommend></SphRecommend>
    <SphRank></SphRank>
    <SphLike></SphLike>
    <SphFloor v-for="item in floorList" :key="item.id" :list="item" />
    <SphBrand></SphBrand>
  </div>
</template>

<script>
import SphListContainer from "@/pages/SphHome/SphListContainer";
import SphRecommend from "@/pages/SphHome/SphRecommend";
import SphRank from "@/pages/SphHome/SphRank";
import SphLike from "@/pages/SphHome/SphLike";
import SphFloor from "@/pages/SphHome/SphFloor";
import SphBrand from "@/pages/SphHome/SphBrand";
import { mapState } from "vuex";
export default {
  components: {
    SphListContainer,
    SphRecommend,
    SphRank,
    SphLike,
    SphFloor,
    SphBrand,
  },
  name: "SphHome",
  mounted() {
    //派发actions：通过Vuex发起ajax请求，将数据存在仓库当中
    this.$store.dispatch("home/getFloorList");
    //获取用户信息
    this.$store.dispatch("user/getUserInfo");
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
};
</script>

<style>
</style>