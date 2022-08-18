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
      queryBgbList:[]
    };
  },
  mounted() {
    console.log("班干部列表查询");
    let self = this;
    self.getQuery();
    self.getList({bjdm:"1004001000"});
  },
  methods: {
    // 班干部列表
    getList(x) {
      getQueryBgbList(x).then((res) => {
        console.log(res);
        let data = res.rows;
        this.queryBgbList = data;
        console.log("test:", this.queryBgbList);
      });
    },
    getQuery() {
      this.table_title = this.$route.query.bjdm;
    },
  },
};
</script>

<style scoped></style>
