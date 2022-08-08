<template>
  <div class="assign_tea">
    <assign-search></assign-search>
    <assign-table></assign-table>
  </div>
</template>

<script>
import assignSearch from "../form/assignSearch.vue";
import assignTable from "../form/assignTable.vue"
export default {
  name: "assignTea", //分配辅导员
  components: {
    assignSearch,
    assignTable
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
