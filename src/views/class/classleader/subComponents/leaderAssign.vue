<template>
  <div>
    <assign-search></assign-search>
    <assign-table></assign-table>
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
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
