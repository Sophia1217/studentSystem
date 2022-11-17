<template>
  <div class="studentHomePage">
    <TopTitle class="top-title" />
    <div class="bg"></div>
    <!-- <div class="rowTop">
        <div class="itemTop1">
            <div class="logoImage">
                <img  src="~@/assets/images/logo.png" alt="">
            </div>
            <div class="content">
                <div class="titleTop1"><span class="nameTitle" >华中师范大学学生事务服务平台</span></div>
            <div class="titleTop2">
                <span class="inglishTitle" >CCNU Student Management System</span>
            </div>
            </div>
        </div>
        <div class="itemTop2">
            <div class="iconCenter">
                <div class="avatarImage">
                <img  src="~@/assets/images/avatarRight.png" alt="">
                </div>
            </div>
            
            <div class="titleTop3"><span class="welcomeTitle" >林晓曼，欢迎使用华中师范大学学生事务服务平台！</span></div>
        </div>
    </div> -->

    <!-- 图片 -->

    <!-- <div class="bg"></div>  -->
    <div class="headline">
      <span class="tohead">常用功能</span>
    </div>
    <div class="row">
      <div class="item stuInfoClick" @click="stuInfoClick">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1">
            <span class="stuinfoTitle">在校学生信息</span>
          </div>
          <div class="title2">
            <span class="baseInfo">基本信息、联系方式等</span>
          </div>
        </div>
      </div>
      <div class="item stuInfoClick" @click="danganClick">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1">
            <span class="stuinfoTitle">学生成长档案</span>
          </div>
          <div class="title2">
            <span class="baseInfo">干部经历、科研成果等</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1">
            <span class="stuinfoTitle">宿舍异动申请</span>
          </div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1">
            <span class="stuinfoTitle">场地使用申请</span>
          </div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="item3">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content1">
          <div class="title1">
            <span class="stuinfoTitle">场地使用审批</span>
          </div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div>
    </div>
    <div class="headline">
      <span class="tohead">奖惩管理</span>
    </div>
    <div class="row">
      <div class="item">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1"><span class="stuinfoTitle">评奖结果</span></div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1">
            <span class="stuinfoTitle">学生评奖申请</span>
          </div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1"><span class="stuinfoTitle">奖项审核</span></div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1"><span class="stuinfoTitle">资助结果</span></div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div>
    </div>
    <div class="headline">
      <span class="tohead">日常行为管理</span>
    </div>
    <div class="row">
      <div class="item">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1"><span class="stuinfoTitle">请假申请</span></div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1"><span class="stuinfoTitle">困难生申请</span></div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1"><span class="stuinfoTitle">困难生结果</span></div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div>
      <div class="item stuInfoClick" @click="chengcheClick">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1">
            <span class="stuinfoTitle">火车乘车优惠</span>
          </div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="item2 itemSpecial">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1"><span class="stuinfoTitle">我的报修</span></div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div>
      <div class="item2 itemSpecial">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1">
            <span class="stuinfoTitle">假期留校申请</span>
          </div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div>
      <div class="item2"></div>
      <div class="item2"></div>
    </div>
  </div>
</template>

<script>
import TopTitle from "@/components/TopTitle/index.vue";
export default {
  name: "studentHomePage", // 学生视角首页内容
  components: {
    TopTitle,
  },
  data() {
    return {};
  },

  methods: {
    //首页基本信息跳转
    danganClick() {
      this.$router.push({
        path: "/stuGrowFiles/filesDetail",
      });
    },
    stuInfoClick() {
      this.$router.push({
        path: "/student/studetails",
      });
    },
    chengcheClick() {
      this.$router.push({
        path: "/dailyBehavior/stuTravelDetails",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.top-title {
  position: relative;
}

.rowTop {
  display: flex;
  background-color: #005657;
}
.bg {
  width: 100%;
  height: 277px;
  background: url("~@/assets/images/WechatIMG85.png") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 30px;
}
.row {
  display: flex;
}
.headline {
  flex: 1;
  width: 132px;
  height: 22px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 20px;
}
.tohead {
  font-weight: 500;
  font-size: 22px;
  color: #005657;
}
.itemTop1 {
  flex: 0;
  width: 300px;
  height: 64px;
  margin-left: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
}
.itemTop2 {
  flex: 0;
  width: 520px;
  height: 64px;
  margin-left: auto;
  margin-right: 24px;

  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
}
.item {
  flex: 1;
  width: 348px;
  height: 152px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}
.item3 {
  flex: 1;
  width: 348px;
  height: 152px;
  display: flex;
  border-radius: 8px;
  margin-left: 6%;
  justify-content: normal;
}
.item2 {
  flex: 1;
  width: 348px;
  height: 152px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;

  // align-self: flex-start;

  border-radius: 8px;
}
.logoImage {
  width: 48px;
  height: 48px;
  vertical-align: middle;
  margin-right: 12px;
}

.medalImage {
  width: 60px;
  height: 60px;

  vertical-align: middle;
  margin-right: 12px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.content1 {
  display: flex;
  flex-direction: column;
}
.titleTop1 {
  width: 212px;
  height: 26px;
}
.titleTop2 {
  width: 210px;
  height: 20px;
}
.titleTop3 {
  width: 360px;
  height: 24px;
}
.nameTitle {
  font-weight: 600;
  font-size: 17.6px;
  color: #ffffff;
  font-family: PingFangSC-S0pxibold;
}
.inglishTitle {
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
  font-family: PingFangSC-Regular;
}
.welcomeTitle {
  font-weight: 600;
  font-size: 16px;
  font-family: PingFangSC-S0pxibold;
  text-align: right;
  color: #ffffff;
}

.title1 {
  width: 144px;
  height: 33px;
}

.stuinfoTitle {
  font-size: 24px;
  font-weight: 700;
}

.title2 {
  width: 180px;
  height: 25px;
}

.baseInfo {
  font-weight: 400;
  font-size: 18px;
  color: #999999;
  letter-spacing: 0;
}

.iconCenter {
  //右侧图标块
  flex: 0;
  width: 190px;
  height: 64px;

  display: flex;
  align-items: center;
  flex-direction: row-reverse; //主轴水平，起点右端
}
.avatarImage {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin-left: 20px;
}
.exportImage {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-left: 20px;
}
.newsImage {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

// 在校学生信息
.stuInfoClick {
  cursor: pointer;
}
</style>
