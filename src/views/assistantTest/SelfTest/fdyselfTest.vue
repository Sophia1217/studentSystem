<template>
  <div class="wrap">
    <div class="detail_left">
      <el-tabs v-model="activeName" class="tab_left" tab-position="left">
        <el-tab-pane label="基本情况" name="0"> </el-tab-pane>
        <el-tab-pane label="履职情况" name="1"> </el-tab-pane>
        <el-tab-pane label="个性发展" name="2"> </el-tab-pane>
        <el-tab-pane label="年度总结" name="3"> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="detail_right" v-if="activeName == '0'">
      <jbqk></jbqk>
    </div>
    <div class="detail_right" v-if="activeName == '1'">
      <lzqk></lzqk>
    </div>
    <div class="detail_right" v-if="activeName == '2'">
      <gxfz></gxfz>
    </div>
    <div class="detail_right" v-if="activeName == '3'">
      <ndzj></ndzj>
    </div>
  </div>
</template>
<script>
import jbqk from "./fdySelf/jbqk.vue";
import lzqk from "./fdySelf/lzqk.vue";
import gxfz from "./fdySelf/gxfz.vue";
import ndzj from "./fdySelf/ndzj.vue";
export default {
  components: {
    jbqk,
    lzqk,
    gxfz,
    ndzj,
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
