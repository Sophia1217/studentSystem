<template>
  <div class="screen-container">
    <div class="titleArea">
      <span class="title">华中师范大学教师驾驶舱</span>
    </div>
    <div class="textbody">
      <div class="left">
        <div class="left-top">
          <div class="left-top-left">
            <div class="information">
              <div class="sectionTitle">信息</div>
              <div class="section">
                <div class="partTitle">性别</div>
                <div class="part">
                  <gender></gender>
                </div>
                <div class="partTitle">年龄分布</div>
                <div class="part">
                  <age></age>
                </div>
              </div>
            </div>
          </div>
          <div class="left-top-right">
            <div class="information">
              <div class="sectionTitle">总人数</div>
              <div class="section"></div>

              <div class="sectionTitle">班主任人数</div>
              <div class="sectionRow">
                <div style="width: 30%">班主任人数3000</div>
                <div style="width: 35%">
                  <div class="partTitle">年龄</div>
                  <div class="part">
                    <age></age>
                  </div>
                </div>
                <div style="width: 35%">
                  <div class="partTitle">职称</div>
                  <div class="part">
                    <zhicheng></zhicheng>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-bottom">
          <div class="information">
            <div class="sectionTitle">学院分布</div>
            <div class="section">
              <div class="partTitle">学院</div>
              <div class="part">
                <age></age>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="information">
          <div class="sectionTitle">辅导员事务</div>
          <div class="section">
            <div class="partTitle">辅导员测评</div>
            <div class="part">
              <test></test>
            </div>
            <div class="partTitle">辅导员“六个一”</div>
            <div class="part">
              <age></age>
            </div>
            <div class="partTitle">辅导员“六个一”Top10排名</div>
            <div class="part">
              <age></age>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import age from "./age";
import gender from "./gender";
import test from "./test";
import zhicheng from "./zhicheng";

export default {
  components: { age, gender, test, zhicheng },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style  scoped>
.com-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.com-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.com-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}
.titleArea {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
}
.title {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 34px;
  transform: translate(-50%, -50%);
}
.textbody {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
}
.left {
  width: 70%;
  display: flex;
  flex-direction: column;
}
.right {
  flex: 1;
  border-color: rgb(253, 0, 0);
}
.left-top {
  height: 70%;
  display: flex;
  flex-direction: row;
}
.left-bottom {
  flex: 1;
  border-color: rgb(253, 0, 0);
}
.left-top-left {
  border-color: rgb(253, 0, 0);
  width: 30%;
}
.left-top-right {
  display: flex;
  width: 70%;
  flex-direction: column;
  border-color: rgb(253, 0, 0);
}
.sectionTitle {
  font-size: 20px;
  font-weight: 500;
  color: #fff;
}
.section {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.sectionRow {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.partTitle {
  font-size: 20px;
  font-weight: 500;
  color: #fff;
}
.part {
  height: 100%;
  width: 100%;
}
.information {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>