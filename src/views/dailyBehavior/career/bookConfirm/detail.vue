<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">华中师范大学生涯发展与求职咨询登记表</p>
      </div>
      <!-- 学生本人基本情况 -->
      <div class="headline">学生本人基本情况</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <div class="content">
                  {{ basicInfo.xh }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">姓名</div>
                <div class="content">
                  {{ basicInfo.xm }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">性别</div>
                <div class="content">
                  {{ basicInfo.xb }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学院</div>
                <div class="content">
                  {{ basicInfo.dwmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">专业</div>
                <div class="content">
                  {{ basicInfo.zymc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">年级</div>
                <div class="content">
                  {{ basicInfo.nj }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">是否毕业生</div>
                <div class="content">
                  <el-radio-group v-model="detailInfoData.sfbys" disabled>
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">手机</div>
                <div class="content">
                  {{ basicInfo.yddh }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">QQ</div>
                <div class="content">
                  {{ basicInfo.qqhm }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 来访者教育信息 -->
      <div class="headline">来访者教育信息</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">高中就读学校</div>
                <div class="content">
                  {{ basicInfo.gzjdxx }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">高中毕业年份</div>
                <div class="content">
                  {{ basicInfo.gzbynf }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">本（专）科就读学校及专业</div>
                <div class="content">
                  {{ basicInfo.bzkjdxxjzy }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">本（专科）毕业年份</div>
                <div class="content">
                  {{ basicInfo.bzkbynf }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">硕士就读学校及专业</div>
                <div class="content">
                  {{ basicInfo.ssjdxxjzy }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">硕士毕业年份</div>
                <div class="content">
                  {{ basicInfo.ssbynf }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">接受职业资格证书培训情况</div>
                <div class="content">
                  <el-input v-model="detailInfoData.zyzgzs" readonly />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">在教育方面的抱负是怎样的</div>
                <div class="content">
                  <el-input v-model="detailInfoData.jyfmbf" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 来访者实习实践信息 -->
      <div class="headline">来访者实习实践信息</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">实习实践经历1</div>
                <div class="content">
                  <el-input v-model="detailInfoData.sxsjjl1" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">实习实践经历2</div>
                <div class="content">
                  <el-input v-model="detailInfoData.sxsjjl2" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">实习实践经历3</div>
                <div class="content">
                  <el-input v-model="detailInfoData.sxsjjl3" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">特殊爱好</div>
                <div class="content">
                  <el-input v-model="detailInfoData.tsah" readonly />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">休闲兴趣</div>
                <div class="content">
                  <el-input v-model="detailInfoData.xxxq" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">志愿者工作</div>
                <div class="content">
                  <el-input v-model="detailInfoData.zyzgz" readonly />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">其他公益活动</div>
                <div class="content">
                  <el-input v-model="detailInfoData.qtgyhd" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">任学生干部经历</div>
                <div class="content">
                  <el-input v-model="detailInfoData.xsgbjl" readonly />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">其他实践经历</div>
                <div class="content">
                  <el-input v-model="detailInfoData.qtsjjl" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 来访者生涯发展信息 -->
      <div class="headline">来访者生涯发展信息</div>
      <div class="tableStyle">
        <!-- <div class="pieceName">学生本学年已获资助情况</div> -->
        <div class="inputArea">
          <div class="title">当前生涯抱负</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.dqsybf"
              readonly
            />
          </div>
          <div class="title">
            什么人或事对来访者的生涯（或职业）产生了重大影响？
          </div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.rssyyx"
              readonly
            />
          </div>

          <div class="title">来访者童年时对职业的兴趣或幻想是什么？</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.tnzyxq"
              readonly
            />
          </div>
          <div class="title">来访者现在喜欢什么样的休闲活动或爱好？</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.xzxxah"
              readonly
            />
          </div>
          <div class="title">来访者过去喜欢什么样的休闲活动或爱好？</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.gqxxah"
              readonly
            />
          </div>
          <div class="title">
            来访者是否有任何一种身体缺陷及其对生涯发展产生了什么样的影响？
          </div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.sfstqxyx"
              readonly
            />
          </div>
          <div class="title">对于当前的处境，来访者最满意的是什么？</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.dqzmy"
              readonly
            />
          </div>
          <div class="title">对于当前的处境，来访者最不满意的是什么？</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.dqzbmy"
              readonly
            />
          </div>
        </div>
      </div>
      <!-- 来访者关注的问题 -->
      <div class="headline">来访者关注的问题</div>
      <div class="tableStyle">
        <div class="checkbox">
          <el-checkbox-group v-model="detailInfoData.gzwtList">
            <el-checkbox
              v-for="item in gzwtOps"
              :label="item.dm"
              :key="item.dm"
              disabled
            >
              <div>{{ item.mc }}</div>
            </el-checkbox>
          </el-checkbox-group>
          <!-- <checkboxCom
            :objProp="dmxbmOPs"
            @checkedTraining="dmxbmCheck"
            disabled
          ></checkboxCom> -->
        </div>
      </div>
    </div>
    <div class="editBottom">
      <div class="btn cancel" @click="handleCancle">返回</div>
      <!-- <div class="btn confirm" @click="handlUpdata">提交</div> -->
    </div>
  </div>
</template>
<script>
import CheckboxCom from "../../../components/checkboxCom";
import { getXsJbxx } from "@/api/career/bookStu";
import { getSyfzXsyyDetail } from "@/api/career/bookTea";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
export default {
  components: { CheckboxCom },
  data() {
    return {
      xh: "",
      detailInfoData: {},
      basicInfo: {},
      njOptions: [],
      pxjbmOps: [], //培训级别码
      checked: true,
      dmxbmOPs: {
        // 性别：
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      mtfs: "", //1线上，2线下
      yyid: "", //预约排班表id
      gzwtOps: [
        { dm: "1", mc: "1. 渴望提升自己" },
        { dm: "2", mc: "2. 需要生涯决策方面的帮助" },
        { dm: "3", mc: "3. 对于职业选择不确定" },
        { dm: "4", mc: "4. 渴望探索重新定位以及找工作策略" },
        { dm: "5", mc: "5. 需要规划未来" },
        { dm: "6", mc: "6. 需要改变生涯目标" },
        { dm: "7", mc: "7. 需要选择主修专业方面的帮助" },
        { dm: "8", mc: "8. 需要设立长期的生涯目标" },
        { dm: "9", mc: "9. 需要职业方面的信息" },
        { dm: "10", mc: "10. 需要劳动力市场方面的信息" },
        { dm: "11", mc: "11. 需要为毕业求职做好准备" },
        { dm: "12", mc: "12. 需要求职方面的帮助" },
        { dm: "13", mc: "13. 学业或工作压力" },
        {
          dm: "14",
          mc: "14. 已签约毕业生由于工作条件（如工作时间、工作地点等）的原因导致的工作不满意",
        },
        {
          dm: "15",
          mc: "15. 已签约毕业生由于工作职责要求的原因导致的工作不满意",
        },
        {
          dm: "16",
          mc: "16. 由于与朋辈、师长或上司等之间的人际关系导致的工作不满意",
        },
        { dm: "17", mc: "17. 一般的生活不满意" },
        {
          dm: "18",
          mc: "18. 关系方面的压力（如父母、师长、同辈、重要他人，等等）",
        },
      ],
    };
  },
  created() {},
  mounted() {
    this.getCode("dmpxjbm");
    this.getDetail();
  },
  methods: {
    getDetail() {
      getXsJbxx({ xh: this.$route.query.xh }).then((res) => {
        this.basicInfo = res.data;
      });
      getSyfzXsyyDetail({ id: this.$route.query.id }).then((res) => {
        this.detailInfoData = res.data;
      });
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data).then((res) => {
        switch (paramsData) {
          case "dmpxjbm":
            this.pxjbmOps = res.data;
            break;
        }
      });
    },
    handleCancle() {
      this.$router.go(-1);
    },
    // handlUpdata() {
    //   if (!this.checked) {
    //     this.$message.error("请勾选承诺协议!");
    //   } else {
    //     this.$set(this.detailInfoData, "xh", this.xh);
    //     this.$set(this.detailInfoData, "yyid", this.yyid);
    //     this.$set(this.detailInfoData, "mtfs", this.mtfs); //1线上，2线下,
    //     this.$set(this.detailInfoData, "gzwtList", this.dmxbmOPs.choose || []);
    //     let data = this.detailInfoData;
    //     insertSyfzXsyyDetail(data)
    //       .then((res) => {
    //         this.$message.success("提交成功");
    //         this.$router.go(-1);
    //       })
    //       .catch((err) => {});
    //   }
    // },
    //关注问题多选
    dmxbmCheck(value) {
      let checkedCount = value.length;
      this.dmxbmOPs.checkAll = checkedCount === this.dmxbmOPs.checkBox.length;
      this.dmxbmOPs.isIndeterminate =
        checkedCount > 0 && checkedCount < this.dmxbmOPs.checkBox.length;
      // console.log(this.dmxbmOPs.choose, "单选");
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: row;
  .detail_right {
    flex: 1;
    background: #fff;
    padding: 30px;
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
    }
    .headline {
      padding-left: 20px;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 20px;
      color: #000;
      line-height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .editBtn {
        padding: 4px 5px;
        margin-right: 20px;
        // border: 1px solid #005657;
        border-radius: 4px;
        font-weight: 400;
        font-size: 14px;
        color: #005657;
        cursor: pointer;
        .addIcon {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/arrowDown.png") no-repeat;
          vertical-align: middle;
          margin-bottom: 4px;
        }
      }
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
            flex: 0 0 200px;
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
      .pieceName {
        box-sizing: border-box;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
        font-size: 18px;
        color: #1f1f1f;
        line-height: 28px;
      }
      .inputArea {
        display: flex;
        flex-direction: column;
        //align-items: center;
        .title {
          //   flex: 0 0 160px;
          //   line-height: 48px;
          //   background: #e0e0e0;
          //   text-align: right;
          //   padding-right: 5px;
          //   margin: 0 !important;
          font-weight: 400;
          font-size: 16px;
          color: #1f1f1f;
          line-height: 22px;
          margin: 16px;
          text-align: left;
        }
        .content {
          .cishu {
            margin-bottom: 10px;
          }
        }
      }
      .tableArea {
        padding-right: 20px;
        padding-left: 20px;
      }
    }
  }

  .editBottom {
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 -2px 6px -1px rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn {
      width: 84px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #005657;
      border-radius: 2px;
      margin-right: 20px;
    }
    .cancel {
      color: #005657;
    }
    .confirm {
      background: #005657;
      color: #fff;
    }
    .editIcon {
      background: #005657;
      color: #fff;
      // background: url('~@/assets/images/icon_edit_white.png');
    }
  }
}
</style>
