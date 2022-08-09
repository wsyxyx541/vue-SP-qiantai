<template>
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  data() {
    return {
      currentPage: this.pageNo,
    };
  },
  methods: {
    handleCurrentChange(val) {
      let yema = val;
      this.$emit("getPageNo", yema);
    },
    prevClick() {
      let yema = this.currentPage;
      yema -= 1;
      this.$emit("getPageNo", yema);
    },
    nextClick() {
      let yema = this.currentPage;
      yema += 1;
      this.$emit("getPageNo", yema);
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  text-align: center;
}
</style>
