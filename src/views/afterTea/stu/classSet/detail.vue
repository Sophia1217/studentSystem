<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">课程详情</p>
      </div>
      <el-form ref="formAdd" :model="detailInfoData">
        <!-- 学生本人基本情况 -->
        <div class="headline">朋辈导师基本信息</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    {{ xsjbxx.xm }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div class="content">
                    {{ xsjbxx.xbmmc }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养单位</div>
                  <div class="content">
                    {{ xsjbxx.dwhmc }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业</div>
                  <div class="content">
                    {{ xsjbxx.zydmmc }}
                  </div>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">联系电话</div>

                  <div class="content">
                    {{ xsjbxx.yddh }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">QQ</div>

                  <div class="content">
                    {{ xsjbxx.qqhm }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="headline">课程信息</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">课程主题</div>

                  <div class="content">
                    {{ detailInfoData.kczt }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">申请类别</div>

                  <div class="content">
                    {{ detailInfoData.lb }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">起止时间</div>

                  <div class="content">
                    {{ detailInfoData.kkrqks }}至
                    {{ detailInfoData.kkrqjs }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">开课时间</div>

                  <div class="content">{{ detailInfoData.kksj }}</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">课程次数</div>

                  <div class="content">{{ detailInfoData.kkcs }}次</div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">课程时长</div>

                  <div class="content">{{ detailInfoData.kksc }}分钟</div>
                </div>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">课程所需课时</div>
                  <div class="content">{{ detailInfoData.kcks }}分钟</div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">预备辅导地点</div>
                  <el-form-item prop="kcdd" :rules="rules.common">
                    <div class="content" v-if="flag == 1">
                      <el-input
                        v-model="detailInfoData.kcdd"
                        maxlength="100"
                      ></el-input>
                    </div>
                    <div class="content" v-else>
                      {{ detailInfoData.kcdd }}
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row> -->
          </div>
        </div>
        <!-- 课程计划及预期效果 -->
        <div class="headline">
          <div>课程计划及预期效果</div>
        </div>

        <div class="tableStyle">
          <div class="inputArea" style="margin-bottom: 20px">
            <el-form-item prop="kcjh" :rules="rules.common">
              <el-input
                type="textarea"
                :rows="10"
                maxlength="2000"
                v-model="detailInfoData.kcjh"
                readonly
              />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>

    <!-- <div v-if="isEdit != 1" class="editBottom">
      <div class="btn cancel" @click="handleBack">返回</div>
      <div class="btn editIcon" @click="editButtonClick">编辑</div>
    </div> -->

    <!-- <div class="editBottom">
      <div class="btn cancel" v-if="isEdit == 1" @click="lctClick">
        审核记录
      </div>
      <div class="btn cancel" @click="handleCancle">返回</div>
      <div class="btn confirm" v-if="flag == 1" @click="handlUpdata">保存</div>
    </div> -->
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>
<script>
import { getXsJbxx } from "@/api/dailyBehavior/vocationTea";
import { queryDetail } from "@/api/friendTutor/classSet";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import lctCom from "../../../components/lct";
export default {
  components: { lctCom },
  data() {
    return {
      flag:
        this.$route.query.status == "01" ||
        this.$route.query.status == "08" ||
        !this.$route.query.status
          ? 1
          : 2,
      nd: "",
      activeName: "0",
      sqlbOps: [
        { dm: "1", mc: "校级" },
        { dm: "0", mc: "院级" },
      ],
      detailInfoData: {},
      xsjbxx: {},
      fwfxList: [{ dm: "", mc: "" }],
      kfwsjdList: [
        {
          Mon: false,
          Tues: false,
          Wed: false,
          Thur: false,
          Fri: false,
          Sat: false,
          Sun: false,
        },
        {
          Mon: false,
          Tues: false,
          Wed: false,
          Thur: false,
          Fri: false,
          Sat: false,
          Sun: false,
        },
        {
          Mon: false,
          Tues: false,
          Wed: false,
          Thur: false,
          Fri: false,
          Sat: false,
          Sun: false,
        },
        {
          Mon: false,
          Tues: false,
          Wed: false,
          Thur: false,
          Fri: false,
          Sat: false,
          Sun: false,
        },
        {
          Mon: false,
          Tues: false,
          Wed: false,
          Thur: false,
          Fri: false,
          Sat: false,
          Sun: false,
        },
      ],
      lctModal: false,
      njOptions: [],
      fwfxOps: [],
      rules: {
        common: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.getCode("dmfwfxm");
    this.getDetail();
  },
  methods: {
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data).then((res) => {
        switch (paramsData) {
          case "dmfwfxm":
            this.fwfxOps = res.data;
            break;
        }
      });
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    lctClick() {
      if (!!this.$route.query.processid) {
        this.$refs.child.inner(this.$route.query.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },

    getDetail() {
      // if (this.$route.query.id) {
      //   queryPbsqDetail({ id: this.$route.query.id }).then((res) => {
      //     this.detailInfoData = res.data;
      //     this.kfwsjdList = res.data.kfwsjdListRes;
      //     if (res.data.qzsjStart && res.data.qzsjEnd) {
      //       this.$set(this.detailInfoData, "time", [
      //         res.data.qzsjStart,
      //         res.data.qzsjEnd,
      //       ]);
      //     }
      //   });
      // } else {
      //   getXsJbxx({ xh: this.xh }).then((res) => {
      //     this.detailInfoData = res.data;
      //     this.$set(this.detailInfoData, "fwfxList", [{ dm: "", mc: "" }]);
      //   });
      // }
      queryDetail({ id: this.$route.query.id, xh: this.$route.query.xh }).then(
        (res) => {
          this.detailInfoData = res.data.rcswPbfdKcbRes;
          this.xsjbxx = res.data.xsRes;
        }
      );
    },
    handleBack() {
      this.$router.go(-1);
    },
    handleCancle() {
      this.$router.go(-1);
    },
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAdd.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    handlUpdata() {
      //this.$set(this.detailInfoData, "fwfxList", this.fwfxList);
      this.$set(this.detailInfoData, "kfwsjdList", this.kfwsjdList);
      this.$set(
        this.detailInfoData,
        "qzsjStart",
        this.detailInfoData.time[0] || ""
      );
      this.$set(
        this.detailInfoData,
        "qzsjEnd",
        this.detailInfoData.time[1] || ""
      );
      let data = this.detailInfoData;
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单信息!");
      } else {
        insert(data)
          .then((res) => {
            this.$message.success("新增成功");
            this.$router.go(-1);
          })
          .catch((err) => {});
      }
    },
    jia(row, index) {
      var obj = {
        dm: "",
        mc: "",
      };
      this.detailInfoData.fwfxList.push(obj);
    },
    jian(row, index) {
      this.detailInfoData.fwfxList.splice(index, 1);
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
            line-height: 48px;
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
  .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: top;
    margin-right: 5px;
  }
  .jia {
    margin-top: 9px;
    background: url("~@/assets/images/jia.png") no-repeat;
  }

  .jian {
    margin-top: 9px;
    background: url("~@/assets/images/jian.png") no-repeat;
  }
  ::v-deep .el-form .el-form-item__error {
    top: 21%;
    right: 5% !important;
    left: unset;
  }
  ::v-deep .el-form .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
