<template>
  <div class="right_top">
    <p class="toptitle">华中师范大学辅导员工作考核个人自评表</p>
    <div class="timeWrap">
      <div class="yearOption"><el-select></el-select><span>年度</span></div>
      <span class="updataTime">更新时间：{{}}</span>
    </div>
    <div class="headline">01基本情况</div>
    <div class="tableStyle">
      <div class="information">
        <el-row :gutter="20">
          <el-col :span="8" class="rowStyle">
            <div class="wrap">
              <div class="title">姓名</div>
              <div class="content">{{}}</div>
            </div>
          </el-col>
          <el-col :span="8" class="rowStyle">
            <div class="wrap">
              <div class="title">性别</div>
              <div class="content">{{}}</div>
            </div>
          </el-col>
          <el-col :span="8" class="rowStyle">
            <div class="wrap">
              <div class="title">出生日期</div>
              <div class="content">{{}}</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="rowStyle">
            <div class="wrap">
              <div class="title">入职年限</div>
              <div class="content">{{}}</div>
            </div>
          </el-col>
          <el-col :span="8" class="rowStyle">
            <div class="wrap">
              <div class="title">最高学历</div>
              <div class="content">{{}}</div>
            </div>
          </el-col>
          <el-col :span="8" class="rowStyle">
            <div class="wrap">
              <div class="title">类别</div>
              <div class="content">{{}}</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" class="rowStyle">
            <div class="wrap">
              <div class="title">所辖培养层次</div>
              <div class="content">{{}}</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="rowStyle">
            <div class="wrap">
              <div class="title">所带学生人数</div>
              <div class="content">{{}}</div>
            </div>
          </el-col>
          <el-col :span="8" class="rowStyle">
            <div class="wrap">
              <div class="title">听课次数</div>
              <div class="content">{{}}</div>
            </div>
          </el-col>
          <el-col :span="8" class="rowStyle">
            <div class="wrap">
              <div class="title">谈话人次</div>
              <div class="content">{{}}</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" class="rowStyle">
            <div class="wrap">
              <div class="title">学工兼职</div>
              <div class="content"><el-input /></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" class="rowStyle">
            <div class="wrap">
              <div class="title">其他兼职</div>
              <div class="content"><el-input /></div>
            </div>
          </el-col>
        </el-row>
      </div>
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
</style>