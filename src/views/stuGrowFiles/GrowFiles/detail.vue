<template>
  <div class="wrap">
    <div class="detail_left">
      <el-tabs v-model="activeName" class="tab_left" tab-position="left">
        <el-tab-pane label="学生干部经历" name="0"> </el-tab-pane>
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
        <el-tab-pane label="校内外培训经历" name="10"></el-tab-pane>
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
import xnwpxjlVue from "./detailList/xnwpxjl.vue";
import stjl from "./detailList/stjl";
import zyfw from "./detailList/zyfw";
import shsj from "./detailList/shsj";
import zgrz from "./detailList/zgrz";
import xxcj from "./detailList/xxcj";
import scholarships from "./detailList/scholarships.vue";
import gbjl from "./detailList/gbjl";
import kycg from "./detailList/kycg";
import rych from "./detailList/rych";
import scgz from "./detailList/scgz";
// import kyzl from "./detailList/kyzl";
// import kyzz from "./detailList/kyzz";
// import kyrz from "./detailList/kyrz";
// import yjbg from "./detailList/yjbg";
// import Kyzl from "./detailList/kyzl.vue";
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
    Kyzl,
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
    flex: 0 0 198px;
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
    .tableStyle {
      position: relative;
      padding: 20px;
      .imgWrap {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 100;
        .photo {
          width: 160px;
          height: 206px;
          background: #fff;
          overflow: hidden;
          img {
            width: 160px;
            height: 206px;
          }
        }
      }
      .information {
        padding: 0 20px;
        .rowStyle {
          padding: 0 !important;
          margin: 0;
          border-bottom: 1px solid #cccccc;
        }
        .wrap {
          display: flex;
          align-items: center;
          .title {
            flex: 0 0 160px;
            line-height: 48px;
            background: #e0e0e0;
            text-align: right;
            padding-right: 5px;
            margin: 0 !important;
          }
          .content {
            font-weight: 400;
            font-size: 14px;
            color: #1f1f1f;
            line-height: 22px;
            margin-left: 16px;
          }
        }
      }
    }
  }
}
</style>
