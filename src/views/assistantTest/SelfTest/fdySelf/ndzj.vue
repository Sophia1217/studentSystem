<template>
  <div class="right_top">
    <p class="toptitle">华中师范大学辅导员工作考核个人自评表</p>
    <div class="timeWrap">
      <div class="yearOption"><el-select></el-select><span>年度</span></div>
      <span class="updataTime">更新时间：{{}}</span>
    </div>
    <div class="headline">04年度个人总结</div>
    <div class="tableStyle">
      <el-input type="textarea" :rows="10" maxlength="2000" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.right_top {
  .toptitle {
    text-align: center;
    font-weight: 500;
    font-size: 24px;
    color: #005657;
    line-height: 24px;
  }
  .timeWrap {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: #383838;
    line-height: 28px;
    .updataTime {
      margin-left: 20px;
    }
  }
  .headline {
    padding-left: 20px;
    box-sizing: border-box;
    font-weight: 600;
    font-size: 20px;
    color: #005657;
    line-height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tableStyle {
    position: relative;
    padding: 20px;
  }
}
</style>