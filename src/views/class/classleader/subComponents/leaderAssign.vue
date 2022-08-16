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
  getQueryBgbList,
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
    console.log(111);
    let self = this;
    self.getQuery();
    self.getList("1004001000");
  },
  methods: {
    // 班干部列表
    getList(x) {
      console.log(1);
      getQueryBgbList(x).then((res) => {
        console.log(res);
        let data = res.Data;
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
