<template>
  <div>
    <div style="display: flex">
      <div class="topButtonLight" @click="BackHomepage">返回</div>
      <div class="topButtonBg">{{ routeTitle }}</div>
    </div>
    <div class="lineTop"></div>
  </div>
</template>

<script>
export default {
  name: "topTitle",
  props: {
    routeTitle: {
      type: String,
      required: true,
    },
  },
  methods: {
    BackHomepage() {
      this.$router.push({
        path: "/studentHomePage",
      });
    },
  },
};
</script>

<style scoped>
.lineTop {
  height: 2px;
  left: 152px;
  right: 152px;
  top: calc(50% - 2px / 2 - 436px);
  background: #006569;
  margin-bottom: 20px;
}
.topButtonLight {
  cursor: pointer;
  padding: 1px 12px;
  width: 100px;
  text-align: center;
  height: 32px;
  left: 152px;
  top: 72px;
  background: #ffffff;
}
.topButtonBg {
  padding: 1px 12px;
  gap: 12px;
  min-width: 90px;
  text-align: center;
  line-height: 32px;
  height: 32px;
  left: 213px;
  top: 72px;
  background: #006569;
}
</style>
