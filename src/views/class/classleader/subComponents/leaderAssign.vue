<template>
  <div>
    <!-- <assign-search></assign-search> -->
    <assign-table
      :table_title="table_title"
      :bgb_content="queryBgbList"
      :bgb_total="bgb_total"
    ></assign-table>
  </div>
</template>

<script>
import assignSearch from "../form/assignSearch";
import assignTable from "../form/assignTable";
export default {
  name: "leaderAssign", // 班干部任命
  components: {
    assignSearch,
    assignTable,
  },
  data() {
    return {
      // 班干部列表需要显示的标题
      table_title: "",
      queryBgbList: [], // 班干部列表
      bgb_total: "", // 班干部数据条数
      allstuList: [], // 全班同学列表
      // 当前班级代码
      currentBjdm: "",
    };
  },
  mounted() {
    let self = this;
    self.currentBjdm = this.$route.query.bjdm;
    self.getQuery();
    // 想要动态的，将"1004001000"换为self.currentBjdm
    // self.getList({ bjdm: "1004001000" }); // 获取任职记录列表-班干部
  },
  activated() {},
  methods: {
    // 获取任职记录列表-班干部
    // getList(x) {
    //   getQueryBgbList(x).then((res) => {
    //     let data = res.rows;
    //     this.queryBgbList = data;
    //     this.bgb_total = res.total;
    //     console.log("bgb_total:", this.bgb_total);
    //   });
    // },
    getQuery() {
      this.table_title = this.$route.query.bjmc;
    },
  },
};
</script>

<style scoped></style>
