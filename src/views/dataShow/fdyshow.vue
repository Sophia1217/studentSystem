<template>
  <div>
    <el-button @click="enter">点击进入</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    enter() {
      this.$router.push({
        path: "/dataShow",
      });
    },
  },
};
</script>
<style  scoped>
</style>