<template>
  <div class="wrap">
    <div class="detail_left">
      <el-tabs v-model="activeName" class="tab_left" tab-position="left">
        <!-- <el-tab-pane label="荣誉称号" name="0"> </el-tab-pane>    暂时屏蔽 -->
        <el-tab-pane label="奖学金" name="1"></el-tab-pane>
        <el-tab-pane label="资格认证" name="2"></el-tab-pane>
        <el-tab-pane label="社会实践" name="3"></el-tab-pane>
        <el-tab-pane label="志愿服务" name="4"></el-tab-pane>
        <el-tab-pane label="社团经历" name="5"></el-tab-pane>
        <!-- <el-tab-pane label="双创工作" name="6"></el-tab-pane> -->
        <el-tab-pane label="学习成绩" name="7"></el-tab-pane>
        <el-tab-pane label="校内外培训经历" name="8"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="detail_right" v-if="activeName == '0'"></div>
    <div class="detail_right" v-if="activeName == '1'">
      <scholarships></scholarships>
    </div>
    <div class="detail_right" v-if="activeName == '2'">
      <zgrz></zgrz>
    </div>

    <div class="detail_right" v-if="activeName == '3'">
      <shsj></shsj>
    </div>
    <div class="detail_right" v-if="activeName == '4'">
      <zyfw></zyfw>
    </div>
    <div class="detail_right" v-if="activeName == '5'">
      <stjl></stjl>
    </div>
    <div class="detail_right" v-if="activeName == '6'"></div>
    <div class="detail_right" v-if="activeName == '7'">
      <xxcj></xxcj>
    </div>
    <div class="detail_right" v-if="activeName == '8'">
      <xnwpxjlVue></xnwpxjlVue>
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
export default {
  components: { xnwpxjlVue, stjl, zyfw, shsj, scholarships, zgrz, xxcj },
  data() {
    return {
      activeName: "1",
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
  }
}
</style>
