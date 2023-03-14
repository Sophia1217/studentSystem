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
      <div class="item stuInfoClick" @click="fdycpClick">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content1">
          <div class="title1">
            <span class="stuinfoTitle">辅导员测评</span>
          </div>
          <div class="title2">
            <span class="baseInfo">对辅导员进行评价</span>
          </div>
        </div>
      </div>
      <div class="item stuInfoClick">
        <div class="item stuInfoClick" @click="gjzxdkpClick">
          <div class="medalImage">
            <img src="~@/assets/images/medal.png" alt="" />
          </div>
          <div class="content1">
            <div class="title1">
              <span class="stuinfoTitle">国家助学贷款</span>
            </div>
            <div class="title2">
              <span class="baseInfo">国家助学贷款</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item stuInfoClick">
        <div class="item stuInfoClick" @click="pbfdClick">
          <div class="medalImage">
            <img src="~@/assets/images/medal.png" alt="" />
          </div>
          <div class="content1">
            <div class="title1">
              <span class="stuinfoTitle">朋辈辅导</span>
            </div>
            <div class="title2">
              <span class="baseInfo">学生之间辅导</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item stuInfoClick"></div>
    </div>
    <div class="headline">
      <span class="tohead">奖惩管理</span>
    </div>
    <div class="row">
      <div class="item stuInfoClick" @click="pjpyClick">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1"><span class="stuinfoTitle">评奖评优</span></div>
          <div class="title2">
            <span class="baseInfo">评奖评优集体奖项</span>
          </div>
        </div>
      </div>
      <div class="item stuInfoClick" @click="jiangzhuClick">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1">
            <span class="stuinfoTitle">奖助申请</span>
          </div>
          <div class="title2">
            <span class="baseInfo">奖学金、助学金申请</span>
          </div>
        </div>
      </div>
      <div class="item stuInfoClick" @click="jtqkdcbClick">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1">
            <span class="stuinfoTitle">家庭情况调查表</span>
          </div>
          <div class="title2">
            <span class="baseInfo">家庭情况调查表填写</span>
          </div>
        </div>
      </div>
      <div class="item stuInfoClick" @click="knsrdClick">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1"><span class="stuinfoTitle">困难生认定</span></div>
          <div class="title2">
            <span class="baseInfo">困难生认定申请</span>
          </div>
        </div>
      </div>
    </div>
    <div class="headline">
      <span class="tohead">日常行为管理</span>
    </div>
    <div class="row">
      <div class="item stuInfoClick" @click="qingjiaClick">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1"><span class="stuinfoTitle">请假申请</span></div>
          <div class="title2">
            <span class="baseInfo">日常请销假</span>
          </div>
        </div>
      </div>

      <div class="item stuInfoClick" @click="zhengjianClick">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1"><span class="stuinfoTitle">证件补办</span></div>
          <div class="title2">
            <span class="baseInfo">补办证件</span>
          </div>
        </div>
      </div>
      <div class="item stuInfoClick" @click="zhusuClick">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1"><span class="stuinfoTitle">住宿申请</span></div>
          <div class="title2">
            <span class="baseInfo">宿舍异动申请</span>
          </div>
        </div>
      </div>
      <!-- <div class="item" @click="lskn">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1"><span class="stuinfoTitle">临时困难</span></div>
          <div class="title2">
            <span class="baseInfo">模块建设中</span>
          </div>
        </div>
      </div> -->
      <div class="item stuInfoClick" @click="chengcheClick">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1">
            <span class="stuinfoTitle">火车乘车优惠</span>
          </div>
          <div class="title2">
            <span class="baseInfo">火车乘车区间填写</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="item">
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
      <div class="item">
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
      <div class="item stuInfoClick" @click="xjyd">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1">
            <span class="stuinfoTitle">学籍异动事务</span>
          </div>
          <div class="title2">
            <span class="baseInfo">学籍保留、休学等</span>
          </div>
        </div>
      </div>
      <div class="item stuInfoClick" @click="lskn">
        <div class="medalImage">
          <img src="~@/assets/images/medal.png" alt="" />
        </div>
        <div class="content">
          <div class="title1">
            <span class="stuinfoTitle">临时困难</span>
          </div>
          <div class="title2">
            <span class="baseInfo">临时困难</span>
          </div>
        </div>
      </div>
    </div>
    <el-row>
      <div class="row">
        <div class="item stuInfoClick" @click="xnxj">
          <div class="medalImage">
            <img src="~@/assets/images/medal.png" alt="" />
          </div>
          <div class="content">
            <div class="title1"><span class="stuinfoTitle">学年小结</span></div>
            <div class="title2">
              <span class="baseInfo">学年自我小结</span>
            </div>
          </div>
        </div>
        <div class="item stuInfoClick" @click="bysjdbClick">
          <div class="medalImage">
            <img src="~@/assets/images/medal.png" alt="" />
          </div>
          <div class="content">
            <div class="title1">
              <span class="stuinfoTitle">毕业生鉴定表</span>
            </div>
            <div class="title2">
              <span class="baseInfo">毕业生填写</span>
            </div>
          </div>
        </div>
        <div class="item stuInfoClick">
          <div style="display: flex" v-show="benkeShow" @click="qgzxClick">
            <div class="medalImage">
              <img src="~@/assets/images/medal.png" alt="" />
            </div>
            <div class="content">
              <div class="title1">
                <span class="stuinfoTitle">勤工助学</span>
              </div>
              <div class="title2">
                <span class="baseInfo">勤奋刻苦</span>
              </div>
            </div>
          </div>
          <div style="display: flex" v-show="!benkeShow" @click="yjsszClick">
            <div class="medalImage">
              <img src="~@/assets/images/medal.png" alt="" />
            </div>
            <div class="content">
              <div class="title1">
                <span class="stuinfoTitle">研究生三助</span>
              </div>
              <div class="title2">
                <span class="baseInfo">研究生版勤工助学</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item stuInfoClick"></div>
      </div>
    </el-row>
  </div>
