<template>
  <div>
    <div style="margin-top: 15px">
      <topTitle :routeTitle="routeTitle"></topTitle>
    </div>
    <div class="wrap">
      <div class="detail_left">
        <el-tabs v-model="activeName" class="tab_left" tab-position="left">
          <el-tab-pane label="贷款申请" name="0"> </el-tab-pane>
          <el-tab-pane label="毕业确认" name="1"> </el-tab-pane>
          <el-tab-pane label="基层就业" name="2"> </el-tab-pane>
          <el-tab-pane label="大病救助" name="3"> </el-tab-pane>
          <el-tab-pane label="征兵退役代偿申请" name="4"> </el-tab-pane>
          <el-tab-pane label="在岗确认" name="5"> </el-tab-pane>
        </el-tabs>
      </div>
      <div class="detail_right" v-if="activeName == '0'">
        <dksq></dksq>
      </div>
      <div class="detail_right" v-if="activeName == '1'">
        <byqr></byqr>
      </div>
      <div class="detail_right" v-if="activeName == '2'">
        <jcjy></jcjy>
      </div>
      <div class="detail_right" v-if="activeName == '3'">
        <dbjz></dbjz>
      </div>
      <div class="detail_right" v-if="activeName == '4'">
        <zbrw></zbrw>
      </div>
      <div class="detail_right" v-if="activeName == '5'">
        <zgqr></zgqr>
      </div>
    </div>
  </div>
</template>
<script>
import dksq from "../list/dksq.vue";
import byqr from "../list/byqr.vue";
import jcjy from "../list/jcjy/index.vue";
import zgqr from "../list/zgqr.vue";
import dbjz from "../list/dbjz.vue";
import zbrw from "../list/zbrw.vue";
import topTitle from "../../components/topTitle";
export default {
  components: {
    zgqr,
    dksq,
    byqr,
    jcjy,
    dbjz,
    zbrw,
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
    if (this.$route.query.state && this.$route.query.state == "1") {
      this.activeName = "2";
    }
  },
};
</script>
<style lang="scss" scoped>
.six {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url("~@/assets/images/sixsix.png") no-repeat center;
  vertical-align: middle;
}
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
