<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">朋辈导师资料</p>
      </div>
      <el-form ref="formAdd" :model="detailInfoData">
        <!-- 学生本人基本情况 -->
        <div class="headline">学生基本信息</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学号</div>
                  <div class="content">
                    {{ detailInfoData.xh }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    {{ detailInfoData.xm }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div class="content">
                    {{ detailInfoData.xbmmc }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养单位</div>
                  <div class="content">
                    {{ detailInfoData.dwhmc }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业</div>
                  <div class="content">
                    {{ detailInfoData.zydmmc }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">联系电话</div>

                  <el-form-item prop="yddh" :rules="rules.common">
                    <div class="content" v-if="flag == 1">
                      <el-input
                        v-model="detailInfoData.yddh"
                        maxlength="100"
                      ></el-input>
                    </div>
                    <div class="content" v-else>
                      {{ detailInfoData.yddh }}
                    </div>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">QQ</div>
                  <el-form-item prop="qqhm" :rules="rules.common">
                    <div class="content" v-if="flag == 1">
                      <el-input
                        v-model="detailInfoData.qqhm"
                        maxlength="100"
                      ></el-input>
                    </div>
                    <div class="content" v-else>
                      {{ detailInfoData.qqhm }}
                    </div>
                  </el-form-item>
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
                  <div class="title">申请类别</div>
                  <el-form-item prop="lb" :rules="rules.common">
                    <div class="content" v-if="flag == 1">
                      <el-select v-model="detailInfoData.lb">
                        <el-option
                          v-for="(item, index) in sqlbOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="content" v-else>
                      {{ detailInfoData.lb }}
                    </div>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">起止时间</div>
                  <el-form-item prop="time" :rules="rules.common">
                    <div class="content" v-if="flag == 1">
                      <el-date-picker
                        type="daterange"
                        v-model="detailInfoData.time"
                        value-format="yyyy-MM-dd"
                      />
                    </div>
                    <div class="content" v-else>
                      {{ detailInfoData.qzsjStart }}至
                      {{ detailInfoData.qzsjEnd }}
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">课程次数</div>
                  <el-form-item prop="kccs" :rules="rules.common">
                    <div class="content" v-if="flag == 1">
                      <el-input-number
                        v-model="detailInfoData.kccs"
                        :min="0"
                        :max="9999"
                        controls-position="right"
                        @change="countKs()"
                      ></el-input-number>
                    </div>
                    <div class="content" v-else>
                      {{ detailInfoData.kccs }}次
                    </div>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">课程时长</div>
                  <el-form-item prop="kcsc" :rules="rules.common">
                    <div class="content" v-if="flag == 1">
                      <el-input-number
                        v-model="detailInfoData.kcsc"
                        :min="0"
                        :max="9999"
                        controls-position="right"
                        @change="countKs()"
                      ></el-input-number>
                      <span>分钟</span>
                    </div>
                    <div class="content" v-else>
                      {{ detailInfoData.kcsc }}分钟
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
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
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-table
              :data="detailInfoData.fwfxList"
              ref="multipleTable"
              style="width: 100%"
            >
              <el-table-column prop="dm" label="服务方向" :min-width="300">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'fwfxList.' + scope.$index + '.dm'"
                    :rules="rules.common"
                  >
                    <el-select
                      v-model="scope.row.dm"
                      filterable
                      allow-create
                      :disabled="flag != 1"
                    >
                      <el-option
                        v-for="(item, index) in fwfxOps"
                        :key="index"
                        :label="item.mc"
                        :value="item.mc"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column prop="mc" label="分数" :min-width="230">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'fwfxList.' + scope.$index + '.mc'"
                    :rules="rules.common"
                  >
                    <!-- <div v-if="isEdit == 2">{{ scope.row.mc }}</div> -->
                    <el-input-number
                      v-model="scope.row.mc"
                      :min="0"
                      :disabled="flag != 1"
                      controls-position="right"
                    />
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column label="添加选项" align="center" v-if="flag == 1">
                <template slot-scope="scope">
                  <div style="margin-bottom: 20px">
                    <i
                      class="icon jia"
                      @click="jia(scope.row, scope.$index)"
                    ></i>
                    <i
                      class="icon jian"
                      @click="jian(scope.row, scope.$index)"
                      v-if="scope.$index > 0"
                    ></i>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div style="margin-top: 10px">
            <el-row>
              <el-col :span="4">
                <div class="label">可服务时间段（多选）</div>
              </el-col>
            </el-row>

            <el-table :data="kfwsjdList" style="width: 100%" stripe>
              <el-table-column fixed="left" width="100">
                <template slot-scope="scope">
                  {{ 2 * (scope.$index + 1) - 1 }}-{{ 2 * (scope.$index + 1) }}
                </template>
              </el-table-column>
              <el-table-column prop="Mon" label="星期一" width="180">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.Mon"
                    size="large"
                    :disabled="flag != 1"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="Tues" label="星期二" width="180">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.Tues"
                    size="large"
                    :disabled="flag != 1"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="Wed" label="星期三" width="180">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.Wed"
                    size="large"
                    :disabled="flag != 1"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="Thur" label="星期四" width="180">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.Thur"
                    size="large"
                    :disabled="flag != 1"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="Fri" label="星期五" width="180">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.Fri"
                    size="large"
                    :disabled="flag != 1"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="Sat" label="星期六" width="180">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.Sat"
                    size="large"
                    :disabled="flag != 1"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="Sun" label="星期日" width="180">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.Sun"
                    size="large"
                    :disabled="flag != 1"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="headline">
          <div>自身学业情况简述</div>
        </div>
        <div class="tableStyle">
          <div class="inputArea" style="margin-bottom: 20px">
            <el-form-item prop="bz1" :rules="rules.common">
              <el-input
                type="textarea"
                :rows="5"
                maxlength="500"
                v-model="detailInfoData.bz1"
                :readonly="flag != 1"
              />
            </el-form-item>
          </div>
        </div>
        <div class="headline">
          <div>申请理由简述</div>
        </div>
        <div class="tableStyle">
          <div class="inputArea" style="margin-bottom: 20px">
            <el-form-item prop="bz2" :rules="rules.common">
              <el-input
                type="textarea"
                :rows="5"
                maxlength="500"
                v-model="detailInfoData.bz2"
                :readonly="flag != 1"
              />
            </el-form-item>
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
                :readonly="flag != 1"
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

    <div class="editBottom">
      <div class="btn cancel" v-if="isEdit == 1" @click="lctClick">
        审核记录
      </div>
      <div class="btn cancel" @click="handleCancle">返回</div>
      <div class="btn confirm" v-if="flag == 1" @click="handlUpdata">保存</div>
    </div>
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>
<script>
import { getXsJbxx } from "@/api/dailyBehavior/vocationTea";
import { insert, queryPbsqDetail } from "@/api/friendTutor/apply";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import lctCom from "../../../components/lct";
export default {
  components: { lctCom },
  data() {
    return {
      isEdit: this.$route.query.isEdit,
      flag:
        this.$route.query.status == "01" ||
        this.$route.query.status == "08" ||
        !this.$route.query.status
          ? 1
          : 2,
      nd: "",
      xh: this.$store.getters.userId,
      activeName: "0",
      sqlbOps: [
        { dm: "1", mc: "校级" },
        { dm: "0", mc: "院级" },
      ],
      detailInfoData: {},
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
    countKs() {
      this.detailInfoData.kcks =
        this.detailInfoData.kccs * this.detailInfoData.kcsc
          ? this.detailInfoData.kccs * this.detailInfoData.kcsc
          : "";
    },
    editButtonClick() {
      this.isEdit = 1;
    },
    getDetail() {
      if (this.$route.query.id) {
        queryPbsqDetail({ id: this.$route.query.id }).then((res) => {
          this.detailInfoData = res.data;
          this.kfwsjdList = res.data.kfwsjdListRes;
          if (res.data.qzsjStart && res.data.qzsjEnd) {
            this.$set(this.detailInfoData, "time", [
              res.data.qzsjStart,
              res.data.qzsjEnd,
            ]);
          }
        });
      } else {
        getXsJbxx({ xh: this.xh }).then((res) => {
          this.detailInfoData = res.data;
          this.$set(this.detailInfoData, "fwfxList", [{ dm: "", mc: "" }]);
        });
      }
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