</template>

<script>
import TopTitle from "@/components/TopTitle/index.vue";
import { queryXjydAuth } from "@/api/common/liucheng";
import { xhQuery } from "@/api/dailyBehavior/lskn";
export default {
  name: "studentHomePage", // 学生视角首页内容
  components: {
    TopTitle,
  },
  data() {
    return {
      benkeShow: false,
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      xhQuery({ xh: this.$store.getters.userId }).then((res) => {
        if (["1", "2"].includes(res.data.pyccm)) {
          this.benkeShow = false;
        } else {
          this.benkeShow = true;
        }
      });
    },
    xnxj() {
      this.$router.push({
        path: "/yearSumStuList",
      });
    },
    lskn() {
      this.$router.push({
        path: "/lsknStu",
      });
    },
    xjyd() {
      queryXjydAuth({ xh: this.$store.getters.userId }).then((res) => {
        if (res.data.length == 4) {
          this.$router.push({
            path: "/xjydswStu",
          });
        } else {
          this.$message.warning("此学生暂无相关功能");
        }
      });
    },
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
    zhengjianClick() {
      this.$router.push({
        path: "/dailyBehavior/docReplace",
      });
    },
    qingjiaClick() {
      this.$router.push({
        path: "/vocationStu",
      });
    },
    zhusuClick() {
      this.$router.push({
        path: "/dormStudent",
      });
    },
    fdycpClick() {
      this.$router.push({
        path: "/fdyTest",
      });
    },
    gjzxdkpClick() {
      this.$router.push({
        path: "/gjzxdk",
      });
    },
    pjpyClick() {
      this.$router.push({
        path: "/awardsApply",
      });
    },
    jtqkdcbClick() {
      this.$router.push({
        path: "/familySituationTable",
      });
    },
    knsrdClick() {
      this.$router.push({
        path: "/difficultIdentity",
      });
    },
    bysjdbClick() {
      this.$router.push({
        path: "/graduateIdentification",
      });
    },
    jiangzhuClick() {
      this.$router.push({
        path: "/awardSubsidyApply",
      });
    },
    qgzxClick() {
      this.$router.push({
        path: "/qgzxApply",
      });
    },
    yjsszClick() {
      this.$router.push({
        path: "/yjsHelpApply",
      });
    },
    pbfdClick() {
      this.$router.push({
        path: "/friendTutor",
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
  width: 180px;
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
