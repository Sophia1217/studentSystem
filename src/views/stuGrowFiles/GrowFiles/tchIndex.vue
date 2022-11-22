<template>
  <div class="wrap">
    <div class="detail_left">
      <el-tabs v-model="activeName" class="tab_left" tab-position="left">
        <el-tab-pane label="干部经历" name="0"> </el-tab-pane>
        <el-tab-pane label="科研论文" name="1"> </el-tab-pane>
        <el-tab-pane label="科研专利" name="11"> </el-tab-pane>
        <el-tab-pane label="科研著作" name="12"> </el-tab-pane>
        <el-tab-pane label="软件著作" name="13"> </el-tab-pane>
        <el-tab-pane label="研究报告" name="14"> </el-tab-pane>
        <el-tab-pane label="荣誉称号" name="2"> </el-tab-pane>
        <el-tab-pane label="奖学金" name="3"></el-tab-pane>
        <el-tab-pane label="资格认证" name="4"></el-tab-pane>
        <el-tab-pane label="社会实践" name="5"></el-tab-pane>
        <el-tab-pane label="志愿服务" name="6"></el-tab-pane>
        <el-tab-pane label="社团经历" name="7"></el-tab-pane>
        <el-tab-pane label="双创工作" name="8"></el-tab-pane>
        <el-tab-pane label="学习成绩" name="9"></el-tab-pane>
        <el-tab-pane label="培训经历" name="10"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="detail_right" v-if="activeName == '0'">
      <gbjl></gbjl>
    </div>
    <div class="detail_right" v-if="activeName == '1'">
      <kycg></kycg>
    </div>
    <div class="detail_right" v-if="activeName == '2'">
      <rych></rych>
    </div>
    <div class="detail_right" v-if="activeName == '3'">
      <scholarships></scholarships>
    </div>
    <div class="detail_right" v-if="activeName == '4'">
      <zgrz></zgrz>
    </div>

    <div class="detail_right" v-if="activeName == '5'">
      <shsj></shsj>
    </div>
    <div class="detail_right" v-if="activeName == '6'">
      <zyfw></zyfw>
    </div>
    <div class="detail_right" v-if="activeName == '7'">
      <stjl></stjl>
    </div>
    <div class="detail_right" v-if="activeName == '8'">
      <scgz></scgz>
    </div>
    <div class="detail_right" v-if="activeName == '9'">
      <xxcj></xxcj>
    </div>
    <div class="detail_right" v-if="activeName == '10'">
      <xnwpxjlVue></xnwpxjlVue>
    </div>
    <div class="detail_right" v-if="activeName == '11'">
      <kyzl></kyzl>
    </div>
    <div class="detail_right" v-if="activeName == '12'">
      <kyzz></kyzz>
    </div>
    <div class="detail_right" v-if="activeName == '13'">
      <kyrz></kyrz>
    </div>
    <div class="detail_right" v-if="activeName == '14'">
      <yjbg></yjbg>
    </div>
  </div>
</template>
<script>
import xnwpxjlVue from "./tchDetailList/xnwpxjl.vue";
import stjl from "./tchDetailList/stjl";
import zyfw from "./tchDetailList/zyfw";
import shsj from "./tchDetailList/shsj";
import zgrz from "./tchDetailList/zgrz";
import xxcj from "./tchDetailList/xxcj";
import scholarships from "./tchDetailList/scholarships.vue";
import gbjl from "./tchDetailList/gbjl";
import kycg from "./tchDetailList/kycg";
import rych from "./tchDetailList/rych";
import scgz from "./tchDetailList/scgz";
import kyzl from "./tchDetailList/kyzl";
import kyzz from "./tchDetailList/kyzz";
import kyrz from "./tchDetailList/kyrz";
import yjbg from "./tchDetailList/yjbg";
export default {
  components: { 
    xnwpxjlVue,
    stjl,
    zyfw,
    shsj,
    scholarships,
    zgrz,
    xxcj,
    gbjl,
    kycg,
    rych,
    scgz,
    kyzl,
    kyzz,
    kyrz,
    yjbg,
  },
  data() {
    return {
      activeName: "0",
    };
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
