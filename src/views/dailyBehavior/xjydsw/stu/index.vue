<template>
  <div class="wrap">
    <div class="detail_left">
      <topTitle :routeTitle="routeTitle"></topTitle>
      <el-tabs v-model="activeName" class="tab_left" tab-position="left">
        <el-tab-pane label="保留学籍" name="0"> </el-tab-pane>
        <el-tab-pane label="休学" name="1"> </el-tab-pane>
        <el-tab-pane label="退学" name="2"> </el-tab-pane>
        <el-tab-pane label="复学" name="3"> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="detail_right" v-if="activeName == '0'">
      <bl></bl>
    </div>
    <div class="detail_right" v-if="activeName == '1'">
      <xx></xx>
    </div>
    <div class="detail_right" v-if="activeName == '2'">
      <tx></tx>
    </div>
    <div class="detail_right" v-if="activeName == '3'">
      <fx></fx>
    </div>
  </div>
</template>
<script>
import xx from "../list/xx.vue";
import tx from "../list/tx.vue";
import bl from "../list/bl.vue";
import fx from "../list/fx.vue";
import topTitle from "../../../components/topTitle";
export default {
  components: {
    xx,
    tx,
    bl,
    fx,
    topTitle,
  },
  data() {
    return {
      activeName: "0",
      routeTitle: "",
    };
  },
  mounted() {
    this.routeTitle = this.$route.meta.title;
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: row;

  .detail_left {
    flex: 0 0 120px;
    margin-right: 24px;
    background: #fff;
    // height: calc(100vh - 170px);
    padding: 20px;
    box-sizing: border-box;

    .tab-left {
      padding: 0 40px;
    }
  }
  .detail_right {
    flex: 1;
    background: #fff;
    .right_top {
      .title {
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
    }
    .headline {
      padding-left: 20px;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 20px;
      color: #1f1f1f;
      line-height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .editBtn {
        padding: 4px 5px;
        margin-right: 20px;
        border: 1px solid #005657;
        border-radius: 4px;
        font-weight: 400;
        font-size: 14px;
        color: #005657;
        cursor: pointer;
        .addIcon {
          display: inline-block;
          width: 15px;
          height: 15px;
          background: url("~@/assets/images/addicon.png") no-repeat center;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
