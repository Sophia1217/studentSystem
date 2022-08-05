<template>
  <div>
    <tea-search></tea-search>
    <tea-table></tea-table>
  </div>
</template>

<script>
import teaSearch from "./form/teaSearch.vue";
import teaTable from "./form/teaTable.vue";
export default {
  name: "instructor", //辅导员管理
  components: {
    teaSearch,
    teaTable,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
