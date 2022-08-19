<template>
  <div>
    <assign-search></assign-search>
    <assign-table :table_title="table_title" :table_content="queryBgbList"></assign-table>
  </div>
</template>

<script>
import assignSearch from "../form/assignSearch";
import assignTable from "../form/assignTable";
import {
  getQueryBgbList, //班干部列表查询
} from "@/api/class/classLeader";
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
      queryBgbList:[],
      // 当前班级代码
      currentBjdm:""
    };
  },
  mounted() {
    let self = this;
    self.currentBjdm = this.$route.query.bjdm
    self.getQuery();
    // 想要动态的，将"1004001000"换为self.currentBjdm
    self.getList({bjdm:"1004001000"});
  },
  methods: {
    // 班干部列表
    getList(x) {
      console.log("getList2!");
      getQueryBgbList(x).then((res) => {
        console.log(res);
        let data = res.rows;
        this.queryBgbList = data;
        console.log("test:", this.queryBgbList);
      });
    },
    getQuery() {
      this.table_title = this.$route.query.bjmc;
    },
  },
};
</script>

<style scoped></style>
