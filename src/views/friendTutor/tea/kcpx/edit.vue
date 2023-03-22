<template>
  <div>
    <div style="margin: 0 20% 0 20%">
      <div class="topHeader">
        <span>详情</span>
      </div>
      <el-form
        ref="formAdd"
        style="margin-bottom: 60px"
        :model="formAdd"
        :rules="rules"
        :inline-message="true"
      >
        <div class="mkHeader">朋辈导师基本信息</div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span>{{ formAdd.dsm }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> 男</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="培养单位" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> 艺术设计学院</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专业" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> 艺术设计专业</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> 16133132132</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="QQ" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> 32132132</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">课程信息</div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item
                prop="jydwmc"
                :rules="rules.common"
                label="课程主题"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input
                    v-model="formAdd.kczt"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="类别"
                prop="rsbmlxdh"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.lb }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="开课地点"
                class="grayBg"
                label-width="42%"
                prop="shengdm"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-input
                    v-model="formAdd.kkdd"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="可接纳人数"
                class="grayBg"
                label-width="42%"
                prop="shidm"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-input
                    v-model="formAdd.kjnrs"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="起止时间"
                class="grayBg"
                label-width="42%"
                prop="xiandm"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-date-picker
                    type="daterange"
                    placeholder="选择日期"
                    v-model="formAdd.qzsjArr"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width: 100%"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开课时间" class="grayBg" label-width="42%">
                <div class="sqList">
                  <el-date-picker
                    v-model="formAdd.kksj"
                    type="date"
                    placeholder="选择开课时间"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="课程次数"
                class="grayBg"
                label-width="42%"
                prop="sfxzfszd"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-input
                    v-model="formAdd.kkcs"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="课程时长"
                class="grayBg"
                label-width="42%"
                prop="hylb"
                :rules="rules.common"
              >
                <div class="sqList">
                  <!-- hylbmc -->
                  <el-input
                    v-model="formAdd.kksc"
                    placeholder="请输入内容"
                    style="width: 70%"
                  ></el-input
                  ><span v-html="'\u3000'"></span>分钟
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">课程计划及预期效果</div>
        <div>
          <el-row>
            <el-col :span="24">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="formAdd.kcjh"
                maxlength="1000"
                show-word-limit
                rows="12"
              >
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div style="height: 80px"></div>
    </div>
    <div class="editBottom">
      <div class="btns borderRed">
        <i class="icon backIcon"></i><span class="title">退回</span>
      </div>
      <div class="btns borderRed">
        <i class="icon refuseIcon"></i><span class="title">拒绝</span>
      </div>
      <div class="btns fullGreen" @click="save">
        <i class="icon passIcon"></i><span class="title">保存</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getEditdDetails, tyFlow } from "@/api/jccy/index";
export default {
  data() {
    return {
      bjzt: 2,
      dkInfo: [], //贷款信息
      jjModal: false,
      jjly: "",
      tableInner: [],
      thTableModal: false,
      thModal: false,
      thly: "",
      tempRadio: false,
      formAdd: {
        dsm: "20041642",
        dsh: "高耶",
        kczt: "",
        lb: "校级",
        kkdd: "",
        kjnrs: "",
        qzsjArr: [],
        kkrqks: "",
        kkrqjs: "",
        kksj: "",
        kkcs: "",
        kksczx: "",
        kcjh: "",
      },
      lgnsn: "",
      commonParams: {},
      multipleSelection1: {},
      rules: {
        common: [
          {
            required: true,
            message: "请完善对应表单内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    "formAdd.qzsjArr": {
      handler(newName, old) {
        this.formAdd.kkrqks = newName ? newName[0] : "";
        this.formAdd.kkrqjs = newName ? newName[1] : "";
      },
    },
  },
  mounted() {
    this.lgnsn = this.$route.query.state;
    this.showDetail();
  },

  methods: {
    save() {
      console.log(" this.formAdd", this.formAdd);
    },
    //确认
    pass() {
      if (this.commonParams.length > 0) {
        var data = this.commonParams.map((item) => ({
          ...item,
          opMsg: "审核确认",
        }));
        tyFlow(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("审核已确认");
            this.$router.push({
              path: "/dailyBehavior/jcjy/jcjyTeaList",
            });
          }
        });
      }
    },
    getRow(index, row) {
      this.multipleSelection1 = row;
    },
    showDetail() {
      getEditdDetails({
        id: this.lgnsn,
      }).then((res) => {
        this.dkInfo = res.data.rcswLsdkjlRes;
        this.formAdd = { ...res.data, ...res.data.rcswjbxxRes };
        this.formAdd.xlxz = this.formAdd.xz
          ? `${this.formAdd.xz}年${this.formAdd.pyccmc}`
          : `${this.formAdd.xz}${this.formAdd.pyccmc}`;
        this.formAdd.dksjArr = [this.formAdd.dkkssj, this.formAdd.dkjssj];
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.borderRed {
  border: 1px solid grey;
  color: red;
  background: #fff;
}
.fullGreen {
  // border:1px solid #005657;
  color: #fff;
  background: #005657;
}
.topHeader {
  text-align: center;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #005657;
}
.mkHeader {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #1f1f1f;
  margin: 15px 0 15px 3px;
}
.redSpan {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  color: #ff0000;
}
::v-deep .grayBg .el-form-item__label {
  background-color: #f0f0f0;
  padding: 5px 10px 5px 0px;
}
.grayBg {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 0;
}
.sqList {
  padding: 5px 0px 5px 10px;
  width: 85%;
}
.scopeIncon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.handledie {
  background: url("~@/assets/images/details.png");
}
.chDis {
  background: url("~@/assets/dangan/chDisable.png");
}
.Edit {
  background: url("~@/assets/images/edit.png");
}
.EditDis {
  background: url("~@/assets/dangan/editDisable.png") no-repeat;
}

.lct {
  background: url("~@/assets/dangan/lct.png");
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}

// dialog标题黑色
::v-deep .el-dialog__title {
  font-weight: bold;
}
.el-button--text {
  border-color: transparent;
  color: #005657;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
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
  .btns {
    margin-right: 15px;
    padding: 0px 10px;
    cursor: pointer;
    border-radius: 4px;
    .title {
      font-size: 14px;
      text-align: center;
      line-height: 32px;
      // vertical-align: middle;
    }
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: top;
      margin-right: 5px;
    }
    .passIcon {
      margin-top: 10px;
      background: url("~@/assets/images/passWhite.png") no-repeat;
    }
    .refuseIcon {
      margin-top: 10px;
      background: url("~@/assets/images/refuse.png") no-repeat;
    }
    .backIcon {
      margin-top: 10px;
      background: url("~@/assets/images/back.png") no-repeat;
    }
  }
}
</style>
